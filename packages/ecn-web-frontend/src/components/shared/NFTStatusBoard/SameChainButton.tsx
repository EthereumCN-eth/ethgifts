import { Button, IconButton } from "@chakra-ui/react";

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
      {!!isError && (
        <Button
          // aria-label="loading"
          // isLoading
          mx="auto"
          my="1.5%"
          variant="grayBg"
          mt="30px"
          minW="93%"
        >
          加载失败
        </Button>
      )}
      {!isError && isLoading && (
        <IconButton
          aria-label="loading"
          isLoading={isLoading}
          mx="auto"
          my="1.5%"
          variant="orangeBg"
          mt="30px"
          minW="93%"
        >
          {/* 申领 SBT */}
        </IconButton>
      )}
      {!isError && !isLoading && !claimed && inWhiteList && (
        <ClaimButton
          contractAddress={contractAddress}
          claimedData={claimedData}
          chainId={chainId}
        />
      )}
      {!isError && !isLoading && claimed && (
        <Button
          mx="auto"
          my="1.5%"
          disabled
          variant="grayBg"
          mt="30px"
          minW="93%"
        >
          已申领
        </Button>
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
