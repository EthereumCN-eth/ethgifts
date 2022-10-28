import type { ReactNode } from "react";
import { useEffect } from "react";

import { Header } from "@/components/Layouts/Header";

import { Footer } from "./Footer";
import { useHeaderStore } from "./headerState";
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
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};
