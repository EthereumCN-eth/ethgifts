import { Box, Flex } from "@chakra-ui/react";

import { DragIndicator } from "./DragIndicator";
import { useInternalDragState } from "./internalDragState";
import { VCDraggable } from "./VCDraggable";
import { VCDropArea } from "./VCDropArea";

export const InternalDragPanel = () => {
  const isSelectedClaimed = useInternalDragState((state) =>
    state.computed.selectedClaimed(state)
  );

  return (
    <Flex w="100%" h="100%" align="center" justify="center" position="relative">
      <VCDraggable type="VC" isControlHidden />
      <Box w="3vw" />
      <DragIndicator hidden={isSelectedClaimed} />

      <Box w="3vw" />
      <VCDropArea />
    </Flex>
  );
};
