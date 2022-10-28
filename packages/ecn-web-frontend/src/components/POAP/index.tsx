import { Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAccount, useNetwork } from "wagmi";

import { Carousel } from "../shared/Carousel/Carousel";
import { InfoDetailView } from "../shared/InfoDetailView";
import { PoapStatusBoard } from "../shared/PoapStatusBoard";
import { selectors as globalSelectors } from "@/state/global";
import {
  sagaActions as poapSagaActions,
  selectors as poapSelectors,
} from "@/state/poap";
import { useAppDispatch, useAppSelector } from "@/state/reduxHooks";

export const POAP = () => {
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
  const poapData = useAppSelector(poapSelectors.selectPoap);

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
          poapSagaActions.fetchPoapDetails({
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
    <Flex w="100%" minH="100vh" direction="column" bg="black">
      <Flex
        direction="row"
        px="10%"
        w="full"
        pt={20}
        h="85vh"
        // bg="blue.200"
        position="relative"
      >
        <Flex w="50%" direction="column" h="95%" align="center">
          {poapData?.mainViewType === "image" && (
            <Carousel
              loaded={poapData?.loaded ?? false}
              artworks={poapData?.imageLinks ?? []}
              idNumber={idNumber}
              selectedIndex={selectedIndex}
              pathname="/poap/[id]/[num]"
            />
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
          <PoapStatusBoard poapData={poapData} loaded={!!poapData?.loaded} />
        </Flex>
      </Flex>
      <InfoDetailView
        loaded={poapData?.loaded ?? false}
        detailInfoOfNFT={poapData?.infoDetail}
      />
    </Flex>
  );
};
