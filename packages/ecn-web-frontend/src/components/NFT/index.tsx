import { Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Script from "next/script";
import { useEffect, useState } from "react";
import { useAccount, useNetwork } from "wagmi";

import { Carousel } from "../shared/Carousel/Carousel";
import { InfoDetailView } from "../shared/InfoDetailView";
import { NFTStatusBoard } from "../shared/NFTStatusBoard";
import { selectors as globalSelectors } from "@/state/global";
import {
  sagaActions as nftSagaActions,
  selectors as nftSelectors,
} from "@/state/nft";
import { useAppDispatch, useAppSelector } from "@/state/reduxHooks";

import { VideoView } from "./VideoView";

export const NFT = () => {
  const router = useRouter();
  const { id, num } = router.query;
  const [idNumber, setIdNumber] = useState<number>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [numNumber, setNumNumber] = useState<number>();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const appDispatch = useAppDispatch();
  const { address } = useAccount();
  const { chain } = useNetwork();
  const accessToken = useAppSelector((state) =>
    globalSelectors.selectAccessToken(state, {
      address,
      chainId: chain?.id,
    })
  );
  const nftData = useAppSelector(nftSelectors.selectNFT);

  useEffect(() => {
    const parsedId = Number(id);
    const parsedNum = Number(num);
    if (router.isReady) {
      if (!Number.isInteger(Number(id)) || !Number.isInteger(Number(num))) {
        router.replace("/404");
      }
      if (id && Number.isInteger(parsedId)) {
        setIdNumber(parsedId);
        appDispatch(
          nftSagaActions.fetchNFTDetails({
            chainId: chain?.id,
            ethAddress: address,
            id: parsedId,
          })
        );
      }
      if (num && Number.isInteger(parsedNum)) {
        setNumNumber(parsedNum);
        setSelectedIndex(parsedNum - 1);
      }
    }
  }, [address, appDispatch, id, router, accessToken, chain?.id, num]);

  return (
    <Flex w="100%" minH="100vh" direction="column">
      <Flex
        direction="row"
        px="10%"
        w="full"
        pt={20}
        h="85vh"
        // bg="blue.200"
        position="relative"
        bgColor="rgba(0, 0, 0, 0.8)"
      >
        <Flex w="50%" direction="column" h="95%" align="center">
          {nftData?.mainViewType === "image" && (
            <Carousel
              loaded={nftData?.loaded ?? false}
              artworks={nftData?.imageLinks ?? []}
              idNumber={idNumber}
              selectedIndex={selectedIndex}
              pathname="/nft/[id]/[num]"
              // numNumber={numNumber}
            />
          )}
          {nftData?.mainViewType === "video" && nftData?.loaded && (
            <VideoView
              videoUrl={nftData?.videoLinks?.[0]}
              // numNumber={numNumber}
            />
          )}
          {nftData?.mainViewType === "wordart" && (
            <>
              <Script src={nftData?.infoDetail?.wordArt?.script} async defer />
              <div
                style={{
                  transform: "scale(0.8)",
                  height: "100%",
                  width: "100%",
                }}
                data-wordart-src={nftData?.infoDetail?.wordArt?.src}
                data-wordart-show-attribution
              />
            </>
          )}
        </Flex>
        <Flex
          w="50%"
          direction="column"
          h="95%"
          // bg="silver"
          justify="center"
          pl="11%"
        >
          <NFTStatusBoard nftData={nftData} loaded={!!nftData?.loaded} />
        </Flex>
      </Flex>
      <InfoDetailView
        loaded={nftData?.loaded ?? false}
        detailInfoOfNFT={nftData?.infoDetail}
      />
    </Flex>
  );
};
