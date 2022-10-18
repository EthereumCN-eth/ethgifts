import type { DeepPartial, Theme } from "@chakra-ui/react";

/** extend additional color here */
const extendedColors: DeepPartial<
  Record<string, Theme["colors"]["blackAlpha"]>
> = {
  bloodorange: {
    100: "#fda787",
    200: "#fa936d",
    300: "#fd8153",
    400: "#f5652f",
    500: "#f8440b",
    600: "#f8440b",
    700: "#f8440b",
    800: "#f8440b",
    900: "#f8440b",
  },
};

/** override chakra colors here */
const overridenChakraColors: DeepPartial<Theme["colors"]> = {};

export const colors = {
  ...overridenChakraColors,
  ...extendedColors,
};
