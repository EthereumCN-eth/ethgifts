import "@rainbow-me/rainbowkit/styles.css";
import {  useLayoutEffect, useRef, useState } from "react";

const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState<{
    direction: "down" | "up";
    scrollY: number;
  }>({
    direction: "down",
    scrollY: 0,
  });

  useLayoutEffect(() => {
    const updatePosition = () =>
      requestAnimationFrame(() => {
        setScrollPosition((pre) => {
          const curY = window.scrollY || window.pageYOffset;
          if (pre.scrollY >= curY) {
            return {
              direction: "up",
              scrollY: curY,
            };
          } else
            return {
              direction: "down",
              scrollY: curY,
            };
          {
          }
        });
      });
    window.addEventListener("scroll", updatePosition);

    return () => window.removeEventListener("scroll", updatePosition);
  }, []);

  return scrollPosition;
};

export default useScrollPosition;

export const useScrollProgress = () => {
  const { scrollY, direction: scrollDirection } = useScrollPosition();
  const progressRef = useRef(0);
  const scrollOpacityRef = useRef(1);
  // console.log("bottom", bottom);
  console.log("scrollY", scrollY, scrollDirection);
  // console.log("bottom", bottom);
  if (scrollY < 0.001) {
    progressRef.current = 0;
    scrollOpacityRef.current = 1;
  }
  if (!isNaN(scrollY)) {
    progressRef.current = Math.min(scrollY / (window.innerHeight - 0), 2);
    scrollOpacityRef.current = 1 - progressRef.current * 2;
  }

  return {
    // containerRef,
    scrollOpacityRef,
    progressRef,
    scrollY,
    scrollDirection,
  };
};
