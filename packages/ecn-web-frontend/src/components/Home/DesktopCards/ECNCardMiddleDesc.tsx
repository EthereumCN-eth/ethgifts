import { Box, Text } from "@chakra-ui/react";
import type { UseMeasureRef } from "react-use/lib/useMeasure";

import { ICON_TOP_MARGIN, ICON_TOP_HOVER_MARGIN_OFFSET } from "./constants";
import type { IconDataType } from "./types";

export const ECNCardMiddleDesc = ({
  item,
  cardIconHeight,
  boxRef,
}: {
  item: IconDataType;
  cardIconHeight: number;
  boxRef: UseMeasureRef<HTMLParagraphElement>;
}) => {
  return (
    <Box
      ref={boxRef}
      color="#010215"
      position="absolute"
      top={`calc(${ICON_TOP_MARGIN} - ${ICON_TOP_HOVER_MARGIN_OFFSET} + ${cardIconHeight}px + ${
        68 * 0.02
      }vh)`}
      fontWeight={500}
      visibility="hidden"
      // transition="all 3s cubic-bezier(0.77, 0, 0.175, 1)"
      textAlign="center"
      lineHeight="150%"
      fontSize={["xxs", "xs", "sm", "sm"]}
      w="90%"
      className="ecn-card-desc"
      opacity={0}
    >
      {item.descLines.map((line) => {
        return (
          <Text mb="5px" key={line}>
            {line}
          </Text>
        );
      })}
    </Box>
  );
};
