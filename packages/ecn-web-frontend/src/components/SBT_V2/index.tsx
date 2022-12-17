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
      bg="#000000"
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
        <Flex
          w={responsive.respWStr(700)}
          h={responsive.respWStr(360)}
          bgColor="red.100"
        >
          {/*  */}
          {/*  */}
        </Flex>
        <Box
          w={responsive.respWStr(460)}
          h={responsive.respWStr(360)}
          bgColor="gray.100"
          display="grid"
          px={responsive.respWStr(80)}
          py={responsive.respWStr(55)}
          gridTemplate="repeat(3, 1fr) / repeat(2, 1fr)"
          columnGap={responsive.respWStr(98)}
          rowGap={responsive.respWStr(35)}
        >
          {/*  */}
          <Box bgColor="red.100" />
          <Box bgColor="red.100" />
          <Box bgColor="red.100" />
          <Box bgColor="red.100" />
          <Box bgColor="red.100" />
          <Box bgColor="red.100" />
          {/*  */}
        </Box>
      </Flex>
      <Box h={responsive.respWStr(82)} />
      <Box minH={responsive.respWStr(1149)} w="full" bgColor="gray.100">
        {/*  */}
      </Box>
    </Flex>
  );
};
