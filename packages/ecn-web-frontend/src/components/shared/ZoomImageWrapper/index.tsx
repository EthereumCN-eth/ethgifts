import type { ReactNode } from "react";
import Zoom from "react-medium-image-zoom";

export const ZoomImageWrapper = ({ children }: { children: ReactNode }) => (
  <Zoom>{children}</Zoom>
);
