import { Button } from "@chakra-ui/react";
import { BigNumber } from "ethers";
import { useEffect } from "react";
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";

import MergePartyNFT from "@/abis/MergePartyNFT.json";

export const ClaimButton = ({
  contractAddress,
  claimedData,
}: {
  claimedData:
    | {
        index: number;
        Ids: number[];
        proof: string[];
      }
    | undefined;
  contractAddress: string;
}) => {
  const { address } = useAccount();
  const {
    config,
    error: prepareError,
    // isError: isPrepareError,
  } = usePrepareContractWrite({
    addressOrName: contractAddress,
    contractInterface: MergePartyNFT.abi,
    functionName: "claim",
    args: [
      BigNumber.from(claimedData?.index ?? 0),
      address,
      claimedData?.proof,
    ],
    enabled: !!address && !!claimedData,
  });
  const {
    data,
    write,
    error,
    isLoading: isWriteLoading,
    reset: writeReset,
  } = useContractWrite(config);

  const { isLoading: isWaitLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  const isError = !!error || !!prepareError;
  const isLoading = isWaitLoading || isWriteLoading;
  // console.log("claimedData", claimedData?.proof);
  // console.log("error", error);
  // console.log("prepareError", prepareError);
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
        error?.message.startsWith("user rejected transaction") &&
        `加载错误`}
    </Button>
  );
};
