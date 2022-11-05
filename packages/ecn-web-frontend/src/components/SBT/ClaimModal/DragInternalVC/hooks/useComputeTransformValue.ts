import { useEffect, useRef } from "react";

import { useInternalDragState } from "../internalDragState";
import { useRect } from "@/hooks/useRect";

export const useComputeDropAreaTransformValue = ({
  dropped,
}: {
  dropped: boolean;
}) => {
  const [rect, mref] = useRect<HTMLDivElement>();
  const offSet = useRef(0);
  const setDropTargetX = useInternalDragState((state) => state.setDropTargetX);
  useEffect(() => {
    if (rect && rect.x !== 0) {
      setDropTargetX(rect.x);
      offSet.current = rect.x - window.innerWidth / 2 + rect.width / 2;
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rect?.x, rect?.width]); // console.log("dropTargetX", dropTargetX);

  const droppedStyle = dropped
    ? {
        transform: `translate(-${offSet.current}px,0)`,
      }
    : {};
  return {
    ref: mref,
    droppedStyle,
  };
};

export const useComputeDragTransformValue = ({
  dropped,
}: {
  dropped: boolean;
}) => {
  const [rect, mref] = useRect<HTMLDivElement>();
  const offSet = useRef(0);
  const setDropTargetX = useInternalDragState((state) => state.setDragX);
  useEffect(() => {
    if (rect && rect.x !== 0) {
      setDropTargetX(rect.x);
      offSet.current = window.innerWidth / 2 - rect.x - rect.width / 2;
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rect?.x, rect?.width]); // console.log("dropTargetX", dropTargetX);

  const droppedStyle = dropped
    ? {
        transform: `translate(${offSet.current}px,0)`,
        // zIndex: 1,
      }
    : {
        transform: `translate(0,0)`,
        // zIndex: 1,
      };
  return {
    ref: mref,
    droppedStyle,
  };
};
