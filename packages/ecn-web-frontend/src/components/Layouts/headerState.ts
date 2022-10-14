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
    basebgColor: "white",
    textColor: "black",
  },
  rainbowTheme: lightTheme({
    accentColor: "white",
    accentColorForeground: "black",
    borderRadius: "large",
    fontStack: "system",
  }),
};

const darkObj = {
  headerValues: {
    basebgColor: "black",
    textColor: "white",
  },
  rainbowTheme: darkTheme({
    // accentColor: "white",
    // accentColorForeground: "black",
    borderRadius: "large",
    fontStack: "system",
  }),
};

export const useHeaderStore = create<HeaderState>(
  combine(
    {
      headerValues: {
        basebgColor: "white",
        textColor: "black",
      },
      rainbowTheme: lightTheme({
        accentColor: "white",
        accentColorForeground: "black",
        borderRadius: "large",
        fontStack: "system",
      }),
    },
    (set) => ({
      // increase: (by: number) => set((state) => ({ bears: state.bears + by })),
      setTheme: (theme: "black" | "white") =>
        set(() => (theme === "white" ? whiteObj : darkObj)),
    })
  )
);
