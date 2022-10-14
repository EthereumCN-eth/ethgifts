import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAccount } from "wagmi";

import { Layout } from "@/components/Layouts/Layout";
import { selectors as globalSelectors } from "@/state/global";
import { useAppDispatch, useAppSelector } from "@/state/reduxHooks";
import {
  sagaActions as sbtSagaActions,
  selectors as sbtSelectors,
} from "@/state/sbt";

const SBT = () => {
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
  const { loaded, sbtLevel, status } = useAppSelector(sbtSelectors.selectAll);

  return (
    <Layout headerProps={{ colorTheme: "black" }}>
      <Box
        // css={css`
        //   width: 100%;
        //   min-height: 300vh;
        //   position: relative;
        //   /* background-color: "white"; */
        // `}
        w="100%"
        minH="100vh"
      >
        `sbt/${id}`
      </Box>
    </Layout>
  );
};

export default SBT;

// export async function getStaticProps({ params: { post } }) {
//   const items = await ecnApiClient.gallery({ data: {} });
//   items.items.map(i => i.typeName === 'sbt')
//   return { props: { pageContent } };
// }

// export async function getStaticPaths() {
//   const items = await ecnApiClient.gallery({ data: {} });
//   const paths = items.items
//     .filter((i) => i.typeName === "sbt")
//     .map((sbt) => ({
//       params: { id: sbt.id },
//     }));

//   return {
//     paths,
//     fallback: false,
//   };
// }
