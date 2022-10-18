import type { ComponentStyleConfig } from "@chakra-ui/react";

const whiteTextProps = {
  container: {
    color: "white",
    border: "white solid 1px",
    borderRadius: "none",
    px: "10px",
    py: "6px",
  },
  label: {},
};
const whiteBgProps = {
  container: {
    color: "black",
    backgroundColor: "white",
    borderRadius: "none",
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
