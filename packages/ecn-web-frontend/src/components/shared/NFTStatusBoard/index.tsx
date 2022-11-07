import { Text } from "@chakra-ui/react";
import { useAccount, useNetwork } from "wagmi";

import { selectors as globalSelectors } from "@/state/global";
import type { NFTState } from "@/state/nft";
import { useAppSelector } from "@/state/reduxHooks";

import { AfterStatus } from "./AfterStatus";
import { DetailTagsView } from "./DetailTagsView";
import { NFTConnectWalletBoard } from "./NFTConnectWalletBoard";

export const NFTStatusBoard = ({
  nftData,
  loaded,
}: {
  nftData: NFTState;
  loaded: boolean;
}) => {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const authStatus = useAppSelector((state) =>
    globalSelectors.selectAuthStatus(state, { address, chainId: chain?.id })
  );

  if (!nftData || !loaded) {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { detailTags, title, nftDeliveryData, infoDetail, status, nftAppType } =
    nftData;

  // console.log("data", data);
  if (authStatus !== "authenticated")
    return <NFTConnectWalletBoard title={title} detailTags={detailTags} />;

  if (nftAppType === "DELIVERY") {
    return (
      <>
        <DetailTagsView detailTags={detailTags} />

        {/* {loaded && status === "coming soon" && (
          <CommingSoonStatus
            title={title}
            // desc={infoDetail?.eventDescription}
          />
        )} */}
        {/* <OngoingStatus title={title} desc={infoDetail?.eventDescription} /> */}
        {/* {loaded && (!status || status === "ongoing") && (
          <AfterStatus
            nftData={nftData}
            title={title}
            desc={infoDetail?.eventDescription}
          />
        )} */}
        {loaded && (
          <AfterStatus
            nftData={nftData}
            title={title}
            desc={infoDetail?.eventDescription}
          />
        )}
      </>
    );
  }

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
