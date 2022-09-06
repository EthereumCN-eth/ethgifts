import { ThemeProvider as EmotionThemeProvider, css } from "@emotion/react";
import { reverse } from "dns";
import { resposiveFontSize } from "./helpers";

const theme = {
  colors: {
    black: "black",
    white: "#ffffff",
    blues: ["#004170", "#006fbe", "#2d8fd5", "#5aa7de"],
  },
  bgColors: {
    black: "black",
    white: "#ffffff",
    blues: ["#004170", "#006fbe", "#2d8fd5", "#5aa7de"],
  },
  fontSize: {
    std1: resposiveFontSize([10, 15, 20, 25]),
  },
};

export const themes = {
  light: theme,
  // dark: theme,
};

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <EmotionThemeProvider theme={themes.light}>{children}</EmotionThemeProvider>
  );
};
export type AppTheme = typeof theme;
export { ThemeProvider };
