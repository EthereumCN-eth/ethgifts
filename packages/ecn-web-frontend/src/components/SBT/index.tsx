import { Center, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAccount } from "wagmi";

import { selectors as globalSelectors } from "@/state/global";
import { useAppDispatch, useAppSelector } from "@/state/reduxHooks";
import {
  sagaActions as sbtSagaActions,
  selectors as sbtSelectors,
} from "@/state/sbt";

import { Carousel } from "./Carousel";

export const SBT = () => {
  const router = useRouter();
  const { id } = router.query;
  const appDispatch = useAppDispatch();
  const { address } = useAccount();
  const accessToken = useAppSelector(globalSelectors.selectAccessToken);
  useEffect(() => {
    const idNumber = Number(id);
    // console.log("id", id);
    // console.log("address", address);

    if (id && address && Number.isInteger(Number(id)))
      appDispatch(
        sbtSagaActions.fetchSBTDetails({
          ethAddress: address,
          id: idNumber,
        })
      );
  }, [address, appDispatch, id, router, accessToken]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { loaded, sbtLevel, status, artworks, itemTexts } = useAppSelector(
    sbtSelectors.selectAll
  );
  // console.log("sbtLevel", sbtLevel);
  // console.log("artworks", artworks);
  // console.log("itemTexts", itemTexts);

  return (
    <Flex w="100%" minH="100vh" direction="column" bg="black">
      <Flex
        direction="row"
        px="10%"
        w="full"
        pt={20}
        h="100vh"
        // bg="blue.200"
        position="relative"
      >
        <Flex w="50%" direction="column" h="95%" align="center">
          <Carousel
            artworks={artworks}
            levels={sbtLevel}
            itemTexts={itemTexts}
          />
        </Flex>
        <Flex w="50%" direction="column" h="95%" bg="yellow.200">
          {/*  */}
        </Flex>
        <Center
          position="absolute"
          bottom={0}
          left={0}
          margin="auto"
          right={0}
          h={10}
          w="200px"
        >
          click
        </Center>
      </Flex>
    </Flex>
  );
};
