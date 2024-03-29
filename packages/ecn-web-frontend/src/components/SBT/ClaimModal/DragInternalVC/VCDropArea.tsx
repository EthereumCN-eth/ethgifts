import { Box, Flex, Image, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import type { DropTargetMonitor } from "react-dnd";
import { AiOutlineUpload } from "react-icons/ai";

// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { responsive } from "../../../../styles/utils";
import { calcLen } from "../hooks/calcLen";
import { useComputeDropAreaTransformValue } from "../hooks/useComputeTransformValue";

import { useInternalDragState } from "./internalDragState";
import { VCDraggableDroppedView } from "./VCDraggableDroppedView";

export const VCDropArea = ({ index }: { index: number }) => {
  const selectedArtwork = useInternalDragState((state) =>
    state.computed.selectedArtwork(state)
  );
  const setDrop = useInternalDragState((state) => state.setDrop);
  const dropped = useInternalDragState((state) =>
    state.computed.selectedDropped(state)
  );
  const selectedIndex = useInternalDragState((state) => state.selectedIndex);
  const record = useInternalDragState((state) =>
    state.computed.selectedRecord(state)
  );
  const vcStr = record?.signedVC;

  // console.log("left", left);
  const [{ isOver }, dropRef] = useDrop(
    () => ({
      accept: ["VC"],
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      drop: async (item, monitor) => {
        if (vcStr) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          // const isVerifiedVC = await verifyVC(vcStr);
          setDrop(true, selectedIndex);
        }

        // onDrop(monitor.getItemType());
        return undefined;
      },

      collect: (monitor: DropTargetMonitor) => ({
        isOver: monitor.isOver(),

        // canDrop: monitor.canDrop(),
      }),
    }),
    [selectedIndex, vcStr]
  );

  const [bgOpacity, setBgOpacity] = useState(0.2);
  const [dropText, setDropText] = useState("Drag & Drop");
  useEffect(() => {
    if (dropped) {
      setBgOpacity(0.5);
      setDropText("");
    } else if (isOver) {
      setBgOpacity(0.5);
      setDropText("Drop to Claim");
    } else {
      setBgOpacity(0.3);
      setDropText("Drag & Drop");
    }
  }, [isOver, dropped]);

  const { ref: moveRef, droppedStyle } = useComputeDropAreaTransformValue({
    dropped,
  });

  const isSelectedClaimed = useInternalDragState((state) =>
    state.computed.selectedClaimed(state)
  );

  return (
    <Box ref={moveRef}>
      {isSelectedClaimed && (
        <Image
          src={selectedArtwork}
          w={`${calcLen(responsive.respW(496))}px`}
          h={`${calcLen(responsive.respW(496))}px`}
          border="none"
          maxWidth="calc(460px - 2px)"
          maxH="calc(460px - 2px)"
          opacity={1}
          p="1px"
          borderRadius="16px"
          zIndex={1}
          textAlign="center"
          // left={0}
          // top={0}
          // bottom={0}
          // right={0}
          // position="absolute"
        />
      )}
      {!isSelectedClaimed && (
        <Flex
          sx={{ ...droppedStyle }}
          direction="column"
          align="center"
          ref={dropRef}
          w={`${calcLen(responsive.respW(496))}px`}
          h={`${calcLen(responsive.respW(496))}px`}
          maxWidth="460px"
          maxH="460px"
          borderRadius="16px"
          // zIndex={dropped ? 1000 : 0}
          // bgColor="transparent"
          border="1px dashed #FFFFFF"
          justify="center"
          position="relative"
          bgColor={isOver ? "rgba(238, 134, 43, 0.8)" : "transparent"}
          transition="all 1s cubic-bezier(0.77, 0, 0.175, 1) , background-color 0.5s cubic-bezier(0.77, 0, 0.175, 1)"
        >
          <Image
            src={selectedArtwork}
            position="absolute"
            w={`calc(${calcLen(responsive.respW(496))}px - 2px)`}
            h={`calc(${calcLen(responsive.respW(496))}px - 2px)`}
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
              fontSize={`${calcLen(responsive.respW(20))}px`}
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
              fontSize={`${calcLen(responsive.respW(14))}px`}
            >
              拖入证明你具有 E群誌 SBT 所有权的VC，以激活对应SBT的申领。
            </Text>
          </VStack>
          <VCDraggableDroppedView index={index} type="VC-DROPPED" />
        </Flex>
      )}
    </Box>
  );
};
