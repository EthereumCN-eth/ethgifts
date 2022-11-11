import { Box, Image } from "@chakra-ui/react";
import type { UseMeasureRef } from "react-use/lib/useMeasure";

import { ICON_TOP_HOVER_MARGIN, ICON_TOP_MARGIN } from "./constants";
import type { IconDataType } from "./types";

export const ECNIcons = ({
  item,
  cardIconRef,
  cardIconHeight,
  isCurrentOnHover,
}: {
  item: IconDataType;
  cardIconRef: UseMeasureRef<HTMLDivElement>;
  cardIconHeight: number;
  isCurrentOnHover: boolean;
}) => {
  return (
    <Box
      className="ecn-icon"
      position="absolute"
      // top="29.7%"
      top={isCurrentOnHover ? ICON_TOP_HOVER_MARGIN : ICON_TOP_MARGIN}
      w={`${20 * 0.6}vw`}
      h={`${cardIconHeight}px`}
      transition="all 1s cubic-bezier(0.77, 0, 0.175, 1)"
    >
      <Box
        ref={cardIconRef}
        className="ecn-in-icon-shell"
        w={`${20 * 0.6}vw`}
        h="auto"
        transition="all 1s cubic-bezier(0.77, 0, 0.175, 1)"
        position="absolute"
        top={0}
      >
        <Image src={item.imgOutSrc} alt={`${item.text}-shell`} fit="contain" />
      </Box>
      <Box
        position="absolute"
        className="ecn-in-icon"
        w={`${20 * 0.6}vw`}
        h="auto"
        top="0"
        transition="all 1s cubic-bezier(0.77, 0, 0.175, 1)"
      >
        <Image src={item.imageSrc} alt={item.text} fit="contain" />
      </Box>
    </Box>
  );
};
