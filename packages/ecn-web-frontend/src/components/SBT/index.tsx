import { Box, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useAccount, useNetwork } from "wagmi";

import { selectors as globalSelectors } from "@/state/global";
import { useAppDispatch, useAppSelector } from "@/state/reduxHooks";
import {
  sagaActions as sbtSagaActions,
  selectors as sbtSelectors,
} from "@/state/sbt";

import { Carousel } from "./Carousel";
import { ContractAndVCStatusView } from "./ContractAndVCStatusView/index";
import { mainNumberToBase, selectMainIndex, useRouteByIndex } from "./helpers";
import { SBTDesc } from "./SBTDesc";
import { StatusBoard } from "./StatusBoard";

export const SBT = () => {
  const router = useRouter();
  const { id, num } = router.query;
  const [base, setBase] = useState(mainNumberToBase(1));
  const [idNumber, setIdNumber] = useState<number>();
  const appDispatch = useAppDispatch();
  const { address } = useAccount();
  const { chain } = useNetwork();
  const accessToken = useAppSelector((state) =>
    globalSelectors.selectAccessToken(state, {
      address,
      chainId: chain?.id,
    })
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {
    loaded,
    sbtLevel,
    // status,
    artworks,
    itemTexts,
    detailTags,
    expressCount,
    contractAddress,
  } = useAppSelector(sbtSelectors.selectAll);
  useEffect(() => {
    const numNumber = Number(num);
    if (router.isReady && loaded) {
      if (
        Number.isInteger(numNumber) &&
        numNumber >= 1 &&
        numNumber <= artworks.length
      ) {
        setBase(mainNumberToBase(numNumber));
      } else {
        router.replace("/404");
      }
    }
  }, [num, router.isReady, router, artworks.length, loaded]);
  useEffect(() => {
    const parsedId = Number(id);
    if (id && Number.isInteger(Number(id))) {
      setIdNumber(parsedId);
      // TODO: fetch optimise
      appDispatch(
        sbtSagaActions.fetchSBTDetails({
          chainId: chain?.id,
          ethAddress: address,
          id: parsedId,
        })
      );
    }
  }, [address, appDispatch, id, accessToken, chain?.id]);
  // console.log("addr", address);
  // console.log("appDispatch", appDispatch);
  // console.log("id", id);
  // console.log("router", router);
  // console.log("accessToken", accessToken);
  // console.log("chain?.id", chain?.id);
  // console.log("sbtLevel", sbtLevel);
  // console.log("artworks", artworks);
  // console.log("itemTexts", itemTexts);

  const selectedIndex = useMemo(
    () => selectMainIndex(base, artworks.length),
    [artworks.length, base]
  );

  const isLeftDisable = useMemo(() => {
    if (loaded) {
      return selectedIndex === 0;
    }
    return true;
  }, [selectedIndex, loaded]);
  const isRightDisable = useMemo(() => {
    if (loaded) {
      return selectedIndex === artworks.length - 1;
    }
    return true;
  }, [loaded, selectedIndex, artworks.length]);
  const { clickDot, clickNext, clickPrev } = useRouteByIndex({
    id: idNumber,
    selectedIndex,
  });

  // console.log("base", base);
  // console.log("selectedIndex", selectedIndex);

  return (
    <>
      <Flex w="100%" direction="column">
        <Flex
          direction={["column", "column", "row"]}
          px="10%"
          w="full"
          pb={5}
          // pt={20}
          h={["120vh", "110vh", "85vh"]}
          // bg="blue.200"
          bg="rgba(0, 0, 0, 0.8)"
          position="relative"
        >
          <Flex flex={1} direction="column" h="95%" align="center">
            <Carousel
              isLeftDisable={isLeftDisable}
              isRightDisable={isRightDisable}
              clickDot={clickDot}
              clickPrev={clickPrev}
              clickNext={clickNext}
              base={base}
              // setBase={setBase}
              selectedIndex={selectedIndex}
              artworks={artworks}
              levels={sbtLevel}
              itemTexts={itemTexts}
              expressCount={expressCount}
            />
          </Flex>
          {/* spacer */}
          <Box boxSize={[0, 0, "5.5vw"]} />

          <Flex
            flex={1}
            direction="column"
            h="95%"
            // bg="silver"
            justify="center"
            // mx={["10%", "10%", "0 0"]}
          >
            {/*  */}
            <StatusBoard
              detailTags={detailTags}
              itemTexts={itemTexts}
              selectedIndex={selectedIndex}
              expressCount={expressCount}
              sbtLevel={sbtLevel}
              contractAddress={contractAddress}
              // chainId={chainId}
            />
          </Flex>
          {/* <Center
            position="absolute"
            bottom={0}
            left={0}
            margin="auto"
            right={0}
            h={10}
            w="200px"
            // bg="rgba(0, 0, 0, 0.8)"
          >
            click
          </Center> */}
        </Flex>
      </Flex>

      <Flex w="100%" minH="500px" direction="row">
        <ContractAndVCStatusView />
        <SBTDesc />
      </Flex>
    </>
  );
};
