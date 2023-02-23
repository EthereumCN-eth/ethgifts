import type { ReactNode } from "react";

// const NoSSRWrapper = ({ children }: { children: ReactNode }) => {
//   return <>{children}</>;
// };

const NoSSRWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div suppressHydrationWarning>
      {typeof document === "undefined" || !window ? null : children}
    </div>
  );
};
export { NoSSRWrapper };
