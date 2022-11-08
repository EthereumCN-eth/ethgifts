import { Button, Flex, Text } from "@chakra-ui/react";
import { BigNumber } from "ethers";
import { useMemo } from "react";

import { useNFTRead } from "@/state/gallery/hooks";
import type { NFTState } from "@/state/nft";

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
  const {
    data: nftAmountData,
    // isLoading: nftReadLoading,
    // isError: nftReadIsError,
    isSuccess: nftReadIsSuccess,
  } = useNFTRead(contractReadObj);

  const balanceOfNft = useMemo(() => {
    if (nftAmountData) return BigNumber.from(nftAmountData).toNumber();
    return -1;
  }, [nftAmountData]);
  const hasNFT = balanceOfNft !== 0;
  // console.log("nftAmountData", nftAmountData);
  const {
    deliveryText: { hasClaimedText, noClaimedText },
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  } = infoDetail!;
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
        {nftReadIsSuccess && hasNFT ? hasClaimedText : noClaimedText}
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
          申领结束
        </Button>
      </Flex>
    </>
  );
};
