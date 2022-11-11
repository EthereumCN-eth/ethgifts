import { Image } from "@chakra-ui/react";
import { Controlled as ControlledZoom } from "react-medium-image-zoom";

export const SelectedZoomPatchedImage = ({
  img,
  isZoomed,
  handleZoomChange,
  height,
  width,
}: {
  img: string;
  isZoomed: boolean;
  handleZoomChange: (shouldZoom: boolean) => void;
  height: number;
  width: number;
}) => {
  return (
    <ControlledZoom isZoomed={isZoomed} onZoomChange={handleZoomChange}>
      <Image
        transition="all 1s cubic-bezier(0.77, 0, 0.175, 1)"
        // zIndex={1000}
        transform="scale(0.65)"
        opacity={isZoomed ? "1" : "0"}
        w={`${width}px`}
        h={`${height}px`}
        src={img}
        fit="contain"
      />
    </ControlledZoom>
  );
};
