import { constants } from "ethers";
import { useEffect, useMemo } from "react";
import {
  useContractWrite,
  usePrepareContractWrite,
  useSigner,
  useWaitForTransaction,
} from "wagmi";

import { useInternalDragState } from "../internalDragState";
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

export function useClaimSBTFromVC() {
  const record = useInternalDragState((state) =>
    state.computed.selectedRecord(state)
  );
  const dropped = useInternalDragState((state) =>
    state.computed.selectedDropped(state)
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
  } = useCLaimSBT({
    payload: vcPayloadOrNull,
  });

  const { isLoading: isTxLoading, isSuccess: isTxSuccess } =
    useWaitForTransaction({
      hash: data?.hash,
    });
  const payloadreceived = !!vcPayloadOrNull;

  const { setClaimingCancelling, setClaimingProcessing } =
    useClaimingHintSetter();

  useEffect(() => {
    if (dropped) {
      setClaimingProcessing();
      // to verify
      // const isVerifiedVC = await verifyVC(vcStr);
      // const tr = setTimeout(() => {
      //   write?.();
      // }, 4000);
      // return () => {
      //   clearTimeout(tr);
      // };
    }
    return () => {};
  }, [payloadreceived, write, dropped, setClaimingProcessing, selectedIndex]);

  useEffect(() => {
    if (error?.message?.startsWith("user rejected transaction")) {
      // setClaimingHint({
      //   claimingHint: (
      //     <VStack>
      //       <Text color="#A34829">钱包交互被取消</Text>
      //       <Button variant="orangeOutline" onClick={() => reset(false)}>
      //         重置交互
      //       </Button>
      //     </VStack>
      //   ),
      // });

      setClaimingCancelling();

      const t = setTimeout(() => {
        reset(false);
        resetClaim();
      }, 1000);
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

  // console.log("write", write);
  // console.log("isError", isError, error?.message, error?.cause);
  // console.log("verifyPayload", payloadreceived);
}
