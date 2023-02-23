import { Button, Flex, HStack, Text } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import { TextTag } from "../../shared/TextTag";

import type { ConnectWalletBoardProps } from "./types";

export const ConnectWalletBoard = ({
  detailTags,
  itemTexts,
  selectedIndex,
}: ConnectWalletBoardProps) => {
  return (
    <>
      <HStack align={["center", "center", "flex-start"]} gap={3} wrap="wrap">
        {detailTags.map((tag) => {
          return (
            <TextTag key={tag.label} text={tag.label} variant={tag.variant} />
          );
        })}
      </HStack>
      {itemTexts && (
        <Text
          my="8.1%"
          fontFamily="PingFang SC"
          color="white"
          fontSize="4xl"
          textAlign={["center", "center", "left"]}
        >
          {itemTexts[selectedIndex]}
        </Text>
      )}
      <Text
        fontSize="md"
        fontFamily="PingFang SC"
        color="white"
        letterSpacing="0.02em"
        mb="8.1%"
        textAlign={["center", "center", "left"]}
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
                minW="100%"
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
