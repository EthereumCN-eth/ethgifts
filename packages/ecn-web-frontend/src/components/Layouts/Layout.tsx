import { Box } from "@chakra-ui/react";
import type { ReactNode } from "react";
import { useEffect } from "react";

import { Footer } from "./Footer";
import { useHeaderStore } from "./Header/headerState";
import { HeaderWithScrollHide } from "./Header/HeaderWithScrollHide";
import { SunBlurBg } from "./SunBlurBg";
import type { HeaderProps } from "./types";

export const Layout = ({
  children,
  headerProps,
}: { children: ReactNode } & HeaderProps) => {
  const setHeaderTheme = useHeaderStore((state) => state.setTheme);
  useEffect(() => {
    setHeaderTheme(headerProps.colorTheme);
  });
  return (
    <Box position="relative">
      <SunBlurBg />
      <HeaderWithScrollHide />
      {children}
      <Footer />
    </Box>
  );
};
