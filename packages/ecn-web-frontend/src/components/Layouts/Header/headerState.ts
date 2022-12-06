import type { Theme } from "@rainbow-me/rainbowkit";
import { darkTheme, lightTheme } from "@rainbow-me/rainbowkit";
import create from "zustand";
import { combine } from "zustand/middleware";

interface HeaderState {
  headerValues: {
    basebgColor: string;
    textColor: string;
  };
  rainbowTheme: Theme;
  setTheme: (theme: "black" | "white") => void;
  name: "black" | "white";
}

const lightThemeObj = lightTheme({
  accentColor: "rgba(255, 255, 255, 0.8)",
  // eslint-disable-next-line sonarjs/no-duplicate-string
  accentColorForeground: "rgba(0, 0, 0, 0.8)",
  borderRadius: "large",
  fontStack: "system",
});
const whiteObj: Omit<HeaderState, "setTheme"> = {
  headerValues: {
    basebgColor: "transparent",
    // eslint-disable-next-line sonarjs/no-duplicate-string
    textColor: "rgba(0, 0, 0, 0.8)",
  },
  rainbowTheme: {
    ...lightThemeObj,
    colors: {
      ...lightThemeObj.colors,
      connectButtonBackground: "transparent",
    },
  },
  name: "white",
};
const darkThemeObj = darkTheme({
  accentColor: "transparent",
  accentColorForeground: "white",
  borderRadius: "large",
  fontStack: "system",
});
const darkObj: Omit<HeaderState, "setTheme"> = {
  headerValues: {
    basebgColor: "rgba(0, 0, 0, 0.8)",
    textColor: "white",
  },
  rainbowTheme: {
    ...darkThemeObj,
    colors: {
      ...darkThemeObj.colors,
      connectButtonBackground: "transparent",
    },
  },
  name: "black",
};

export const useHeaderStore = create<HeaderState>(
  combine(whiteObj, (set) => ({
    // increase: (by: number) => set((state) => ({ bears: state.bears + by })),
    setTheme: (theme: "black" | "white") =>
      set(() => (theme === "white" ? whiteObj : darkObj)),
  }))
);
