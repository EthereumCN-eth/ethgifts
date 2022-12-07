/* eslint-disable @typescript-eslint/no-unused-vars */
import { Text } from "@chakra-ui/react";
import type { UseMeasureRef } from "react-use/lib/useMeasure";

// import { ICON_TOP_MARGIN, ICON_TOP_HOVER_MARGIN_OFFSET } from "./constants";
import type { IconDataType } from "./types";

export const ECNCardTitle = ({
  item,
  cardIconHeight,
  toExpandTopVal,
  isCurrentOnHover,
  isOuterOnHover,
  titleRef,
  bottomOffset,
  bottomOffsetExpanded,
}: {
  item: IconDataType;

  titleRef?: UseMeasureRef<HTMLParagraphElement>;
  cardIconHeight: number;
  toExpandTopVal: number;
  isCurrentOnHover: boolean;
  isOuterOnHover: boolean;
  bottomOffset: number;
  bottomOffsetExpanded: number;
}) => {
  // const expandVal = isCurrentOnHover ? `${toExpandTopVal}px` : "0px";
  return (
    <Text
      ref={titleRef}
      className="ecn-card-title"
      textAlign="center"
      w="300px"
      // mb={24}

      // flex="0 0 auto"
      position="absolute"
      transform="translateY(50%)"
      // top={`calc(${ICON_TOP_MARGIN} - ${ICON_TOP_HOVER_MARGIN_OFFSET} + ${cardIconHeight}px + ${expandVal} + ${
      //   68 * 0.1
      // }vh)`}
      bottom={`${isCurrentOnHover ? bottomOffsetExpanded : bottomOffset}px`}
      fontSize={["xs", "md", "xl", "xl"]}
      color="#010215"
      fontWeight={600}
      fontFamily="PingFang SC"
      transition="all 0.8s cubic-bezier(0.77, 0, 0.175, 1)"
      sx={{
        transform: `rotateZ(${
          (isOuterOnHover && isCurrentOnHover) ||
          (!isOuterOnHover && !isCurrentOnHover)
            ? "0deg"
            : "90deg"
        })`,
      }}
    >
      {item.text.split("").map((char) => (
        <span
          style={{
            display: "inline-block",
            /* display: ${isOnHover ? "block" : "inline"}; */
            transform: `rotateZ(${
              isOuterOnHover && !isCurrentOnHover ? "-90deg" : "0deg"
            })`,
            transition: "all 0.8s cubic-bezier(0.77, 0, 0.175, 1)",
            letterSpacing: isOuterOnHover ? "0.3em" : "0",
          }}
          key={`${char}`}
          className="ecn-card-title-char"
        >
          {char}
        </span>
      ))}
    </Text>
  );
};
