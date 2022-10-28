import { Text } from "@chakra-ui/react";
import { useAccount, useNetwork } from "wagmi";

import { DetailTagsView } from "../NFTStatusBoard/DetailTagsView";
import { NFTConnectWalletBoard } from "../NFTStatusBoard/NFTConnectWalletBoard";
import { selectors as globalSelectors } from "@/state/global";
import type { PoapState } from "@/state/poap";
import { useAppSelector } from "@/state/reduxHooks";

export const PoapStatusBoard = ({
  poapData,
  loaded,
}: {
  poapData: PoapState;
  loaded: boolean;
}) => {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const authStatus = useAppSelector((state) =>
    globalSelectors.selectAuthStatus(state, { address, chainId: chain?.id })
  );

  if (!poapData || !loaded) {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { detailTags, title, infoDetail, status } = poapData;

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
        {infoDetail?.eventDescription}
      </Text>
    </>
  );
};
