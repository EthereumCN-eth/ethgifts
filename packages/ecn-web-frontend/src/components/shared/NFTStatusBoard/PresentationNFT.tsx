import { Button, Flex, Text } from "@chakra-ui/react";

import type { NFTState } from "@/state/nft";
import { useHasNFT } from "@/state/nft/hooks";

import { DetailTagsView } from "./DetailTagsView";

export const PresentationNFT = ({
  title,
  // nftData,
  nftData,
}: // desc,
{
  title: string;
  nftData: NFTState;
  // desc: string | undefined;
}) => {
  const { contractReadObj, infoDetail, detailTags } = nftData;
  const { hasNFT } = useHasNFT({
    contractReadObj,
  });
  // console.log("hasNFT", hasNFT);
  const deliveryText = infoDetail?.deliveryText;
  const { hasClaimedText = "", noClaimedText = "" } = deliveryText || {};
  return (
    <>
      <DetailTagsView detailTags={detailTags} />
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
        {hasNFT ? hasClaimedText : noClaimedText}
      </Text>
      <Flex direction="row" align="center" justify="space-between" wrap="wrap">
        <Button
          mx="auto"
          disabled
          my="1.5%"
          variant="grayBg"
          mt="30px"
          minW="93%"
        >
          {hasNFT ? "已申领" : "申领"}
        </Button>
      </Flex>
    </>
  );
};
