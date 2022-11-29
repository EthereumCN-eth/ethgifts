import { Box, Text } from "@chakra-ui/react";
import { constants } from "ethers";
import { useEffect, useMemo } from "react";
import {
  useContractWrite,
  usePrepareContractWrite,
  useSigner,
  useWaitForTransaction,
} from "wagmi";

import { responsive } from "../../utils";
import { useInternalDragState } from "../internalDragState";
import { ProcessingSpinner } from "../ProcessingSpinner";
import SBT1 from "@/abis/SBT1.json";
import type { ParseVCForPayloadDataType } from "@/utils/vc";
import { parseVCForPayload } from "@/utils/vc";

const hintText = {
  processing: ({ selectedIndex }: { selectedIndex: number }) => (
    <>
      <Text color="#EE862B">{`claim processing Lv${selectedIndex + 1}`}</Text>
      {/* <Spinner ml="5px" size="sm" color="white" /> */}
      <Box w="10px" />
      <ProcessingSpinner size={responsive.respWStr(25)} color="white" />
    </>
  ),
  cancelling: ({ selectedIndex }: { selectedIndex: number }) => (
    <>
      <Text color="#EE862B">{`claim cancelling Lv${selectedIndex + 1}`}</Text>
      <Box w="10px" />
      <ProcessingSpinner size={responsive.respWStr(25)} color="white" />
    </>
  ),
};

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

  useEffect(() => {
    if (dropped) {
      setClaimingHint({
        claimingHint: hintText.processing({ selectedIndex }),
      });
      // to verify
      // const isVerifiedVC = await verifyVC(vcStr);
      const tr = setTimeout(() => {
        write?.();
      }, 4000);
      return () => {
        clearTimeout(tr);
      };
    }
    return () => {};
  }, [payloadreceived, setClaimingHint, write, dropped, selectedIndex]);

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

      setClaimingHint({
        claimingHint: hintText.cancelling({ selectedIndex }),
      });

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
    setClaimingHint,
  ]);

  useEffect(() => {
    if (isTxSuccess) {
      reset(true);
    } else if (isTxLoading) {
      setClaimingHint({
        claimingHint: hintText.processing({ selectedIndex }),
      });
    }
  }, [isTxLoading, isTxSuccess, reset, selectedIndex, setClaimingHint]);

  // console.log("write", write);
  // console.log("isError", isError, error?.message, error?.cause);
  // console.log("verifyPayload", payloadreceived);
}
