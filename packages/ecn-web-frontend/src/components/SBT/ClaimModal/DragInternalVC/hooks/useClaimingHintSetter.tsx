import { Box, Text } from "@chakra-ui/react";
import { useCallback, useMemo } from "react";

import { responsive } from "../../utils";
import { useInternalDragState } from "../internalDragState";
import { ProcessingSpinner } from "../ProcessingSpinner";

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

export const useClaimingHintSetter = () => {
  const setClaimingHint = useInternalDragState(
    (state) => state.setClaimingHint
  );
  const selectedIndex = useInternalDragState((state) => state.selectedIndex);

  const setClaimingProcessing = useCallback(() => {
    setClaimingHint({ claimingHint: hintText.processing({ selectedIndex }) });
  }, [selectedIndex, setClaimingHint]);
  const setClaimingCancelling = useCallback(() => {
    setClaimingHint({ claimingHint: hintText.cancelling({ selectedIndex }) });
  }, [selectedIndex, setClaimingHint]);

  return useMemo(
    () => ({
      setClaimingProcessing,
      setClaimingCancelling,
    }),
    [setClaimingCancelling, setClaimingProcessing]
  );
};
