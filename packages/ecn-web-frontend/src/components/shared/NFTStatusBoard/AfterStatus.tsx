/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Flex, IconButton, Text } from "@chakra-ui/react";
import { useMemo } from "react";

import type { NFTState } from "@/state/nft";
import { useWhiteListAndClaim } from "@/state/nft/hooks";

import { ClaimButton } from "./ClaimButton";
import { CommingSoonStatus } from "./CommingSoonStatus";
import { computeCondition, renderConditionText } from "./computeCondition";

export const AfterStatus = ({
  title,
  desc,
  nftData,
}: {
  title: string;
  desc: string | undefined;
  nftData: NFTState;
}) => {
  const {
    contractReadObj,
    nftDeliveryData,
    status,
    infoDetail,
    contractAddress,
  } = nftData;
  // nft amount; have or not
  // const {
  //   data: nftAmount,
  //   isSuccess: isNFTAmountSuccess,
  //   isLoading: isNFTAmountLoading,
  // } = useNFTRead(contractReadObj);

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

  const condition = useMemo(
    () =>
      computeCondition({
        noClaimFile,
        isError,
        isLoading,
        claimed,
        inWhiteList,
        ended: !status,
      }),
    [claimed, inWhiteList, isError, isLoading, noClaimFile, status]
  );
  const {
    deliveryText,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  } = infoDetail!;
  const conditionText = useMemo(
    () => renderConditionText({ condition, deliveryText }),
    [condition, deliveryText]
  );

  // console.log("inWhiteList", inWhiteList);
  // console.log("claimedData", claimedData);
  // console.log("claimed", claimed);
  // console.log("isLoading", inWhiteList);
  // console.log("isError", isError);

  if (noClaimFile) {
    return (
      <CommingSoonStatus
        title={title}

        // desc={infoDetail?.eventDescription}
      >
        {conditionText}
      </CommingSoonStatus>
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
        {conditionText}
      </Text>
      {hasWhitelistFile && (
        <Flex
          direction="row"
          align="center"
          justify="space-between"
          wrap="wrap"
        >
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
        </Flex>
      )}
    </>
  );
};
