import type { ComponentStyleConfig } from "@chakra-ui/react";

export const Progress: ComponentStyleConfig = {
  variants: {
    whiteProgress: {
      label: {},
      filledTrack: {
        bgColor: "#FFFFFF",
        borderRadius: "13px",
        transition: "width 1s  cubic-bezier(0.77, 0, 0.175, 1)",
      },
      track: {
        bgColor: "rgba(0, 0, 0, 0.8)",
        borderRadius: "13px",
        border: "1px solid #FFFFFF",
        h: "13px",
      },
    },
  },
};
