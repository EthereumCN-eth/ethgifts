/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Flex, IconButton, Text } from "@chakra-ui/react";
import { useMemo } from "react";
import { useNetwork, useSwitchNetwork } from "wagmi";

import type { NFTState } from "@/state/nft";
import { useWhiteListAndClaim } from "@/state/nft/hooks";

import { CommingSoonStatus } from "./CommingSoonStatus";
import { computeCondition, renderConditionText } from "./computeCondition";
import { SameChainButton } from "./SameChainButton";

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
    // contractAddress,
    chainId,
  } = nftData;

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
  const { chain } = useNetwork();
  const isOnNFTChain = chain?.id === chainId;

  // console.log("inWhiteList", inWhiteList);
  // console.log("claimedData", claimedData);
  // console.log("claimed", claimed);
  // console.log("isLoading", inWhiteList);
  // console.log("isError", isError);

  const {
    isLoading: isSwitchNetworkLoading,
    // pendingChainId,
    switchNetwork,
  } = useSwitchNetwork();
  const switchToNFTNetwork = () => {
    switchNetwork?.(chainId);
  };

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
          {!isError && !isLoading && !claimed && !isOnNFTChain && (
            <Button
              isLoading={isSwitchNetworkLoading}
              onClick={switchToNFTNetwork}
              disabled={isSwitchNetworkLoading}
              mx="auto"
              my="1.5%"
              variant="orangeBg"
              mt="30px"
              minW="93%"
            >
              申领 NFT
            </Button>
          )}
          {isOnNFTChain && (
            <SameChainButton
              isError={isError}
              isLoading={isLoading}
              claimed={claimed}
              inWhiteList={inWhiteList}
              nftData={nftData}
              claimedData={claimedData}
            />
          )}
        </Flex>
      )}
    </>
  );
};
