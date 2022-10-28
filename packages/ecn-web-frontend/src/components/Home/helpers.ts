import throttle from "lodash.throttle";
import type { MutableRefObject } from "react";

export const throttledScrollFixedY = (fixedScrollParam: number) => {
  return throttle(
    ({
      fixedTopRef,
      scrollDirection,
      scrollY,
    }: {
      fixedTopRef: MutableRefObject<number>;
      scrollDirection: "up" | "down";
      scrollY: number;
    }) => {
      // eslint-disable-next-line sonarjs/no-collapsible-if
      if (scrollDirection === "down" && scrollY > fixedScrollParam) {
        if (fixedTopRef.current > scrollY || fixedTopRef.current === 0) {
          // eslint-disable-next-line no-param-reassign
          fixedTopRef.current = scrollY;
        }
      }
      // eslint-disable-next-line sonarjs/no-collapsible-if
      if (scrollDirection === "up" && scrollY < fixedScrollParam) {
        if (fixedTopRef.current < scrollY || !fixedTopRef.current) {
          // eslint-disable-next-line no-param-reassign
          fixedTopRef.current = scrollY;
        }
      }
    },
    100,
    {
      trailing: false,
      leading: true,
    }
  );
};
