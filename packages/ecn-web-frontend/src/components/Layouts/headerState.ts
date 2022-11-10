import { darkTheme, lightTheme } from "@rainbow-me/rainbowkit";
import create from "zustand";
import { combine } from "zustand/middleware";

interface HeaderState {
  headerValues: {
    basebgColor: string;
    textColor: string;
  };
  rainbowTheme: ReturnType<typeof lightTheme>;
  setTheme: (theme: "black" | "white") => void;
}

const whiteObj = {
  headerValues: {
    basebgColor: "transparent",
    // eslint-disable-next-line sonarjs/no-duplicate-string
    textColor: "rgba(0, 0, 0, 0.8)",
  },
  rainbowTheme: lightTheme({
    accentColor: "rgba(255, 255, 255, 0.8)",
    // eslint-disable-next-line sonarjs/no-duplicate-string
    accentColorForeground: "rgba(0, 0, 0, 0.8)",
    borderRadius: "large",
    fontStack: "system",
  }),
};

const darkObj = {
  headerValues: {
    basebgColor: "rgba(0, 0, 0, 0.8)",
    textColor: "white",
  },
  rainbowTheme: darkTheme({
    accentColor: "rgba(0, 0, 0, 0.8)",
    accentColorForeground: "white",
    borderRadius: "large",
    fontStack: "system",
  }),
};

export const useHeaderStore = create<HeaderState>(
  combine(whiteObj, (set) => ({
    // increase: (by: number) => set((state) => ({ bears: state.bears + by })),
    setTheme: (theme: "black" | "white") =>
      set(() => (theme === "white" ? whiteObj : darkObj)),
  }))
);
