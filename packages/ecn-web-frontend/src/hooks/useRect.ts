import { useCallback, useState } from "react";

// const useEffectInEvent = (
//   event: "resize" | "scroll",
//   useCapture: boolean,
//   set: () => void
// ) => {
//   useEffect(() => {
//     set();
//     window.addEventListener(event, set, useCapture);
//     return () => window.removeEventListener(event, set, useCapture);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [event, useCapture]);
// };

export const useRect = <T extends Element>(): [
  DOMRect | undefined,
  (node: T) => void
] => {
  // const ref = useRef<T>(null);
  const [rect, setRect] = useState<DOMRect>();
  const measuredRef = useCallback((node: T) => {
    if (node !== null) {
      setRect(node.getBoundingClientRect());
    }
  }, []);

  // const set = () => setRect(ref.current?.getBoundingClientRect());

  // useEffectInEvent("resize", false, set);
  // useEffectInEvent("scroll", true, set);

  return [rect, measuredRef];
};
