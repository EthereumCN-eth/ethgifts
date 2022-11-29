import { Center } from "@chakra-ui/react";

import { useComputeDragTransformValue } from "./hooks/useComputeTransformValue";
import { useInternalDragState } from "./internalDragState";
import { NoVcDragView } from "./NoVcDragView";
import { VCDraggableView } from "./VCDraggableView";
import { VCStepProgressView } from "./VCStepProgressView";

const absoluteStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
};

const hiddenStyleProps = {
  // visibility: "hidden",
  opacity: 0,
};

export const VCDraggable = ({
  isAbsolute = false,
  isControlHidden = false,
  type,
}: {
  isAbsolute?: boolean;
  isControlHidden?: boolean;
  type: string;
}) => {
  const record = useInternalDragState((state) =>
    state.computed.selectedRecord(state)
  );
  const dropped = useInternalDragState((state) =>
    state.computed.selectedDropped(state)
  );

  const hasVc = !!record;
  const sxStyle = isAbsolute ? absoluteStyle : {};
  const isToHide = isControlHidden && dropped;
  const isHiddenProps = isToHide ? hiddenStyleProps : {};

  const combinedStyle = { ...sxStyle, ...isHiddenProps };

  const { droppedStyle, ref } = useComputeDragTransformValue({ dropped });

  if (!hasVc) {
    return (
      <Center
        // transition="transform 1s cubic-bezier(0.77, 0, 0.175, 1) , background-color 0.5s cubic-bezier(0.77, 0, 0.175, 1)"
        sx={combinedStyle}
        // style={droppedStyle}
      >
        <NoVcDragView />
      </Center>
    );
  }

  if (isAbsolute) {
    return (
      <Center sx={combinedStyle} position="relative">
        <VCDraggableView type={type} record={record} />
        <VCStepProgressView />
      </Center>
    );
  }
  return (
    <Center
      ref={ref}
      transition="transform 1s cubic-bezier(0.77, 0, 0.175, 1)"
      sx={isHiddenProps}
      style={droppedStyle}
      zIndex={isToHide ? -1 : 100}
    >
      <VCDraggableView type={type} record={record} />
      {/* <VCStepProgressView /> */}
    </Center>
  );
};
