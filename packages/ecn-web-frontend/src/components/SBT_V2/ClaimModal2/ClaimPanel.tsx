import { Box, Flex } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { DragIndicator } from "@/components/SBT/ClaimModal/DragInternalVC/DragIndicator";
import { useAppSelector } from "@/state/reduxHooks";
import { selectors as sbtSelectors } from "@/state/sbt";
import { responsive } from "@/styles/utils";

import { VCDropAreaView } from "./VCDropAreaView";
import { VCToDragView } from "./VCToDragView";

export const ClaimPanel = ({
  levelIndex,
  isClaimed,
}: {
  levelIndex: number;
  isClaimed: boolean;
}) => {
  const { artworks } = useAppSelector(sbtSelectors.selectAll);
  const [dropped, setDropped] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [claimed, setClaimed] = useState(isClaimed);
  const onCancel = useCallback(() => {
    setDropped(false);
  }, []);
  const onProcess = useCallback(() => {}, []);
  const reset = useCallback(() => {
    setDropped(false);
  }, []);
  const onSuccess = useCallback(() => {
    setDropped(false);
    setClaimed(true);
  }, []);
  const artwork = artworks[levelIndex];

  return (
    <Flex
      w="100%"
      h={responsive.respHStr(570)}
      align="center"
      justify="center"
      position="relative"
      // bgColor="gray.100"
    >
      <DndProvider backend={HTML5Backend}>
        {/*  */}
        <VCToDragView dropped={dropped} levelIndex={levelIndex} />
        <Box w="3vw" />
        <DragIndicator hidden={claimed || dropped} />

        <Box w="3vw" />

        <VCDropAreaView
          levelIndex={levelIndex}
          claimed={claimed}
          setDropped={setDropped}
          dropped={dropped}
          onCancel={onCancel}
          onProcess={onProcess}
          onSuccess={onSuccess}
          reset={reset}
          artwork={artwork}
        />
        {/*  */}
      </DndProvider>
      {/*  */}
    </Flex>
  );
};
