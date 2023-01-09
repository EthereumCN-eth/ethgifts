/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, useDisclosure } from "@chakra-ui/react";
import { css } from "@emotion/react";
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";

import { ClaimModal } from "../ClaimModal2";
import { useReadClaimedSelectedLevel } from "@/hooks/useReadClaimedLevel";
import { useAppSelector } from "@/state/reduxHooks";
import { selectors as sbtSelectors } from "@/state/sbt";
import { responsive } from "@/styles/utils";

export const SBTButton = ({
  qualified,
  sbtLevelNumber,
}: {
  qualified: boolean;
  sbtLevelNumber: number;
}) => {
  const {
    loaded,
    sbtLevel,
    // status,
    artworks,
    itemTexts,
    expressCount,
    chainId,
    contractAddress,
  } = useAppSelector(sbtSelectors.selectAll);
  const { address } = useAccount();
  const levelIndex = sbtLevel.findIndex((ele) => ele === sbtLevelNumber);
  const isClaimed = useReadClaimedSelectedLevel({
    chainId,
    connectedAddress: address,
    contractAddress,
    currentLevelNumber: levelIndex + 1,
  });
  // console.log("isClaimed", isClaimed);

  const isDisabled = !qualified;

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { chain } = useNetwork();
  const isOnSBTChain = chain?.id === chainId;

  const { isLoading: isSwitchNetworkLoading, switchNetworkAsync } =
    useSwitchNetwork();
  const switchToNFTNetwork = () => {
    switchNetworkAsync?.(chainId).then(() => {
      onOpen();
    });
  };

  if (!isOnSBTChain && !isClaimed && qualified) {
    return (
      <Button
        isLoading={isSwitchNetworkLoading}
        onClick={switchToNFTNetwork}
        disabled={isSwitchNetworkLoading}
        variant="orangeBg"
        w="93.75%"
        color="white"
        css={css`
          font-family: "PingFang SC";
          font-style: normal;
          font-weight: 500;
          font-size: ${responsive.respWStr(14)};
          line-height: ${responsive.respWStr(20)};
        `}
        h={responsive.respWStr(40)}
      >
        申领 SBT
      </Button>
    );
  }
  return (
    <>
      <Button
        onClick={onOpen}
        variant="orangeBg"
        isDisabled={isDisabled}
        w="93.75%"
        bgColor={isDisabled ? "rgba(117, 117, 117, 1)" : "#EE862B"}
        color="white"
        css={css`
          font-family: "PingFang SC";
          font-style: normal;
          font-weight: 500;
          font-size: ${responsive.respWStr(14)};
          line-height: ${responsive.respWStr(20)};
        `}
        h={responsive.respWStr(40)}
      >
        {isClaimed && "已申领"}
        {!isClaimed && !qualified && "未有资格申领"}
        {!isClaimed && qualified && "申领 SBT"}
      </Button>

      <ClaimModal
        isClaimed={isClaimed}
        levelIndex={levelIndex}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};
