/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Flex, IconButton, Text } from "@chakra-ui/react";
import { useMemo, useState } from "react";

import { useNFTRead } from "@/state/gallery/hooks";
import type { NFTState } from "@/state/nft";
import { useWhiteListAndClaim } from "@/state/nft/hooks";

import { CommingSoonStatus } from "./CommingSoonStatus";

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

  const hasWhitelistFile = !!nftDeliveryData && !!merkleUrl;

  const noClaimFile = !hasWhitelistFile;

  const { claimed, inWhiteList, claimedData, isLoading, isError } =
    useWhiteListAndClaim({
      contractReadObj,
      merkleUrl,
    });

  // console.log("claimed", claimed);
  // console.log("inWhiteList", inWhiteList);
  // console.log("claimedData", claimedData);

  if (noClaimFile) {
    return (
      <CommingSoonStatus
        title={title}
        // desc={infoDetail?.eventDescription}
      />
    );
  }

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
          {isError && (
            <Button
              // aria-label="loading"
              isLoading
              mx="auto"
              my="1.5%"
              variant="orangeBg"
              mt="30px"
              minW="93%"
            >
              加载失败
            </Button>
          )}
          {!isError && isLoading && (
            <IconButton
              aria-label="loading"
              isLoading
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
            <Button mx="auto" my="1.5%" variant="orangeBg" mt="30px" minW="93%">
              申领 SBT
            </Button>
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
        </Flex>
      )}
    </>
  );
};
