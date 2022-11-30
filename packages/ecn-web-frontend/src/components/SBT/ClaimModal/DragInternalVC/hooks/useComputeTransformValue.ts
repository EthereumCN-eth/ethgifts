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

  // console.log("dropped", dropped);

  const droppedStyle = dropped
    ? {
        transform: `translate(-${offSet.current}px,0)`,
      }
    : {};
  // console.log("droppedStyle", droppedStyle);
  return {
    ref: mref,
    droppedStyle,
  };
};

// let iii = 0;

export const useComputeDragTransformValue = ({
  dropped,
}: {
  dropped: boolean;
}) => {
  const [rect, mref] = useRect<HTMLDivElement>();
  const offSet = useRef(0);
  const setDragX = useInternalDragState((state) => state.setDragX);
  // console.log("rect", rect);
  useEffect(() => {
    if (rect && rect.x !== 0) {
      // iii += 1;
      // console.log("iii", iii);
      setDragX(rect.x);
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
