/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Center, keyframes, Text } from "@chakra-ui/react";
import { css } from "@emotion/react";
import type { UseMeasureRef } from "react-use/lib/useMeasure";

// import { ICON_TOP_MARGIN, ICON_TOP_HOVER_MARGIN_OFFSET } from "./constants";
import type { IconDataType } from "./types";

const textAnimation = keyframes`
  0%   {opacity:0}
  /* 50%  {opacity:0} */
  100% {opacity:1}
`;

export const ECNCardMiddleDesc = ({
  item,
  cardIconHeight,
  boxRef,
  isCurrentOnHover,
  containerHeight,
}: {
  item: IconDataType;
  cardIconHeight: number;
  boxRef: UseMeasureRef<HTMLDivElement>;
  isCurrentOnHover: boolean;
  containerHeight: number;
}) => {
  // console.log(item.text, "isCurrentOnHover", isCurrentOnHover);
  // console.log("isOuterOnHover", isOuterOnHover);
  return (
    <Center
      ref={boxRef}
      color="#010215"
      position="absolute"
      // bgColor="red"
      minH="10vh"
      // top={`calc(${ICON_TOP_MARGIN} - ${ICON_TOP_HOVER_MARGIN_OFFSET} + ${cardIconHeight}px + ${
      //   68 * 0.02
      // }vh)`}
      // my="13%"
      top="50%"
      // m="auto"
      transform={`translateY(calc(-50% +${containerHeight * 0.1}px))`}
      fontWeight={500}
      // transition="all 3s cubic-bezier(0.77, 0, 0.175, 1)"
      textAlign="center"
      lineHeight="150%"
      fontSize={["xxs", "xs", "sm", "sm"]}
      w="90%"
      opacity={0}
      css={css`
        ${isCurrentOnHover &&
        css`
          animation: 0.5s cubic-bezier(0.77, 0, 0.175, 1) 1s ${textAnimation}
            both;
          /* display: table; */
        `}
      `}
    >
      <Box>
        {item.descLines.map((line) => {
          return (
            <Text mb="5px" key={line}>
              {line}
            </Text>
          );
        })}
      </Box>
    </Center>
  );
};
