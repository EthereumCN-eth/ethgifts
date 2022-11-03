import { Flex, HStack, Text } from "@chakra-ui/react";
import { useAccount, useNetwork } from "wagmi";

import { TextTag } from "../../shared/TextTag";
import { selectors as globalSelectors } from "@/state/global";
import { useAppSelector } from "@/state/reduxHooks";

import { ClaimButton } from "./ClaimButton";
import { ConnectWalletBoard } from "./ConnectWalletBoard";
import { StatusText } from "./StatusText";
import type { StatusBoardPropstype } from "./types";
import { useReadClaimedLevel } from "./useReadClaimedLevel";
import { VCDownloadButton } from "./VCDownloadButton";

export const StatusBoard = ({
  detailTags,
  itemTexts,
  selectedIndex,
  expressCount,
  sbtLevel,
  contractAddress,
  chainId,
}: StatusBoardPropstype) => {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const authStatus = useAppSelector((state) =>
    globalSelectors.selectAuthStatus(state, { address, chainId: chain?.id })
  );
  const { data: claimedSbtArrayByLevel } = useReadClaimedLevel({
    chainId,
    connectedAddress: address,
    contractAddress,
  });

  // console.log("data", data);
  if (authStatus !== "authenticated")
    return (
      <ConnectWalletBoard
        detailTags={detailTags}
        itemTexts={itemTexts}
        selectedIndex={selectedIndex}
      />
    );
  return (
    <>
      <HStack gap={3} wrap="wrap">
        {detailTags.map((tag) => {
          return (
            <TextTag key={tag.label} text={tag.label} variant={tag.variant} />
          );
        })}
      </HStack>
      {itemTexts && (
        <Text my="8.1%" fontFamily="PingFang SC" color="white" fontSize="4xl">
          {itemTexts[selectedIndex]}
        </Text>
      )}
      <Text
        fontSize="md"
        fontFamily="PingFang SC"
        color="white"
        letterSpacing="0.02em"
        mb="8.1%"
      >
        {StatusText({
          index: selectedIndex,
          claimed: claimedSbtArrayByLevel?.map((res) => Number(res)),
          expressCount,
          itemTexts,
          sbtLevel,
        })}
      </Text>
      <Flex direction="row" align="center" justify="space-between" wrap="wrap">
        <ClaimButton selectedIndex={selectedIndex} />
        <VCDownloadButton
          expressCount={expressCount}
          itemTexts={itemTexts}
          selectedIndex={selectedIndex}
          sbtLevel={sbtLevel}
        />
      </Flex>
    </>
  );
};
