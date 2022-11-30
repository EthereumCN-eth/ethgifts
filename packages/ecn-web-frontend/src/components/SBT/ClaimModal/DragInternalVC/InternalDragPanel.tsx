import { Box, Flex } from "@chakra-ui/react";

import { DragIndicator } from "./DragIndicator";
import { useInternalDragState } from "./internalDragState";
import { VCDraggableToDragView } from "./VCDraggableToDragView";
import { VCDropArea } from "./VCDropArea";

export const InternalDragPanel = () => {
  const isSelectedClaimed = useInternalDragState((state) =>
    state.computed.selectedClaimed(state)
  );

  return (
    <Flex w="100%" h="100%" align="center" justify="center" position="relative">
      <VCDraggableToDragView type="VC" />
      <Box w="3vw" />
      <DragIndicator hidden={isSelectedClaimed} />

      <Box w="3vw" />
      <VCDropArea />
    </Flex>
  );
};
