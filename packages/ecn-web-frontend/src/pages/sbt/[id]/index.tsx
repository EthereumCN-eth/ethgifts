/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAccount, useNetwork } from "wagmi";

import { Layout } from "@/components/Layouts/Layout";
import { SBTTranslator } from "@/components/SBT_Translator";
import { SBT_V2 } from "@/components/SBT_V2";
import { selectors as globalSelectors } from "@/state/global";
import { useAppDispatch, useAppSelector } from "@/state/reduxHooks";
import {
  sagaActions as sbtSagaActions,
  // selectors as sbtSelectors,
  selectors as sbtSelectors,
} from "@/state/sbt";

const SBTPage = () => {
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
      if (parsedId !== 1 && parsedId !== 2) {
        router.replace("/404");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, appDispatch, accessToken, id, router.isReady]);

  // const {
  //   loaded,
  //   sbtTitle,
  //   // contractAddress,
  // } = useAppSelector(sbtSelectors.selectAll);
  // console.log("sbtt", sbtTitle);
  return (
    <Layout
      headerBgColor="rgba(0, 0, 0, 0.9)"
      headerProps={{ colorTheme: "black" }}
    >
      <SBT_V2 />
      {/* {loaded && sbtTitle === "E群誌系列SBT" && <SBT_V2 />} */}
      {/* {loaded && <SBTTranslator />} */}
    </Layout>
  );
};

export default SBTPage;
