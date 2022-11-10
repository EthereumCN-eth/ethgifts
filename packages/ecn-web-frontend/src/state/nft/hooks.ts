import { useQuery } from "@tanstack/react-query";
import { BigNumber } from "ethers";
import { getAddress } from "ethers/lib/utils";
import { useMemo } from "react";
import { useContractRead, useAccount } from "wagmi";

import { useNFTRead } from "@/state/gallery/hooks";

export type FileJsonType = {
  merkleRoot: string;
  totalAmount: string;
  claims: {
    [address: string]:
      | {
          index: number;
          Ids: number[];
          proof: string[];
        }
      | undefined;
  };
};

export const fetchClaimForAddress = async ({
  merkleUrl,
  address,
}: {
  merkleUrl: string | undefined;
  address: string | undefined;
}) => {
  try {
    if (address && merkleUrl) {
      const parsedAddress = getAddress(address);
      const res = await fetch(merkleUrl);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const resjson: FileJsonType = await res.json();
      const { claims } = resjson;
      const hasWhiteListed = !!claims[parsedAddress];
      return { hasWhiteListed, claim: claims[parsedAddress] };
    }
    return null;
  } catch (e) {
    throw Error(`Failed to get claim file of ${merkleUrl}`);
  }
};

export const useWhiteListAndClaim = ({
  contractReadObj,
  merkleUrl,
}: {
  merkleUrl: string | undefined;
  contractReadObj: Parameters<typeof useContractRead>[0];
}) => {
  const { address } = useAccount();
  const {
    data: nftAmountData,
    isLoading: nftReadLoading,
    isError: nftReadIsError,
    // error,
    isSuccess: nftReadIsSuccess,
  } = useNFTRead(contractReadObj);

  // console.log("nftAmountData", nftAmountData);
  const balanceOfNft = useMemo(() => {
    if (nftAmountData) return BigNumber.from(nftAmountData).toNumber();
    return -1;
  }, [nftAmountData]);
  const {
    // error: ferror,
    data,
    isLoading: isFetchClaimLoading,
    isSuccess: isFetchClaimSuccess,
    isError: isFetchClaimError,
  } = useQuery(
    ["fetchClaimForAddress", address, merkleUrl],
    () => fetchClaimForAddress({ address, merkleUrl }),
    {
      enabled: !!address && !!merkleUrl,
    }
  );
  // console.log("isFetchClaimLoading", isFetchClaimLoading);
  // console.log("nftReadLoading", nftReadLoading);
  // console.log("balanceOfNft", balanceOfNft);
  // console.log("error", error);
  // console.log("ferror", ferror);

  return {
    isSuccess: nftReadIsSuccess && isFetchClaimSuccess,
    isLoading: nftReadLoading || isFetchClaimLoading,
    isError: nftReadIsError || isFetchClaimError,
    claimed: balanceOfNft > 0,
    inWhiteList: !!data?.hasWhiteListed,
    claimedData: data?.claim,
  };
};

export const useHasNFT = ({
  contractReadObj,
}: {
  contractReadObj: Parameters<typeof useContractRead>[0];
}) => {
  // const { address } = useAccount();

  const { addressOrName, contractInterface, functionName, chainId, args } =
    contractReadObj;
  const { address } = useAccount();
  const [, ...restArgs] = args;
  const fixedArgs = [address, ...restArgs];

  const {
    data: nftAmountData,
    // isLoading: nftReadLoading,
    // isError: nftReadIsError,
    // // error,
    isSuccess: nftReadIsSuccess,
  } = useContractRead({
    addressOrName,
    contractInterface,
    chainId,
    args: fixedArgs,
    functionName,
    // enabled: isOnSameChain,
  });

  // console.log("nftAmountData", nftAmountData);
  const hasNFT = useMemo(() => {
    if (nftReadIsSuccess && !!nftAmountData)
      return BigNumber.from(nftAmountData).toNumber() > 0;
    return false;
  }, [nftAmountData, nftReadIsSuccess]);

  // console.log(
  //   "contract",
  //   // BigNumber.from(nftAmountData).toNumber(),
  //   nftAmountData,
  //   `hasNFT ${hasNFT}`
  // );
  return {
    hasNFT,
  };
};
