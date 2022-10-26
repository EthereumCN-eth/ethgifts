import { HStack } from "@chakra-ui/react";
import { useAccount, useNetwork } from "wagmi";

import { TextTag } from "../../shared/TextTag";
import { selectors as globalSelectors } from "@/state/global";
import type { NFTState } from "@/state/nft";
import { useAppSelector } from "@/state/reduxHooks";

import { AfterStatus } from "./AfterStatus";
import { CommingSoonStatus } from "./CommingSoonStatus";
import { NFTConnectWalletBoard } from "./NFTConnectWalletBoard";
import { OngoingStatus } from "./OngoingStatus";

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
  const { detailTags, title, nftDeliveryData, infoDetail, status } = nftData;

  // console.log("data", data);
  if (authStatus !== "authenticated")
    return <NFTConnectWalletBoard title={title} detailTags={detailTags} />;

  return (
    <>
      <HStack gap={3} wrap="wrap">
        {detailTags.map((tag) => {
          return (
            <TextTag key={tag.label} text={tag.label} variant={tag.variant} />
          );
        })}
      </HStack>

      {status === "coming soon" && (
        <CommingSoonStatus title={title} desc={infoDetail?.eventDescription} />
      )}
      {status === "ongoing" && (
        <OngoingStatus title={title} desc={infoDetail?.eventDescription} />
      )}
      {!status && (
        <AfterStatus
          nftData={nftData}
          title={title}
          desc={infoDetail?.eventDescription}
        />
      )}
    </>
  );
};
