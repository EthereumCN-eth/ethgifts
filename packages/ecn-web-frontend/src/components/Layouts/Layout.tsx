import type { ReactNode } from "react";

import { Header } from "@/components/Layouts/Header";

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};
