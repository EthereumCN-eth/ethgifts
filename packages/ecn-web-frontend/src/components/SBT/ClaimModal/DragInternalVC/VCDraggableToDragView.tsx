import { Center } from "@chakra-ui/react";

import { useComputeDragTransformValue } from "./hooks/useComputeTransformValue";
import { useInternalDragState } from "./internalDragState";
import { NoVcDragView } from "./NoVcDragView";
import { VCDraggableView } from "./VCDraggableView";

const hiddenStyleProps = {
  // visibility: "hidden",
  opacity: 0,
};

export const VCDraggableToDragView = ({ type }: { type: string }) => {
  const record = useInternalDragState((state) =>
    state.computed.selectedRecord(state)
  );
  const dropped = useInternalDragState((state) =>
    state.computed.selectedDropped(state)
  );

  const hasVc = !!record;
  const { droppedStyle, ref } = useComputeDragTransformValue({ dropped });

  if (!hasVc) {
    return (
      <Center
        // transition="transform 1s cubic-bezier(0.77, 0, 0.175, 1) , background-color 0.5s cubic-bezier(0.77, 0, 0.175, 1)"
        sx={dropped ? hiddenStyleProps : {}}
        // style={droppedStyle}
      >
        <NoVcDragView />
      </Center>
    );
  }

  return (
    <Center
      ref={ref}
      transition="transform 1s cubic-bezier(0.77, 0, 0.175, 1)"
      sx={dropped ? hiddenStyleProps : {}}
      style={droppedStyle}
      zIndex={dropped ? -1 : 100}
    >
      <VCDraggableView type={type} record={record} />
      {/* <VCStepProgressView /> */}
    </Center>
  );
};
