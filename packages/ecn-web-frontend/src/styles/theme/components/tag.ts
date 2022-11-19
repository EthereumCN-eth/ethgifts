import type { ComponentStyleConfig } from "@chakra-ui/react";

const whiteTextProps = {
  container: {
    color: "white",
    border: "white solid 1px",
    borderRadius: "4px",
    px: "10px",
    py: "6px",
  },
};
const whiteBgProps = {
  container: {
    color: "black",
    borderRadius: "4px",
    border: "white solid 1px",
    backgroundColor: "white",
    px: "10px",
    py: "6px",
  },
};

export const Tag: ComponentStyleConfig = {
  variants: {
    "live-whiteText": whiteTextProps,
    whiteText: whiteTextProps,
    whiteBg: whiteBgProps,
    "live-whiteBg": whiteBgProps,
  },
};
