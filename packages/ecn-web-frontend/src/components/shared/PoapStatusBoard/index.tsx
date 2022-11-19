import { Button, Text } from "@chakra-ui/react";
import { useAccount, useNetwork } from "wagmi";

import { DetailTagsView } from "../NFTStatusBoard/DetailTagsView";
import { NFTConnectWalletBoard } from "../NFTStatusBoard/NFTConnectWalletBoard";
import { selectors as globalSelectors } from "@/state/global";
import type { PoapState } from "@/state/poap";
import { useHasPoapEvent } from "@/state/poap/hooks";
import { useAppSelector } from "@/state/reduxHooks";

export const PoapStatusBoard = ({
  poapData,
}: // loaded,
{
  poapData: PoapState;
}) => {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const authStatus = useAppSelector((state) =>
    globalSelectors.selectAuthStatus(state, { address, chainId: chain?.id })
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { detailTags, title, infoDetail, status, eventId } = poapData;

  const { hasPoap } = useHasPoapEvent({
    eventId,
    address,
  });
  // console.log("hasPoap", hasPoap);
  const ownedText = infoDetail?.deliveryText.hasClaimedText ?? "";
  const notOwnText = infoDetail?.deliveryText.noClaimedText ?? "";
  // console.log("data", data);
  if (authStatus !== "authenticated")
    return <NFTConnectWalletBoard title={title} detailTags={detailTags} />;

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
        {hasPoap ? ownedText : notOwnText}
      </Text>
      <Button
        // isLoading={isSwitchNetworkLoading}
        // onClick={switchToNFTNetwork}
        disabled
        mx="auto"
        my="1.5%"
        variant={hasPoap ? "orangeBg" : "grayBg"}
        mt="30px"
        minW="93%"
      >
        {hasPoap ? "已申领" : "未申领/没有资格申领"}
      </Button>
    </>
  );
};
