import { Box, Flex } from "@chakra-ui/react";

import { DragIndicator } from "./DragIndicator";
import { VCDraggable } from "./VCDraggable";
import { VCDropArea } from "./VCDropArea";

export const InternalDragPanel = () => {
  return (
    <Flex w="100%" h="100%" align="center" justify="center">
      <VCDraggable type="VC" isControlHidden />
      <Box w="3vw" />
      <DragIndicator />

      <Box w="3vw" />
      <VCDropArea />
    </Flex>
  );
};
