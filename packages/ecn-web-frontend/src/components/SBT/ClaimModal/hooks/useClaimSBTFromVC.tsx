import { constants } from "ethers";
import { useEffect, useMemo } from "react";
import {
  useContractWrite,
  usePrepareContractWrite,
  useSigner,
  useWaitForTransaction,
} from "wagmi";

import { useInternalDragState } from "../DragInternalVC/internalDragState";
import SBT1 from "@/abis/SBT1.json";
import type { ParseVCForPayloadDataType } from "@/utils/vc";
import { parseVCForPayload } from "@/utils/vc";

import { useClaimingHintSetter } from "./useClaimingHintSetter";

const useCLaimSBT = ({ payload }: { payload: ParseVCForPayloadDataType }) => {
  const {
    expressAmount,
    metadataURI,
    receiver,
    signature,
    verifyingContract,
    chainId,
  } = payload || {};
  const hasArgs =
    !!receiver &&
    !!metadataURI &&
    !!expressAmount &&
    !!signature &&
    !!verifyingContract &&
    !!chainId;
  const { data: signer, isSuccess } = useSigner();
  // console.log("useCLaimSBT isSuccess", isSuccess);
  // console.log("useCLaimSBT signer", signer);
  // console.log("payload", payload);
  // console.log("hasArgs", hasArgs);
  const { config } = usePrepareContractWrite({
    contractInterface: SBT1.abi,
    addressOrName: verifyingContract || constants.AddressZero,
    chainId,
    functionName: "mintExpress",
    args: [receiver, metadataURI, expressAmount, signature],
    enabled: hasArgs && isSuccess,
    // overrides: {
    //   gasLimit: 50000,
    // },

    signer,
  });
  return useContractWrite(config);
};

export const useClaimSBTFromVCPure = ({
  vcStr,
  enabled,
  reset,
  onProcess,
  onCancel,
  onSuccess,
}: {
  vcStr: string | undefined;
  enabled: boolean;
  reset?: () => void;
  onProcess?: () => void;
  onCancel?: () => void;
  onSuccess?: () => void;
}) => {
  const vcPayloadOrNull = useMemo(() => {
    if (vcStr) return parseVCForPayload(vcStr || "{}").data;
    return null;
  }, [vcStr]);

  const {
    data,
    write,
    isError,
    error,
    reset: resetClaim,
    // isSuccess: isWriteSuccess,
    // isLoading: isWriteLoading,
    status: isWriteStatus,
  } = useCLaimSBT({
    payload: vcPayloadOrNull,
  });

  const {
    isLoading: isTxLoading,
    isSuccess: isTxSuccess,
    // isError: isTxError,
    status,
  } = useWaitForTransaction({
    hash: data?.hash,
  });
  const payloadreceived = !!vcPayloadOrNull;

  useEffect(() => {
    // console.log("selectedIndex", selectedIndex);
    // console.log("index", index);
    if (enabled && payloadreceived && !!write) {
      if (onProcess) onProcess();
      // to verify
      // const isVerifiedVC = await verifyVC(vcStr);
      const tr = setTimeout(() => {
        write?.();
      }, 1000);
      return () => {
        clearTimeout(tr);
      };
    }
    return () => {};
  }, [payloadreceived, write, enabled, onProcess]);

  useEffect(() => {
    if (error?.message?.startsWith("user rejected transaction")) {
      if (onCancel) onCancel();
      const t = setTimeout(() => {
        if (reset) reset();
        resetClaim();
      }, 2500);
      return () => {
        clearTimeout(t);
      };
    }
    return () => {};
  }, [error?.message, isError, onCancel, reset, resetClaim]);

  useEffect(() => {
    if (isTxSuccess) {
      if (onSuccess) onSuccess();
      // const t = setTimeout(() => {}, 2500);
      // return () => {
      //   clearTimeout(t);
      // };

      // eslint-disable-next-line sonarjs/no-collapsible-if
    } else if (isTxLoading) {
      if (onProcess) onProcess();
    }
    return () => {};
  }, [isTxLoading, isTxSuccess, onProcess, onSuccess, reset]);

  return {
    isWriteStatus,
    isTxStatus: status,
  };
};

export function useClaimSBTFromVC({
  enabled,
  index,
}: // time,
{
  enabled: boolean;
  index: number;
  // time: number;
}) {
  const record = useInternalDragState((state) =>
    state.computed.selectedRecord(state)
  );
  const reset = useInternalDragState((state) => state.reset);
  const selectedIndex = useInternalDragState((state) => state.selectedIndex);
  const signedVC = record?.signedVC;
  const vcPayloadOrNull = useMemo(() => {
    if (signedVC) return parseVCForPayload(signedVC || "{}").data;
    return null;
  }, [signedVC]);
  const {
    data,
    write,
    isError,
    error,
    reset: resetClaim,
    // isSuccess: isWriteSuccess,
    // isLoading: isWriteLoading,
    status: isWriteStatus,
  } = useCLaimSBT({
    payload: vcPayloadOrNull,
  });

  const {
    isLoading: isTxLoading,
    isSuccess: isTxSuccess,
    // isError: isTxError,
    status,
  } = useWaitForTransaction({
    hash: data?.hash,
  });
  const payloadreceived = !!vcPayloadOrNull;

  const { setClaimingCancelling, setClaimingProcessing } =
    useClaimingHintSetter();

  useEffect(() => {
    // console.log("selectedIndex", selectedIndex);
    // console.log("index", index);
    if (enabled && payloadreceived && !!write && selectedIndex === index) {
      setClaimingProcessing();
      // to verify
      // const isVerifiedVC = await verifyVC(vcStr);
      const tr = setTimeout(() => {
        write?.();
      }, 1000);
      return () => {
        clearTimeout(tr);
      };
    }
    return () => {};
  }, [
    payloadreceived,
    write,
    setClaimingProcessing,
    selectedIndex,
    enabled,
    index,
    // time,
  ]);

  useEffect(() => {
    if (error?.message?.startsWith("user rejected transaction")) {
      setClaimingCancelling();

      const t = setTimeout(() => {
        reset(false);
        resetClaim();
      }, 2500);
      return () => {
        clearTimeout(t);
      };
    }
    return () => {};
  }, [
    error?.message,
    isError,
    reset,
    resetClaim,
    selectedIndex,
    setClaimingCancelling,
  ]);

  useEffect(() => {
    if (isTxSuccess) {
      reset(true);
    } else if (isTxLoading) {
      setClaimingProcessing();
    }
  }, [isTxLoading, isTxSuccess, reset, selectedIndex, setClaimingProcessing]);

  return {
    isWriteStatus,
    isTxStatus: status,
  };

  // console.log("write", write);
  // console.log("isError", isError, error?.message, error?.cause);
  // console.log("verifyPayload", payloadreceived);
}
