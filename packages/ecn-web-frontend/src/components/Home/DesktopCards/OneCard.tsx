import { VStack } from "@chakra-ui/react";
import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { useMeasure } from "react-use";

import { data } from "./data";
import { ECNCardMiddleDesc } from "./ECNCardMiddleDesc";
import { ECNCardTitle } from "./ECNCardTitle";
import { ECNIcons } from "./ECNIcons";
import type { IconDataType } from "./types";

export const OneCard = ({
  item,
  index,
  isOuterOnHover,
  setOuterIsOnHover,
}: {
  item: IconDataType;
  index: number;
  isOuterOnHover: boolean;
  setOuterIsOnHover: Dispatch<SetStateAction<boolean>>;
}) => {
  const [cardIconRef, { height: cardIconHeight }] =
    useMeasure<HTMLDivElement>();
  const [middleBoxRef, { height: middleBoxHeight }] =
    useMeasure<HTMLDivElement>();
  // const [titleRef, { height: titleHeight }] = useMeasure<HTMLDivElement>();
  const [isCurrentOnHover, setIsCurrentOnHover] = useState(false);
  // const iconTopM = `calc(${TOTAL_H}vh - ${
  //   cardIconHeight + middleBoxHeight + titleHeight
  // }px)`;
  // console.log("iconTopM", iconTopM);
  // console.log("middleBoxHeight", middleBoxHeight);
  // console.log("titleHeight", titleHeight);
  // console.log("cardIconHeight", cardIconHeight);
  return (
    <VStack
      onMouseOver={() => {
        setOuterIsOnHover(true);
        setIsCurrentOnHover(true);
      }}
      onMouseOut={() => {
        setOuterIsOnHover(false);
        setIsCurrentOnHover(false);
      }}
      key={item.text}
      m={0}
      bg={isOuterOnHover ? item.bgColor : "white"}
      // bg={i.bgColor}
      w="20vw"
      // pt={`${iconTopM}px`}
      minH="68vh"
      borderLeft="#E1E1E1 solid 1px"
      borderRight={index === data.length - 1 ? "#E1E1E1 solid 1px" : "none"}
      align="center"
      position="relative"
      transition="all 1s cubic-bezier(0.77, 0, 0.175, 1)"
    >
      <ECNIcons
        cardIconHeight={cardIconHeight}
        cardIconRef={cardIconRef}
        item={item}
        isCurrentOnHover={isCurrentOnHover}
      />

      <ECNCardTitle
        // titleRef={titleRef}
        item={item}
        isCurrentOnHover={isCurrentOnHover}
        cardIconHeight={cardIconHeight}
        toExpandTopVal={middleBoxHeight}
      />

      <ECNCardMiddleDesc
        cardIconHeight={cardIconHeight}
        boxRef={middleBoxRef}
        item={item}
      />
    </VStack>
  );
};
