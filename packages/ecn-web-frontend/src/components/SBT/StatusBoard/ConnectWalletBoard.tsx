import { Button, Flex, HStack, Text } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import { TextTag } from "../../TextTag";

import type { StatusBoardPropstype } from "./types";

export const ConnectWalletBoard = ({
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
        连接钱包，查看你的获得情况。
      </Text>
      <Flex direction="row" align="center" justify="space-between" wrap="wrap">
        <ConnectButton.Custom>
          {({ openConnectModal }) => {
            return (
              <Button
                mx="auto"
                my="1.5%"
                variant="orangeOutline"
                mt="30px"
                minW="93%"
                onClick={openConnectModal}
              >
                连接钱包
              </Button>
            );
          }}
        </ConnectButton.Custom>
      </Flex>
    </>
  );
};
