import { useLayoutEffect, useMemo, useRef } from "react";

import { throttledScrollFixedY } from "./helpers";
import { useScrollProgress } from "./useScrollProgress";

export const useScrollAnimate = () => {
  const { progressRef, scrollOpacityRef, scrollY, scrollDirection } =
    useScrollProgress();
  // console.log("progressRef.current", progressRef.current);
  // console.log("scrollOpacityRef.current", scrollOpacityRef.current);
  const hBarOpacity =
    progressRef.current > 0.1 ? 1 - scrollOpacityRef.current - 0.15 : 0;
  const vBarOpacity =
    progressRef.current > 0.3 ? 1 - scrollOpacityRef.current - 0.5 : 0;

  const fixedTopRef = useRef(0);

  const FIXED_SCROLL_PARAM = useMemo(() => window.innerHeight * 1, []);

  const debFindScrollFixedY = useMemo(() => {
    return throttledScrollFixedY(FIXED_SCROLL_PARAM);
  }, [FIXED_SCROLL_PARAM]);

  useLayoutEffect(() => {
    debFindScrollFixedY({
      fixedTopRef,
      scrollDirection,
      scrollY,
    });
  }, [debFindScrollFixedY, scrollDirection, scrollY]);

  return {
    scrollOpacityRef,
    progressRef,
    hBarOpacity,
    vBarOpacity,
    FIXED_SCROLL_PARAM,
    scrollY,
  };
};
