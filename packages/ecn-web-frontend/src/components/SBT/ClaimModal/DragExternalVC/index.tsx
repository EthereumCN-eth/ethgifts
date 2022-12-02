import { Flex } from "@chakra-ui/react";
import { useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { calcLen } from "../hooks/calcLen";
// import { useComputeDropAreaTransformValue } from "../hooks/useComputeTransformValue";
import { responsive } from "../utils";

import { VCDropZone } from "./VCDropZone";

export const DragExternalVC = () => {
  // const selectedArtwork = useInternalDragState((state) =>
  //   state.computed.selectedArtwork(state)
  // );
  // const setDrop = useInternalDragState((state) => state.setDrop);
  // const dropped = useInternalDragState((state) =>
  //   state.computed.selectedDropped(state)
  // );
  // const selectedIndex = useInternalDragState((state) => state.selectedIndex);
  // const record = useInternalDragState((state) =>
  //   state.computed.selectedRecord(state)
  // );
  // const vcStr = record?.signedVC;

  // const [bgOpacity, setBgOpacity] = useState(0.2);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [dropText, setDropText] = useState("上传 VC 申领SBT");

  // // console.log("left", left);
  // const [{ isOver }, dropRef] = useDrop(
  //   () => ({
  //     accept: ["VC"],
  //     // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //     drop: async (item, monitor) => {
  //       if (vcStr) {
  //         // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //         // const isVerifiedVC = await verifyVC(vcStr);
  //         setDrop(true, selectedIndex);
  //       }

  //       // onDrop(monitor.getItemType());
  //       return undefined;
  //     },

  //     collect: (monitor: DropTargetMonitor) => ({
  //       isOver: monitor.isOver(),

  //       // canDrop: monitor.canDrop(),
  //     }),
  //   }),
  //   [selectedIndex, vcStr]
  // );

  // useEffect(() => {
  //   if (dropped) {
  //     setBgOpacity(0.5);
  //     setDropText("");
  //   } else if (isOver) {
  //     setBgOpacity(0.5);
  //     setDropText("Drop to Claim");
  //   } else {
  //     setBgOpacity(0.3);
  //     setDropText("Drag & Drop");
  //   }
  // }, [isOver, dropped]);

  // const { ref: moveRef, droppedStyle } = useComputeDropAreaTransformValue({
  //   dropped,
  // });

  // const isSelectedClaimed = useInternalDragState((state) =>
  //   state.computed.selectedClaimed(state)
  // );

  return (
    <Flex w="full" h="full" direction="column" align="center" justify="center">
      <Flex
        direction="column"
        align="center"
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
        // bgColor={isOver ? "rgba(238, 134, 43, 0.8)" : "transparent"}
        transition="all 1s cubic-bezier(0.77, 0, 0.175, 1) , background-color 0.5s cubic-bezier(0.77, 0, 0.175, 1)"
      >
        {/* <Image
          // src={selectedArtwork}
          position="absolute"
          w={`calc(${calcLen(responsive.respW(496))}px - 2px)`}
          h={`calc(${calcLen(responsive.respW(496))}px - 2px)`}
          border="none"
          maxWidth="calc(460px - 2px)"
          maxH="calc(460px - 2px)"
          // opacity={bgOpacity}
          left={0}
          top={0}
          bottom={0}
          right={0}
          p="1px"
          borderRadius="16px"
          zIndex={1}
          textAlign="center"
        /> */}

        <VCDropZone dropText={dropText} />
      </Flex>
    </Flex>
  );
};
