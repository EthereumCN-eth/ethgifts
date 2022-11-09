import { Button } from "@chakra-ui/react";
import { BigNumber } from "ethers";
import { useEffect } from "react";
import {
  useAccount,
  useContractWrite,
  useNetwork,
  // usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";

import MergePartyNFT from "@/abis/MergePartyNFT.json";

export const ClaimButton = ({
  contractAddress,
  claimedData,
  chainId,
}: {
  claimedData:
    | {
        index: number;
        Ids: number[];
        proof: string[];
      }
    | undefined;
  contractAddress: string;
  chainId: number;
}) => {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const isOnNFTChain = chain?.id === chainId;

  // const {
  //   config,
  //   error: prepareError,
  //   refetch,

  //   isError: isPrepareError,
  // } = usePrepareContractWrite({

  // });
  const {
    data,
    write,
    error,
    isLoading: isWriteLoading,
    reset: writeReset,
  } = useContractWrite({
    addressOrName: contractAddress,
    mode: "recklesslyUnprepared",
    contractInterface: MergePartyNFT.abi,
    functionName: "claim",
    args: address &&
      claimedData && [
        BigNumber.from(claimedData?.index ?? 0),
        address,
        claimedData.proof as readonly `0x${string}`[],
      ],
    enabled: !!address && !!claimedData && isOnNFTChain,
    cacheTime: 5000,
    staleTime: 0,
  });

  const { isLoading: isWaitLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  const isError = !!error;
  const isLoading = isWaitLoading || isWriteLoading;
  // console.log("claimedData", claimedData?.proof);
  // console.log("error", error);
  // // console.log("prepareError", prepareError);
  // console.log("isError", isError);
  // console.log("isLoading", isLoading);

  // const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    // if (isError) {
    //   if (error?.message.startsWith("user rejected transaction")) {
    //     setErrorMsg("");
    //   } else {
    //     setErrorMsg("加载错误");
    //   }
    // }
    const timer = setTimeout(() => {
      writeReset();
      // setErrorMsg("");
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, [error?.message, isError, writeReset]);

  useEffect(() => {
    if (writeReset) writeReset();
  }, [address, writeReset, chain?.id]);

  return (
    <Button
      isLoading={isLoading || isError}
      onClick={() => {
        write?.();
      }}
      disabled={!write || isLoading || isSuccess}
      mx="auto"
      my="1.5%"
      variant="orangeBg"
      mt="30px"
      minW="93%"
    >
      {!isError && !isLoading && !isSuccess && "申领 NFT"}
      {!isError && !isLoading && isSuccess && "已申领"}
      {isError &&
        // error?.message.startsWith("user rejected transaction") &&
        `加载错误`}
    </Button>
  );
};
