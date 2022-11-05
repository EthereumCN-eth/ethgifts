import { Button, Spinner, Text, VStack } from "@chakra-ui/react";
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
  const setClaimingHint = useInternalDragState(
    (state) => state.setClaimingHint
  );
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
  const { data, write, isError, error } = useCLaimSBT({
    payload: vcPayloadOrNull,
  });

  const { isLoading: isTxLoading, isSuccess: isTxSuccess } =
    useWaitForTransaction({
      hash: data?.hash,
    });
  const payloadreceived = !!vcPayloadOrNull;
  useEffect(() => {
    if (dropped) {
      setClaimingHint({
        claimingHint: (
          <>
            <Text color="#EE862B">{`请在钱包确认领取 Lv${
              selectedIndex + 1
            } E群誌 SBT`}</Text>
            <Spinner ml="5px" size="sm" color="white" />
          </>
        ),
      });
      write?.();
    }
  }, [payloadreceived, setClaimingHint, write, dropped, selectedIndex]);

  useEffect(() => {
    if (error?.message?.startsWith("user rejected transaction")) {
      setClaimingHint({
        claimingHint: (
          <VStack>
            <Text color="#A34829">钱包交互被取消</Text>
            <Button variant="orangeOutline" onClick={() => reset(false)}>
              重置交互
            </Button>
          </VStack>
        ),
      });
    }
  }, [error?.message, isError, reset, setClaimingHint]);

  useEffect(() => {
    if (isTxSuccess) {
      reset(true);
    } else if (isTxLoading) {
      setClaimingHint({
        claimingHint: (
          <VStack>
            <Text color="#A34829">链上处理中...</Text>
          </VStack>
        ),
      });
    }
  }, [isTxLoading, isTxSuccess, reset, setClaimingHint]);

  // console.log("write", write);
  // console.log("isError", isError, error?.message, error?.cause);
  // console.log("verifyPayload", payloadreceived);
}
