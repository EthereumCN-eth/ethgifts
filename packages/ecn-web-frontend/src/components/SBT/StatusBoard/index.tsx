import { Button, Flex, HStack, Text } from "@chakra-ui/react";
import { AiOutlineDownload } from "react-icons/ai";

import { TextTag } from "../../TextTag";
import type { Tag } from "@/state/gallery/types";

type StatusBoardPropstype = {
  detailTags: Tag[];
  itemTexts: null | string[];
  selectedIndex: number;
};

export const StatusBoard = ({
  detailTags,
  itemTexts,
  selectedIndex,
}: StatusBoardPropstype) => {
  return (
    <>
      <HStack gap={3} wrap="wrap">
        {detailTags.map((tag) => {
          return (
            <TextTag key={tag.label} text={tag.label} variant={tag.variant} />
          );
        })}
      </HStack>
      {itemTexts && (
        <Text my="8.1%" fontFamily="PingFang SC" color="white" fontSize="4xl">
          {itemTexts[selectedIndex]}
        </Text>
      )}
      <Text
        fontSize="md"
        fontFamily="PingFang SC"
        color="white"
        letterSpacing="0.02em"
        mb="8.1%"
      >
        恭喜，你可以领取E群志SBT Lv1了！
      </Text>
      <Flex direction="row" align="center" justify="space-between" wrap="wrap">
        <Button mx="auto" my="1.5%" variant="orangeBg" mt="30px" minW="47%">
          申领 SBT
        </Button>
        <Button
          my="1.5%"
          mx="auto"
          variant="whiteOutline"
          colorScheme="whiteOutline"
          minW="47%"
          mt="30px"
          leftIcon={<AiOutlineDownload color="white" />}
        >
          E群志 SBT Lv2 对应的VC
        </Button>
      </Flex>
    </>
  );
};
