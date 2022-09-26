import { ReactNode } from "react";

const NoSSRWrapper = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

// const NoSSRWrapper = ({ children }: { children: ReactNode }) => {
//   return (
//     <div suppressHydrationWarning={true}>
//       {typeof document === "undefined" ? null : children}
//     </div>
//   );
// };
export default NoSSRWrapper;
