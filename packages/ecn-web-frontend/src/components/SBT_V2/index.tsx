import { Box, Flex, Tabs, useMediaQuery } from "@chakra-ui/react";
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
import { parseVCForPayloadAndVerifyVC } from "@/utils/vc";

import { InfoDesc } from "./InfoDesc";
import { InfoIcons } from "./InfoIcons";
import { TabContents } from "./TabContents";
import { TabLabels } from "./TabLabels";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const vcuse = (s: string) => {
  return parseVCForPayloadAndVerifyVC(s);
};

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, appDispatch, accessToken, id, router.isReady]);

  const [isLargerThan500] = useMediaQuery("(min-width: 500px)");

  return (
    <Flex
      w="100%"
      px={responsive.respWStr(322)}
      direction="column"
      bg="rgba(0, 0, 0, 0.9)"
      // bg="rgba(12, 6, 1, 0.82)"
      // css={css`
      //   backdrop-filter: blur(150px);
      // `}
      pt={responsive.respWStr(80)}
    >
      {/*  */}
      <Flex
        direction={["row"]}
        align="center"
        justify="space-between"
        minH={responsive.respWStr(360)}
        w="100%"
      >
        {/*  */}
        <InfoDesc />
        {isLargerThan500 && <InfoIcons />}
      </Flex>
      <Box h={responsive.respWStr(82)} />
      <Box minH={responsive.respWStr(1149)} w="full" pb="90px">
        <Tabs defaultIndex={0} h="full" w="full" variant="unstyled">
          <TabLabels />
          <TabContents />
        </Tabs>
      </Box>
    </Flex>
  );
};
