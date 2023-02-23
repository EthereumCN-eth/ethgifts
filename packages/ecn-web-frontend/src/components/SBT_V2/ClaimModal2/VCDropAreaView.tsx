import { Box, Flex, Image, Text, VStack } from "@chakra-ui/react";
import type { Dispatch, SetStateAction } from "react";
import { useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import type { DropTargetMonitor } from "react-dnd";
import { AiOutlineUpload } from "react-icons/ai";

import { useComputeDropAreaTransformValue } from "@/components/SBT/ClaimModal/hooks/useComputeTransformValue";
import { useAppSelector } from "@/state/reduxHooks";
import { selectors as sbtSelectors } from "@/state/sbt";
import { responsive } from "@/styles/utils";

import { resLen } from "./resLen";
// import { useVCDropClaim } from "./useVCDropClaim";
import { VCDroppedView } from "./VCDroppedView";
import { VCProgressView } from "./VCProgressView";

export const VCDropAreaView = ({
  setDropped,
  dropped,
  claimed,
  onCancel,
  onProcess,
  onSuccess,
  reset,
  artwork,
  levelIndex,
  hintStatus,
}: {
  setDropped: Dispatch<SetStateAction<boolean>>;
  dropped: boolean;
  claimed: boolean;
  onCancel?: (() => void) | undefined;
  onProcess?: (() => void) | undefined;
  onSuccess?: (() => void) | undefined;
  reset?: (() => void) | undefined;
  artwork: string;
  levelIndex: number;
  hintStatus: "process" | "success" | "fail" | "null";
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [{ isOver }, dropRef] = useDrop(
    () => ({
      accept: ["VC"],
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      drop: async (item, monitor) => {
        // if (vcStr) {
        //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
        //   // const isVerifiedVC = await verifyVC(vcStr);
        //   setDrop(true, selectedIndex);
        // }
        setDropped(true);

        // onDrop(monitor.getItemType());
        return undefined;
      },

      collect: (monitor: DropTargetMonitor) => ({
        isOver: monitor.isOver(),
        // canDrop: monitor.canDrop(),
      }),
    }),
    []
  );

  const { ref: moveRef, droppedStyle } = useComputeDropAreaTransformValue({
    dropped: dropped && !claimed,
  });

  const vcStr = useAppSelector((state) =>
    sbtSelectors.selectVCStr(state, levelIndex)
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

  // if (claimed) {
  //   return (

  // }

  return (
    <Box
      ref={moveRef}
      style={droppedStyle}
      transition="all 1s cubic-bezier(0.77, 0, 0.175, 1)"
    >
      {claimed && (
        <Image
          src={artwork}
          // position="absolute"
          w={`calc(${resLen(496)}px - 2px)`}
          h={`calc(${resLen(496)}px - 2px)`}
          border="none"
          maxWidth="calc(460px - 2px)"
          maxH="calc(460px - 2px)"
          // opacity={bgOpacity}
          // left={0}
          // top={0}
          // bottom={0}
          // right={0}
          p="1px"
          borderRadius="16px"
          zIndex={1}
          textAlign="center"
        />
      )}
      {!claimed && (
        <Flex
          // sx={{ ...droppedStyle }}
          direction="column"
          align="center"
          ref={dropRef}
          w={`${resLen(496)}px`}
          h={`${resLen(496)}px`}
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
            src={artwork}
            position="absolute"
            w={`calc(${resLen(496)}px - 2px)`}
            h={`calc(${resLen(496)}px - 2px)`}
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
              fontSize={`${responsive.respW(20)}px`}
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
              fontSize={`${responsive.respW(14)}px`}
            >
              拖入证明你具有 E群誌 SBT 所有权的VC，以激活对应SBT的申领。
            </Text>
          </VStack>
          <VCDroppedView
            levelIndex={levelIndex}
            vcStr={vcStr}
            dropped={dropped}
          />
          <VCProgressView
            onSuccess={onSuccess}
            onCancel={onCancel}
            onProcess={onProcess}
            reset={reset}
            claimed={claimed}
            dropped={dropped}
            vcStr={vcStr}
            hintStatus={hintStatus}
          />
        </Flex>
      )}
    </Box>
  );
};
