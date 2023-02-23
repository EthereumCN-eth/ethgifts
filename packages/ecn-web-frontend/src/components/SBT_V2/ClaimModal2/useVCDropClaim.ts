import { constants } from "ethers";
import { useCallback, useEffect, useMemo } from "react";
import { useContractRead } from "wagmi";

import SBT1 from "@/abis/SBT1.json";
import { checkWithMinTime } from "@/components/SBT/ClaimModal/hooks/checkWithMinTime";
import { useClaimSBTFromVCPure } from "@/components/SBT/ClaimModal/hooks/useClaimSBTFromVC";
import { useFuncTriggerByDeps } from "@/components/SBT/ClaimModal/hooks/useFuncTriggerByDeps";
import { parseVCForPayload, verifyVC, verifyVCTicket } from "@/utils/vc";

// import { useClaimSBTFromVC } from "./useClaimSBTFromVC";
// import { useFuncTriggerByDeps } from "./useFuncTriggerByDeps";

const checkVC = async (vcStr: string | undefined, time: number) => {
  return checkWithMinTime(verifyVC(vcStr), time);
};

const checkSignData = async (
  {
    vcStr,
    expectedVerifyPubKey,
  }: { vcStr: string | undefined; expectedVerifyPubKey: undefined | string },
  time: number
) => {
  return checkWithMinTime(verifyVCTicket(vcStr, expectedVerifyPubKey), time);
};

export const useVCDropClaim = ({
  dropped,
  vcStr,
  onCancel,
  onProcess,
  onSuccess,
  reset,
}: {
  dropped: boolean;
  vcStr: undefined | string;
  onCancel?: (() => void) | undefined;
  onProcess?: (() => void) | undefined;
  onSuccess?: (() => void) | undefined;
  reset?: (() => void) | undefined;
}) => {
  //   const reset = useInternalDragState((state) => state.reset);
  // const setVerifyChecks = useInternalDragState(
  //   (state) => state.setVerifyChecks
  // );
  //   const vcStr = record?.signedVC;

  const { verifyingContract, chainId } = useMemo(() => {
    const { data } = parseVCForPayload(vcStr || "{}");

    return {
      chainId: data?.chainId,
      verifyingContract: data?.verifyingContract,
    };
  }, [vcStr]);

  const { data: approverAdderss } = useContractRead({
    contractInterface: SBT1.abi,
    addressOrName: verifyingContract || constants.AddressZero,
    chainId,
    functionName: "approver",
    args: [],
    enabled: !!verifyingContract && !!chainId,
    // overrides: {
    //   gasLimit: 50000,
    // },
  });

  // console.log("data", approverAdderss);

  const checkVCCallback = useCallback(() => checkVC(vcStr, 2000), [vcStr]);
  const checkSignCallback = useCallback(
    () =>
      checkSignData(
        { expectedVerifyPubKey: approverAdderss as string | undefined, vcStr },
        2000
      ),
    [approverAdderss, vcStr]
  );

  const isVCRightStatus = useFuncTriggerByDeps({
    func: checkVCCallback,
    deps: [dropped],
    init: "idle",
  });

  const isSignRightStatus = useFuncTriggerByDeps({
    func: checkSignCallback,
    deps: [dropped, isVCRightStatus === "success", !!approverAdderss],
    init: "idle",
  });

  const { isTxStatus, isWriteStatus } = useClaimSBTFromVCPure({
    enabled: isVCRightStatus === "success" && isSignRightStatus === "success",
    vcStr,
    onCancel,
    onProcess,
    reset,
    onSuccess,
  });

  useEffect(() => {
    // eslint-disable-next-line sonarjs/no-collapsible-if
    if (
      dropped &&
      (isSignRightStatus === "loading" ||
        isVCRightStatus === "loading" ||
        isTxStatus === "loading" ||
        isWriteStatus === "loading")
    ) {
      if (onProcess) onProcess();
    }

    if (
      dropped &&
      (isSignRightStatus === "error" || isVCRightStatus === "error")
    ) {
      if (onCancel) onCancel();
      const t = setTimeout(() => {
        if (reset) reset();
      }, 2500);
      return () => {
        clearTimeout(t);
      };
    }
    return () => {};
  }, [
    isVCRightStatus,
    isSignRightStatus,
    dropped,
    isTxStatus,
    isWriteStatus,
    reset,
    onProcess,
    onCancel,
  ]);

  // console.log("isVCRightStatus", isVCRightStatus);
  // console.log("isSignRightStatus", isSignRightStatus);
  // console.log("isWriteStatus", isWriteStatus);
  // console.log("isTxStatus", isTxStatus);
  return {
    isVCRightStatus,
    isSignRightStatus,
    isWriteStatus,
    isTxStatus,
  };
};
