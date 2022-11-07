/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Flex, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { BigNumber } from "ethers";
import { getAddress } from "ethers/lib/utils";
import { useEffect, useMemo, useState } from "react";
import { useAccount } from "wagmi";

import { useNFTRead } from "@/state/gallery/hooks";
import type { NFTState } from "@/state/nft";

type FileJsonType = {
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

const fetchClaimForAddress = async ({
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

export const AfterStatus = ({
  title,
  desc,
  nftData,
}: {
  title: string;
  desc: string | undefined;
  nftData: NFTState;
}) => {
  const { contractReadObj, nftDeliveryData } = nftData;
  // nft amount; have or not
  const {
    data: nftAmount,
    isSuccess: isNFTAmountSuccess,
    isLoading: isNFTAmountLoading,
  } = useNFTRead(contractReadObj);

  const merkleUrl = useMemo(() => {
    if (nftDeliveryData) {
      return nftDeliveryData.merkleUrl;
    }
    return undefined;
  }, [nftDeliveryData]);

  const { address } = useAccount();
  const {
    data,
    isLoading: isFetchClaimLoading,
    isSuccess: isFetchClaimSuccess,
  } = useQuery(
    ["fetchClaimForAddress", address, merkleUrl],
    () => fetchClaimForAddress({ address, merkleUrl }),
    {
      enabled: !!address && !!merkleUrl,
    }
  );

  const hasWhitelistFile = !!nftDeliveryData && !!merkleUrl;

  const balanceOfNft = useMemo(() => {
    if (nftAmount) return BigNumber.from(nftAmount).toNumber();
    return -1;
  }, [nftAmount]);

  const noClaimFile = !hasWhitelistFile;
  const isLoading = isFetchClaimLoading || isNFTAmountLoading;
  const toClaimButton =
    hasWhitelistFile && data && data.hasWhiteListed && balanceOfNft === 0;
  const hasClaimedButton =
    hasWhitelistFile && data && data.hasWhiteListed && balanceOfNft > 0;
  const noClaimPermission = hasWhitelistFile && data && !data.hasWhiteListed;
  // console.log("noClaimFile", noClaimFile);
  // console.log("isLoading", isLoading);
  // console.log("toClaimButton", toClaimButton);
  // console.log("hasClaimedButton", hasClaimedButton);
  // console.log("noClaimPermission", noClaimPermission);

  return (
    <>
      <Text my="8.1%" fontFamily="PingFang SC" color="white" fontSize="4xl">
        {title}
      </Text>
      <Text
        fontSize="md"
        fontFamily="PingFang SC"
        color="white"
        letterSpacing="0.02em"
        mb="8.1%"
      >
        {desc}
      </Text>
      {hasWhitelistFile && (
        <Flex
          direction="row"
          align="center"
          justify="space-between"
          wrap="wrap"
        >
          {toClaimButton && (
            <Button mx="auto" my="1.5%" variant="orangeBg" mt="30px" minW="93%">
              申领 SBT
            </Button>
          )}
          {hasClaimedButton && (
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
          {noClaimPermission && (
            <Button
              mx="auto"
              disabled
              my="1.5%"
              variant="grayBg"
              mt="30px"
              minW="93%"
            >
              申领
            </Button>
          )}
        </Flex>
      )}
    </>
  );
};
