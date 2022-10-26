/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Flex, Text } from "@chakra-ui/react";
import { BigNumber } from "ethers";

import { useNFTAndSBTRead } from "@/state/gallery/hooks";
import type { NFTState } from "@/state/nft";

export const AfterStatus = ({
  title,
  desc,
  nftData,
}: {
  title: string;
  desc: string | undefined;
  nftData: NFTState;
}) => {
  const { contractReadObj } = nftData;
  const { data, isSuccess } = useNFTAndSBTRead(contractReadObj);

  const balanceOfNft = BigNumber.from(data).toNumber();
  return (
    <>
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
        {desc}
      </Text>
      <Flex direction="row" align="center" justify="space-between" wrap="wrap">
        <Button mx="auto" my="1.5%" variant="orangeBg" mt="30px" minW="93%">
          申领 SBT
        </Button>
      </Flex>
    </>
  );
};
