import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAccount } from "wagmi";

import { sagaActions as gallerySagaActions } from "@/state/gallery";
import { useAppDispatch } from "@/state/reduxHooks";

const SBT = () => {
  const router = useRouter();
  const { id } = router.query;
  const appDispatch = useAppDispatch();
  const { address } = useAccount();
  useEffect(() => {
    const idNumber = Number(id);
    // console.log("id", id);
    // console.log("address", address);

    if (id && address && Number.isInteger(Number(id)))
      appDispatch(
        gallerySagaActions.fetchSbtItemByContractId({
          ethAddress: address,
          id: idNumber,
        })
      );
  }, [address, appDispatch, id, router]);

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
      `sbt/${id}`
    </Box>
  );
};

export default SBT;
