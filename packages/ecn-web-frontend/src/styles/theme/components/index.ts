import { Button } from "./button";

export const components = {
  Button,
  Tag: {
    variants: {
      whiteText: {
        container: {
          color: "white",
          border: "white solid 1px",
          borderRadius: "none",
          px: "10px",
          py: "6px",
        },
        label: {},
      },
      whiteBg: {
        container: {
          color: "black",
          backgroundColor: "white",
          borderRadius: "none",
          px: "10px",
          py: "6px",
        },
      },
    },
  },
};
