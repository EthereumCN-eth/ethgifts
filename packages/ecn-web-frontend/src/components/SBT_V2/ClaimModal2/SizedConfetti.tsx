import { Box } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import type { ComponentProps } from "react";
import React, { useRef, useEffect, useState } from "react";
import useWindowSize from "react-use/lib/useWindowSize";

const ReactConfetti = dynamic(() => import("react-confetti"), {
  ssr: false,
});
// type F = typeof ReactConfetti["ref"];
const SizedConfetti = React.forwardRef<
  HTMLCanvasElement,
  ComponentProps<typeof ReactConfetti>
>((passedProps, ref) => {
  return (
    <ReactConfetti
      style={{
        flex: 1,
        width: `${passedProps.width}px`,
        height: `${passedProps.height}px`,
      }}
      //   width={window.innerHeight}
      //   height={window.innerHeight}
      {...passedProps}
      ref={ref}
    />
  );
});

export const CongrasConfetti = ({
  claimed,

  initClaimed,
}: {
  claimed: boolean;
  initClaimed: boolean;
}) => {
  const [party, setParty] = useState(false);

  const initVal = useRef(initClaimed);
  useEffect(() => {
    if (!initVal.current && claimed) setParty(true);
  }, [claimed]);

  //   console.log("claimed", claimed);
  //   console.log("initVal", initVal.current);
  //   console.log("party", party);
  const mounted = useRef(false);
  useEffect(() => {
    mounted.current = true;
  }, []);
  const { width, height } = useWindowSize();
  //   console.log("h", height, window.innerHeight);
  return (
    <Box
      zIndex={party ? 10000 : 0}
      position="absolute"
      display="flex"
      top={0}
      left={0}
      w="full"
      h="full"
    >
      {mounted.current && (
        <SizedConfetti
          width={width}
          height={height}
          style={{ pointerEvents: "none" }}
          numberOfPieces={party ? 1000 : 0}
          recycle={false}
          onConfettiComplete={(confetti) => {
            setParty(false);
            confetti?.reset();
          }}
        />
      )}
    </Box>
  );
};
