import { Button } from "@chakra-ui/react";
import { BigNumber } from "ethers";
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
  const { data, write, error } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });
  // console.log("claimedData", claimedData?.proof);
  // console.log("config", config);

  const isError = !!error || !!prepareError;
  return (
    <Button
      isLoading={isLoading}
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
      {isError && `加载错误`}
    </Button>
  );
};
