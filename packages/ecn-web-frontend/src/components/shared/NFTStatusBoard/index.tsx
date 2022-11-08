import { useAccount, useNetwork } from "wagmi";

import { selectors as globalSelectors } from "@/state/global";
import type { NFTState } from "@/state/nft";
import { useAppSelector } from "@/state/reduxHooks";

import { AfterStatus } from "./AfterStatus";
import { DetailTagsView } from "./DetailTagsView";
import { NFTConnectWalletBoard } from "./NFTConnectWalletBoard";
import { PresentationNFT } from "./PresentationNFT";

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
  const { detailTags, title, infoDetail, nftAppType } = nftData;

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

  return <PresentationNFT title={title} nftData={nftData} />;
};
