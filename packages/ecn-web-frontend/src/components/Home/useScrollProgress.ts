import "@rainbow-me/rainbowkit/styles.css";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

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
          }
          return {
            direction: "down",
            scrollY: curY,
          };
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
  // nothing shown, before loaded
  const progressRef = useRef(0);
  const scrollOpacityRef = useRef(0);

  const [loaded, setLoaded] = useState<boolean>(false);
  useEffect(() => {
    let timer: number;
    if (!loaded) timer = window.setTimeout(() => setLoaded(true));
    return () => clearTimeout(timer);
  }, [loaded]);

  // console.log("scrollOpacityRef", scrollOpacityRef.current);
  // console.log("scrollY", scrollY);
  // console.log("progressRef", progressRef.current);

  if (!Number.isNaN(scrollY) && loaded) {
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
