import { Box } from "@chakra-ui/react";
import type { ReactNode } from "react";
import { useEffect } from "react";

import { Header } from "@/components/Layouts/Header";

import { Footer } from "./Footer";
import { useHeaderStore } from "./headerState";
import { SunBlurBg } from "./SunBlurBg";
import type { HeaderProps } from "./types";

export const Layout = ({
  children,
  headerProps,
  headerBgColor,
}: { children: ReactNode; headerBgColor?: string } & HeaderProps) => {
  const setHeaderTheme = useHeaderStore((state) => state.setTheme);
  useEffect(() => {
    setHeaderTheme(headerProps.colorTheme);
  });
  return (
    <Box position="relative">
      <SunBlurBg />
      <Header headerBgColor={headerBgColor} />
      {children}
      <Footer />
    </Box>
  );
};
