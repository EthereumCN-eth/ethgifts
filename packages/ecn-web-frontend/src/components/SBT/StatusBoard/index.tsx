import { Button, Flex, HStack, Text } from "@chakra-ui/react";
import { AiOutlineDownload } from "react-icons/ai";
import { useAccount, useNetwork } from "wagmi";

import { TextTag } from "../../shared/TextTag";
import { selectors as globalSelectors } from "@/state/global";
import { useAppSelector } from "@/state/reduxHooks";

import { ConnectWalletBoard } from "./ConnectWalletBoard";
import type { StatusBoardPropstype } from "./types";
import { useReadClaimedLevel } from "./useReadClaimedLevel";

const renderStatusText = ({
  index,
  sbtLevel,
  claimed,
  expressCount,
  itemTexts,
}: {
  index: number;
  sbtLevel: number[];
  claimed: number[] | undefined;
  expressCount: number | null;
  itemTexts: string[] | null;
  // isConnected: boolean
}) => {
  if (!itemTexts || !claimed) return "";
  if (!expressCount) {
    return "你还没参与过E群誌编辑哦，快加入ECN Discord，跟大家分享一条以太坊相关的资讯吧！";
  }
  if (expressCount < sbtLevel[index]) {
    if (index === 0 || expressCount > sbtLevel[index - 1]) {
      return `你已经在争取${itemTexts[index]} 的路上了，加油💪`;
    }
    // index !== 0 && expressCount <= sbtLevel[index - 1]

    return `你还没开始争取${itemTexts[index]}的历程哦！`;
    //
  } else {
    // (expressCount >= sbtLevel[index])
    if (!claimed.includes(index + 1)) {
      return `恭喜，你已经可以申领${itemTexts[index]}并下载对应的Verifiable Credential了！`;
    }
    return `你已经领取了${itemTexts[index]}，真棒！`;
  }
  //  expressCount > sbtLevel[index];
};
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
  const claimedSbtArrayByLevel = useReadClaimedLevel({
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
        {renderStatusText({
          index: selectedIndex,
          claimed: claimedSbtArrayByLevel?.map((res) => Number(res)),
          expressCount,
          itemTexts,
          sbtLevel,
        })}
      </Text>
      <Flex direction="row" align="center" justify="space-between" wrap="wrap">
        <Button mx="auto" my="1.5%" variant="orangeBg" mt="30px" minW="47%">
          申领 SBT
        </Button>
        <Button
          my="1.5%"
          mx="auto"
          variant="whiteOutline"
          colorScheme="whiteOutline"
          minW="47%"
          mt="30px"
          leftIcon={<AiOutlineDownload color="white" />}
        >
          E群志 SBT Lv2 对应的VC
        </Button>
      </Flex>
    </>
  );
};
