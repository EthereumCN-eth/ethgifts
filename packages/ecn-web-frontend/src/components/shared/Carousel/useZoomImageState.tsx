import { useCallback, useState } from "react";
import { useMeasure } from "react-use";

export const useZoomImageState = () => {
  const [imgRef, { width, height }] = useMeasure<HTMLImageElement>();
  const [isZoomed, setIsZoomed] = useState(false);

  const handleZoomChange = useCallback((shouldZoom: boolean) => {
    setIsZoomed(shouldZoom);
  }, []);
  return {
    isZoomed,
    imgRef,
    width,
    height,
    handleZoomChange,
  };
};
