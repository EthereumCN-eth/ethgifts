import { Box, Flex, Image, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import type { DropTargetMonitor } from "react-dnd";
import { AiOutlineUpload } from "react-icons/ai";

import { useInternalDragState } from "./internalDragState";
import { VCDraggable } from "./VCDraggable";

export const VCDropArea = () => {
  const selectedArtwork = useInternalDragState((state) =>
    state.computed.selectedArtwork(state)
  );
  const setDrop = useInternalDragState((state) => state.setDrop);
  const dropped = useInternalDragState((state) =>
    state.computed.selectedDropped(state)
  );
  const selectedIndex = useInternalDragState((state) => state.selectedIndex);

  const [bgOpacity, setBgOpacity] = useState(0.2);
  const [dropText, setDropText] = useState("Drag & Drop");
  const [{ isOver }, dropRef] = useDrop(
    () => ({
      accept: ["VC"],
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      drop(item, monitor) {
        setDrop(true, selectedIndex);

        // onDrop(monitor.getItemType());
        return undefined;
      },

      collect: (monitor: DropTargetMonitor) => ({
        isOver: monitor.isOver(),
        // canDrop: monitor.canDrop(),
      }),
    }),
    [selectedIndex]
  );
  useEffect(() => {
    if (dropped) {
      setBgOpacity(0.5);
      setDropText("Please Confirm On Wallet");
    } else if (isOver) {
      setBgOpacity(0.5);
      setDropText("Drop to Claim");
    } else {
      setBgOpacity(0.3);
      setDropText("Drag & Drop");
    }
  }, [isOver, dropped]);
  return (
    <Flex
      direction="column"
      align="center"
      ref={dropRef}
      w="24vw"
      h="24vw"
      maxWidth="460px"
      maxH="460px"
      borderRadius="16px"
      // bgColor="transparent"
      border="1px dashed #FFFFFF"
      justify="center"
      position="relative"
      bgColor={isOver ? "rgba(238, 134, 43, 0.8)" : "transparent"}
    >
      <Image
        src={selectedArtwork}
        position="absolute"
        w="calc(24vw - 2px)"
        h="calc(24vw - 2px)"
        border="none"
        maxWidth="calc(460px - 2px)"
        maxH="calc(460px - 2px)"
        opacity={bgOpacity}
        left={0}
        top={0}
        bottom={0}
        right={0}
        p="1px"
        borderRadius="16px"
        zIndex={1}
        textAlign="center"
      />

      <VStack w="full" h="full" justify="center" zIndex={2}>
        <AiOutlineUpload color="#FFFFFF" size="9%" />
        <Box h="2%" />
        <Text
          color="#FFFFFF"
          fontSize={["sm", "sm", "md", "lg", "xl"]}
          fontWeight={600}
          textAlign="center"
        >
          {dropText}
        </Text>
        <Box h="1%" />
        <Text
          textAlign="center"
          w="70%"
          color="#FFFFFF"
          fontSize={["xs", "xs", "xs", "xs", "sm"]}
        >
          拖入证明你具有 E群誌 SBT 所有权的VC，以激活对应SBT的申领。
        </Text>
      </VStack>
      {dropped && <VCDraggable isAbsolute type="VC-DROPPED" />}
    </Flex>
  );
};
