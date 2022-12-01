import { Box, Flex, HStack, Text } from "@chakra-ui/react";
import { useAccount, useNetwork } from "wagmi";

import { useReadClaimedLevel } from "../../../hooks/useReadClaimedLevel";
import { TextTag } from "../../shared/TextTag";
import { selectors as globalSelectors } from "@/state/global";
import { useAppSelector } from "@/state/reduxHooks";
import { selectors as sbtSelectors } from "@/state/sbt";

import { ClaimButton } from "./ClaimButton";
import { ConnectWalletBoard } from "./ConnectWalletBoard";
import { StatusText } from "./StatusText";
import type { StatusBoardPropstype } from "./types";
import { VCDownloadButton } from "./VCDownloadButton";

export const StatusBoard = ({
  detailTags,
  itemTexts,
  selectedIndex,
  expressCount,
  sbtLevel,
  contractAddress,
}: // chainId,
StatusBoardPropstype) => {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const authStatus = useAppSelector((state) =>
    globalSelectors.selectAuthStatus(state, { address, chainId: chain?.id })
  );
  const { chainId } = useAppSelector(sbtSelectors.selectAll);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: claimedSbtArrayByLevel, isSuccess } = useReadClaimedLevel({
    chainId,
    connectedAddress: address,
    contractAddress,
  });

  // eslint-disable-next-line no-console
  // console.log("claimedSbtArrayByLevel", claimedSbtArrayByLevel, isSuccess);
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
      <HStack gap={3} wrap="wrap" align={["center", "center", "flex-start"]}>
        {detailTags.map((tag) => {
          return (
            <TextTag key={tag.label} text={tag.label} variant={tag.variant} />
          );
        })}
      </HStack>
      {itemTexts && (
        <Text
          w="full"
          my="8.1%"
          fontFamily="PingFang SC"
          color="white"
          fontSize="4xl"
          textAlign={["center", "center", "left"]}
        >
          {itemTexts[selectedIndex]}
        </Text>
      )}
      <Text
        fontSize="md"
        fontFamily="PingFang SC"
        color="white"
        letterSpacing="0.02em"
        mb="8.1%"
        textAlign={["center", "center", "left"]}
      >
        {StatusText({
          index: selectedIndex,
          claimed: claimedSbtArrayByLevel?.map((res) => Number(res)),
          expressCount,
          itemTexts,
          sbtLevel,
        })}
      </Text>
      <Flex
        direction={["column", "column", "column", "column", "row"]}
        align="center"
        justify="center"
      >
        <ClaimButton selectedIndex={selectedIndex} chainId={chainId} />
        <Box boxSize="6%" />
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
