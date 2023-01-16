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
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    }, 2000);
  }, []);
  const { width, height } = useWindowSize();
  //   console.log("h", height, window.innerHeight);
  return (
    <Box
      zIndex={party ? 10000 : 0}
      position="fixed"
      display="flex"
      top={0}
      left={0}
      bottom={0}
      right={0}
      w={`${width}px`}
      h={`${height}px`}
      //   sx={{}}
    >
      {mounted && (
        <SizedConfetti
          width={width}
          height={height}
          style={{
            // flex: 1,
            pointerEvents: "none",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: `100%`,
            height: `100%`,
          }}
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
