import { Text } from "@chakra-ui/react";

import { ICON_TOP_MARGIN, ICON_TOP_HOVER_MARGIN_OFFSET } from "./constants";
import type { IconDataType } from "./types";

export const ECNCardTitle = ({
  item,
  cardIconHeight,
  toExpandTopVal,
  isCurrentOnHover,
}: {
  item: IconDataType;

  // titleRef?: UseMeasureRef<HTMLElement>;
  cardIconHeight: number;
  toExpandTopVal: number;
  isCurrentOnHover: boolean;
}) => {
  const expandVal = isCurrentOnHover ? `${toExpandTopVal}px` : "0px";
  return (
    <Text
      // ref={titleRef}
      className="ecn-card-title"
      textAlign="center"
      w="300px"
      // mb={24}
      position="absolute"
      flex="0 0 auto"
      top={`calc(${ICON_TOP_MARGIN} - ${ICON_TOP_HOVER_MARGIN_OFFSET} + ${cardIconHeight}px + ${expandVal} + ${
        68 * 0.1
      }vh)`}
      fontSize={["sm", "md", "xl", "xl"]}
      color="#010215"
      fontWeight={600}
      fontFamily="PingFang SC"
      transition="all 1s cubic-bezier(0.77, 0, 0.175, 1)"
    >
      {item.text.split("").map((char) => (
        <span key={`${char}`} className="ecn-card-title-char">
          {char}
        </span>
      ))}
    </Text>
  );
};
