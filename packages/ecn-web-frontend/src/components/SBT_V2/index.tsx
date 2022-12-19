import { Box, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAccount, useNetwork } from "wagmi";

import { selectors as globalSelectors } from "@/state/global";
import { useAppDispatch, useAppSelector } from "@/state/reduxHooks";
import {
  sagaActions as sbtSagaActions,
  // selectors as sbtSelectors,
} from "@/state/sbt";
import { responsive } from "@/styles/utils";

import { InfoDesc } from "./InfoDesc";
import { InfoIcons } from "./InfoIcons";

export const SBT_V2 = () => {
  const router = useRouter();
  const { id } = router.query;
  const appDispatch = useAppDispatch();
  const { address } = useAccount();
  const { chain } = useNetwork();
  const accessToken = useAppSelector((state) =>
    globalSelectors.selectAccessToken(state, {
      address,
      chainId: chain?.id,
    })
  );

  useEffect(() => {
    const parsedId = Number(id);
    if (router.isReady && id && Number.isInteger(parsedId)) {
      appDispatch(
        sbtSagaActions.fetchSBTDetails({
          chainId: chain?.id,
          ethAddress: address,
          id: parsedId,
        })
      );
    }
  }, [address, appDispatch, accessToken, chain?.id, id, router.isReady]);

  return (
    <Flex
      w="100%"
      px={responsive.respWStr(322)}
      direction="column"
      bg="rgba(0, 0, 0, 0.8)"
      pt={responsive.respWStr(80)}
    >
      {/*  */}
      <Flex
        direction="row"
        align="center"
        justify="space-between"
        h={responsive.respWStr(360)}
        w="100%"
      >
        {/*  */}
        <InfoDesc />
        <InfoIcons />
      </Flex>
      <Box h={responsive.respWStr(82)} />
      <Box minH={responsive.respWStr(1149)} w="full" bgColor="gray.100">
        {/*  */}
      </Box>
    </Flex>
  );
};
