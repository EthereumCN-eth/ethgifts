import { Button, Flex, HStack, Text } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import { TextTag } from "../../shared/TextTag";

import type { ConnectWalletBoardProps } from "./types";

export const NFTConnectWalletBoard = ({
  detailTags,
  title,
}: ConnectWalletBoardProps) => {
  return (
    <>
      <HStack gap={3} wrap="wrap">
        {detailTags.map((tag) => {
          return (
            <TextTag key={tag.label} text={tag.label} variant={tag.variant} />
          );
        })}
      </HStack>
      <Text my="8.1%" fontFamily="PingFang SC" color="white" fontSize="4xl">
        {title}
      </Text>
      <Text
        fontSize="md"
        fontFamily="PingFang SC"
        color="white"
        letterSpacing="0.02em"
        mb="8.1%"
      >
        连接钱包，查看是否有资格申领。
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
