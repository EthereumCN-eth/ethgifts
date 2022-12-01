import { HStack, Text } from "@chakra-ui/react";

import { calcLen } from "../hooks/calcLen";
import { responsive } from "../utils";
import { ChakraNextLink } from "@/components/ChakraNextLink";

export type VCCheckItemTextType = {
  leftText: string;
  rightText: string;
  type: "text";
};

export type VCCheckItemLinkType = {
  leftText: string;
  rightText: string;
  href: string;
  type: "link";
};
export type VCCheckItemType = VCCheckItemLinkType | VCCheckItemTextType;

const isText = (item: VCCheckItemType): item is VCCheckItemTextType =>
  item.type === "text";

const isLink = (item: VCCheckItemType): item is VCCheckItemLinkType =>
  item.type === "link";

export const VCDragCheckListCard = ({ item }: { item: VCCheckItemType }) => {
  return (
    <HStack
      key={item.leftText}
      fontWeight={500}
      letterSpacing="0.06em"
      fontFamily="PingFang SC"
      fontSize={`${calcLen(responsive.respW(14))}px`}
      w="full"
      justify="space-between"
    >
      <Text color="#8E8D8C">{item.leftText}</Text>
      {isText(item) && (
        <Text w="50%" textAlign="end" color="#000000">
          {item.rightText}
        </Text>
      )}
      {isLink(item) && (
        <ChakraNextLink
          target="_blank"
          href={item.href}
          w="50%"
          textAlign="end"
          color="#000000"
          textDecoration="underline"
        >
          {item.rightText}
        </ChakraNextLink>
      )}
    </HStack>
  );
};
