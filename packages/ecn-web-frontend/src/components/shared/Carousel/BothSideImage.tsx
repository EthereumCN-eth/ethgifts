import { Box, Image } from "@chakra-ui/react";
import type { LegacyRef } from "react";
import { forwardRef } from "react";

export const BothSideImage = forwardRef(
  (
    {
      img,
      eachDeg,
      myIndex,
      selectedIndex,
      zDepth,
    }: {
      img: string;
      eachDeg: number;
      myIndex: number;
      selectedIndex: number;
      zDepth: number;
    },
    ref: LegacyRef<HTMLImageElement> | undefined
  ) => {
    return (
      <Box
        position="absolute"
        top={0}
        bottom={0}
        left={0}
        right={0}
        w="full"
        h="full"
        sx={{ transformStyle: "preserve-3d" }}
      >
        {[
          {
            additonalTransform: "rotateY(180deg)",
            additionalProps: {},
          },
          {
            additonalTransform: "",
            additionalProps: {
              backfaceVisibility: "hidden",
            },
          },
        ].map((obj) => {
          return (
            <Box
              position="absolute"
              top={0}
              bottom={0}
              left={0}
              right={0}
              w="full"
              h="full"
              sx={{
                transformStyle: "preserve-3d",
              }}
              key={`${img}-${obj.additonalTransform}`}
            >
              <Image
                ref={ref}
                position="absolute"
                top={0}
                bottom={0}
                left={0}
                right={0}
                w="full"
                h="full"
                src={img}
                fit="contain"
                sx={{
                  // transformStyle: "preserve-3d",
                  transformOrigin: "center",
                  transform: `rotateY(${
                    eachDeg * myIndex
                  }deg) translateZ(${zDepth}vw) ${obj.additonalTransform}
                ${selectedIndex === myIndex ? `scale(0.65)` : `scale(0.2)`}
                `,
                  transition: `transform 1s cubic-bezier(0.77, 0, 0.175, 1)`,
                  ...obj.additionalProps,
                }}
              />
            </Box>
          );
        })}
      </Box>
    );
  }
);
