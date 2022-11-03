import { Center } from "@chakra-ui/react";

import { useInternalDragState } from "./internalDragState";
import { NoVcDragView } from "./NoVcDragView";
import { VCDraggableView } from "./VCDraggableView";

const absoluteStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
};

const hiddenStyleProps = {
  visibility: "hidden",
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
  const isHiddenProps = isControlHidden && dropped ? hiddenStyleProps : {};

  const combinedStyle = { ...sxStyle, ...isHiddenProps };

  if (!hasVc) {
    return (
      <Center sx={combinedStyle}>
        <NoVcDragView />
      </Center>
    );
  }

  return (
    <Center sx={combinedStyle}>
      <VCDraggableView type={type} record={record} />
    </Center>
  );
};
