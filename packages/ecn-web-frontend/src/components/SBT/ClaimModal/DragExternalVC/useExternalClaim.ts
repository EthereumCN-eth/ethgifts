import { constants } from "ethers";
import { useCallback, useEffect, useMemo } from "react";
import { useContractRead } from "wagmi";

import { checkWithMinTime } from "../hooks/checkWithMinTime";
import { useClaimSBTFromVCPure } from "../hooks/useClaimSBTFromVC";
import { useFuncTriggerByDeps } from "../hooks/useFuncTriggerByDeps";
import SBT1 from "@/abis/SBT1.json";
import { parseVCForPayload, verifyVC, verifyVCTicket } from "@/utils/vc";

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

export const useExternalClaim = ({
  clicked,
  vcStr,
  reset,
  onProcess,
  onCancel,
}: {
  clicked: boolean;
  vcStr: string | undefined;
  reset?: () => void;
  onProcess?: () => void;
  onCancel?: () => void;
}) => {
  //   const reset = useInternalDragState((state) => state.reset);
  // const setVerifyChecks = useInternalDragState(
  //   (state) => state.setVerifyChecks
  // );

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

  //   const { setClaimingCancelling, setClaimingProcessing } =
  //     useClaimingHintSetter();

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
    deps: [clicked],
    init: "idle",
  });

  const isSignRightStatus = useFuncTriggerByDeps({
    func: checkSignCallback,
    deps: [clicked, isVCRightStatus === "success", !!approverAdderss],
    init: "idle",
  });

  const { isTxStatus, isWriteStatus } = useClaimSBTFromVCPure({
    enabled: isVCRightStatus === "success" && isSignRightStatus === "success",
    vcStr,
    reset,
    onProcess,
    onCancel,
    // index,
  });

  useEffect(() => {
    // eslint-disable-next-line sonarjs/no-collapsible-if
    if (
      clicked &&
      (isSignRightStatus === "loading" ||
        isVCRightStatus === "loading" ||
        isTxStatus === "loading" ||
        isWriteStatus === "loading")
    ) {
      if (onProcess) onProcess();
    }

    if (
      clicked &&
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
    clicked,
    isSignRightStatus,
    isTxStatus,
    isVCRightStatus,
    isWriteStatus,
    onCancel,
    onProcess,
    reset,
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
