import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAccount, useNetwork } from "wagmi";

import { sagaActions as gallerySagaActions } from "@/state/gallery";
import { selectors as globalSelectors } from "@/state/global";
import { useAppDispatch, useAppSelector } from "@/state/reduxHooks";

const Poap = () => {
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
    const idNumber = Number(id);
    // console.log("id", id);
    // console.log("address", address);

    if (id && address && Number.isInteger(Number(id)))
      appDispatch(
        gallerySagaActions.fetchPoapItemByContractId({
          ethAddress: address,
          id: idNumber,
        })
      );
  }, [address, appDispatch, id, router, accessToken]);

  return (
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
      `poap/${id}`
    </Box>
  );
};

export default Poap;
