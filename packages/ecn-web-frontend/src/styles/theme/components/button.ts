import type { ComponentStyleConfig } from "@chakra-ui/react";
import { darken } from "polished";

export const Button: ComponentStyleConfig = {
  baseStyle: {
    borderRadius: "full",
  },
  variants: {
    assist: {
      bgColor: "#fff",
      borderRadius: "8px",
      _hover: {
        bgColor: darken(0.1, "#fff"),
        _disabled: {
          bgColor: "gray.300",
        },
      },
      _active: {
        bgColor: darken(0.2, "#fff"),
      },
    },
    orangeBg: {
      borderRadius: "8px",
      bgColor: "#EE862B",
      color: "#FFFFFF",
      _hover: {
        color: darken(0.1, "#fff"),
        bgColor: darken(0.1, "#EE862B"),
        _disabled: {
          bgColor: "#757575",
        },
      },
      _active: {
        color: darken(0.2, "#fff"),
        bgColor: darken(0.2, "#EE862B"),
      },
      _disabled: {
        opacity: 1,
        bgColor: "rgba(117, 117, 117, 1)",
      },
    },
    grayBg: {
      borderRadius: "8px",
      bgColor: "#757575",
      color: "#DDD9D7",
      _hover: {
        color: darken(0.1, "#DDD9D7"),
        bgColor: darken(0.1, "#757575"),
        _disabled: {
          bgColor: "gray.300",
        },
      },
      _active: {
        color: darken(0.2, "#DDD9D7"),
        bgColor: darken(0.2, "#757575"),
      },
    },
    orangeOutline: {
      borderRadius: "8px",
      // bgColor: "rgba(0,0,0,0.8)",
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
      // bgColor: "black",
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
    blcakOutline: {
      borderRadius: "8px",
      bgColor: "#fff",
      border: " 1px solid #000",
      color: "#000",
      _hover: {
        color: darken(0.1, "#000"),
        border: `1px solid ${darken(0.1, "#000")}`,
        _disabled: {
          bgColor: "gray.300",
        },
      },
      _active: {
        color: darken(0.2, "#000"),
        border: `1px solid ${darken(0.2, "#000")}`,
      },
    },
  },
};
