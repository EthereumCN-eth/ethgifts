import type { ComponentStyleConfig } from "@chakra-ui/react";
import { darken } from "polished";

export const Button: ComponentStyleConfig = {
  baseStyle: {
    borderRadius: "full",
  },
  variants: {
    orangeBg: {
      borderRadius: "8px",
      bgColor: "#EE862B",
      color: "#FFFFFF",
      _hover: {
        color: darken(0.1, "#fff"),
        bgColor: darken(0.1, "#EE862B"),
        _disabled: {
          bgColor: "gray.300",
        },
      },
      _active: {
        color: darken(0.2, "#fff"),
        bgColor: darken(0.2, "#EE862B"),
      },
    },
    orangeOutline: {
      borderRadius: "8px",
      bgColor: "black",
      border: " 1px solid #EE862B",
      color: "#EE862B",
      _hover: {
        color: darken(0.1, "#EE862B"),
        border: `1px solid ${darken(0.1, "#EE862B")}`,
        _disabled: {
          bgColor: "gray.300",
        },
      },
      _active: {
        color: darken(0.2, "#EE862B"),
        border: `1px solid ${darken(0.2, "#EE862B")}`,
      },
    },
    whiteOutline: {
      borderRadius: "8px",
      bgColor: "black",
      border: " 1px solid #FFFFFF",
      color: "#FFFFFF",
      _hover: {
        color: darken(0.1, "#fff"),
        border: `1px solid ${darken(0.1, "#FFFFFF")}`,
        _disabled: {
          bgColor: "gray.300",
        },
      },
      _active: {
        color: darken(0.2, "#fff"),
        border: `1px solid ${darken(0.2, "#FFFFFF")}`,
      },
    },
  },
};
