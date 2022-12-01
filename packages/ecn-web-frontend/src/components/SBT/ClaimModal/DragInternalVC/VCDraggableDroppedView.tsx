import { Center } from "@chakra-ui/react";

import { useInternalDragState } from "./internalDragState";
import { VCDraggableView } from "./VCDraggableView";
import { VCStepProgressView } from "./VCStepProgressView";

const absoluteStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
};

export const VCDraggableDroppedView = ({
  type,
  index,
}: {
  type: string;
  index: number;
}) => {
  const record = useInternalDragState((state) =>
    state.computed.selectedRecord(state)
  );
  const dropped = useInternalDragState((state) =>
    state.computed.selectedDropped(state)
  );

  const hasVc = !!record;

  if (!hasVc) {
    return (
      // <Center
      //   // transition="transform 1s cubic-bezier(0.77, 0, 0.175, 1) , background-color 0.5s cubic-bezier(0.77, 0, 0.175, 1)"
      //   sx={absoluteStyle}
      //   // style={droppedStyle}
      // >
      //   <NoVcDragView />
      // </Center>
      null
    );
  }

  return (
    <Center
      sx={{
        ...absoluteStyle,
        "& .ecn-vc-draggble": {
          opacity: dropped ? 1 : 0,
        },
      }}
      h="full"
      w="full"
      // bgColor="green"
      position="relative"
    >
      <VCDraggableView type={type} record={record} />
      <VCStepProgressView index={index} />
    </Center>
  );
};
