import { constants } from "ethers";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useContractRead } from "wagmi";

import { useInternalDragState } from "../internalDragState";
import SBT1 from "@/abis/SBT1.json";
import { parseVCForPayload, verifyVC, verifyVCTicket } from "@/utils/vc";

import { useClaimingHintSetter } from "./useClaimingHintSetter";
import { useClaimSBTFromVC } from "./useClaimSBTFromVC";

const timeoutPromise = (num: number) =>
  new Promise<boolean>((res) => {
    setTimeout(() => res(true), num);
  });

async function checkWithMinTime<T>(p: Promise<T>, time: number) {
  const [result] = await Promise.all([p, timeoutPromise(time)]);

  return result;
}

const useFuncTriggerByDeps = <T>({
  func,
  deps,
  init = "idle",
}: {
  func: () => Promise<T>;
  deps: boolean[];
  init: "error" | "success" | "loading" | "idle";
}) => {
  const [returnVal, setReturnVal] = useState<
    "error" | "success" | "loading" | "idle"
  >(init);
  useEffect(() => {
    if (deps.length === 0 || deps.every(Boolean)) {
      setReturnVal("loading");
      func().then((v) => {
        setReturnVal(v ? "success" : "error");
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [func, ...deps]);
  return returnVal;
};

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

export const useDropToClaim = ({ index }: { index: number }) => {
  const dropped = useInternalDragState((state) =>
    state.computed.selectedDropped(state)
  );

  const record = useInternalDragState((state) =>
    state.computed.selectedRecord(state)
  );

  const reset = useInternalDragState((state) => state.reset);
  // const setVerifyChecks = useInternalDragState(
  //   (state) => state.setVerifyChecks
  // );
  const vcStr = record?.signedVC;

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

  const { setClaimingCancelling, setClaimingProcessing } =
    useClaimingHintSetter();

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

  const { isTxStatus, isWriteStatus } = useClaimSBTFromVC({
    enabled: isVCRightStatus === "success" && isSignRightStatus === "success",
    index,
  });

  useEffect(() => {
    if (
      dropped &&
      (isSignRightStatus === "loading" ||
        isVCRightStatus === "loading" ||
        isTxStatus === "loading" ||
        isWriteStatus === "loading")
    ) {
      setClaimingProcessing();
    }

    if (
      dropped &&
      (isSignRightStatus === "error" || isVCRightStatus === "error")
    ) {
      setClaimingCancelling();
      const t = setTimeout(() => {
        reset(false);
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
    setClaimingProcessing,
    setClaimingCancelling,
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
