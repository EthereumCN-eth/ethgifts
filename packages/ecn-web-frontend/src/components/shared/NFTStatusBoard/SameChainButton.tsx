import { Button } from "@chakra-ui/react";

import type { NFTState } from "@/state/nft";

import { ClaimButton } from "./ClaimButton";

export const SameChainButton = ({
  isError,
  isLoading,
  claimed,
  inWhiteList,
  nftData,
  claimedData,
}: {
  isError: boolean;
  isLoading: boolean;
  claimed: boolean;
  inWhiteList: boolean;
  nftData: NFTState;
  claimedData:
    | {
        index: number;
        Ids: number[];
        proof: string[];
      }
    | undefined;
}) => {
  const { contractAddress, chainId } = nftData;
  return (
    <>
      {!isError && !isLoading && !claimed && inWhiteList && (
        <ClaimButton
          contractAddress={contractAddress}
          claimedData={claimedData}
          chainId={chainId}
        />
      )}

      {!isError && !isLoading && !inWhiteList && (
        <Button
          mx="auto"
          disabled
          my="1.5%"
          variant="grayBg"
          mt="30px"
          minW="93%"
        >
          申领结束
        </Button>
      )}
    </>
  );
};
