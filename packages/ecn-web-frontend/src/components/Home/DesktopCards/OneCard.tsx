import { VStack } from "@chakra-ui/react";
import { useEffect, useMemo, useRef, useState } from "react";
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
  setBiggerH,
}: {
  item: IconDataType;
  index: number;
  isOuterOnHover: boolean;
  setBiggerH: Dispatch<SetStateAction<boolean>>;
}) => {
  const [cardIconRef, { height: cardIconHeight }] =
    useMeasure<HTMLDivElement>();
  const [middleBoxRef, { height: middleBoxHeight }] =
    useMeasure<HTMLDivElement>();
  const [titleRef, { height: titleHeight }] = useMeasure<HTMLDivElement>();
  const [containerRef, { height: containerHeight }] =
    useMeasure<HTMLDivElement>();
  const [isCurrentOnHover, setIsCurrentOnHover] = useState(false);
  // const iconTopM = `calc(${TOTAL_H}vh - ${
  //   cardIconHeight + middleBoxHeight + titleHeight
  // }px)`;
  // console.log("iconTopM", iconTopM);

  // console.log("middleBoxHeight", middleBoxHeight);
  // console.log("titleHeight", titleHeight);
  // console.log("cardIconHeight", cardIconHeight);
  // console.log("container", containerHeight);
  const offset = useMemo(
    () => (containerHeight - titleHeight - cardIconHeight) / 2,
    [cardIconHeight, containerHeight, titleHeight]
  );
  const offsetExpanded = useMemo(
    () =>
      (containerHeight -
        // containerHeight * 0.12 -
        titleHeight -
        cardIconHeight -
        middleBoxHeight) /
      2,
    [cardIconHeight, containerHeight, middleBoxHeight, titleHeight]
  );

  const isSetRef = useRef(false);
  useEffect(() => {
    // const itemHeight =
    //   // 0.68 * 0.37 * window.innerHeight +
    //   middleBoxHeight + titleHeight + cardIconHeight * 2.6;
    // console.log("itemH", itemHeight);
    // console.log(window.innerHeight * 0.7);
    if (!isSetRef.current && 0.6 * cardIconHeight * 1.1 > offsetExpanded) {
      setBiggerH(true);
      isSetRef.current = false;
    }
  }, [
    cardIconHeight,
    middleBoxHeight,
    offsetExpanded,
    setBiggerH,
    titleHeight,
  ]);

  return (
    <VStack
      onMouseOver={() => {
        // setOuterIsOnHover(true);
        setIsCurrentOnHover(true);
      }}
      onMouseOut={() => {
        // setOuterIsOnHover(false);
        setIsCurrentOnHover(false);
      }}
      ref={containerRef}
      key={item.text}
      m={0}
      bg={isOuterOnHover ? item.bgColor : "white"}
      // bg={i.bgColor}
      // w="20vw"
      // eslint-disable-next-line no-nested-ternary
      w={isCurrentOnHover ? `65%` : isOuterOnHover ? "11.6666%" : "25%"}
      // pt={`${iconTopM}px`}
      minH="68vh"
      h="full"
      borderLeft="#E1E1E1 solid 1px"
      borderRight={index === data.length - 1 ? "#E1E1E1 solid 1px" : "none"}
      align="center"
      position="relative"
      transition="all 1s cubic-bezier(0.77, 0, 0.175, 1)"
      justify="center"
    >
      <ECNIcons
        isOuterOnHover={isOuterOnHover}
        cardIconHeight={cardIconHeight}
        cardIconRef={cardIconRef}
        item={item}
        isCurrentOnHover={isCurrentOnHover}
        topOffset={offset}
        topOffsetExpanded={offsetExpanded}
        containerHeight={containerHeight}
      />
      <ECNCardMiddleDesc
        isCurrentOnHover={isCurrentOnHover}
        cardIconHeight={cardIconHeight}
        boxRef={middleBoxRef}
        item={item}
        containerHeight={containerHeight}
      />

      <ECNCardTitle
        titleRef={titleRef}
        isOuterOnHover={isOuterOnHover}
        item={item}
        isCurrentOnHover={isCurrentOnHover}
        cardIconHeight={cardIconHeight}
        toExpandTopVal={middleBoxHeight}
        bottomOffset={offset}
        bottomOffsetExpanded={offsetExpanded}
        containerHeight={containerHeight}
      />
    </VStack>
  );
};
