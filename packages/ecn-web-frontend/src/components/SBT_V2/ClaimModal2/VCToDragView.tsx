import { Box } from "@chakra-ui/react";
import { useDrag } from "react-dnd";
import type { DragSourceMonitor } from "react-dnd";

import { useComputeDragTransformValue } from "@/components/SBT/ClaimModal/hooks/useComputeTransformValue";
import { useAppSelector } from "@/state/reduxHooks";
import { selectors as sbtSelectors } from "@/state/sbt";

import { VCView } from "./VCView";

export const VCToDragView = ({
  dropped,
  levelIndex,
}: {
  dropped: boolean;
  levelIndex: number;
}) => {
  const { droppedStyle, ref } = useComputeDragTransformValue({ dropped });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { loaded, records, sbtLevel, itemTexts, sbtTitle } = useAppSelector(
    sbtSelectors.selectAll
  );
  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: "VC",
      item: { id: `${sbtTitle}-${levelIndex}` },
      // canDrag: !forbidDrag,
      collect: (monitor: DragSourceMonitor) => ({
        isDragging: monitor.isDragging(),
        // didDrop: monitor.didDrop(),
      }),
    }),
    [sbtTitle, levelIndex]
    // [forbidDrag, color]
  );

  return (
    <Box ref={dragRef} cursor="grab" opacity={isDragging ? "0.5" : "1"}>
      <Box
        ref={ref}
        opacity={dropped ? 0 : 1}
        zIndex={dropped ? -1 : 100}
        style={droppedStyle}
      >
        <VCView />
      </Box>
    </Box>
  );
};
