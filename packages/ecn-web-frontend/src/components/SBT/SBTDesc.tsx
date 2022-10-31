import type { StackProps } from "@chakra-ui/react";
import {
  Accordion,
  Box,
  Divider,
  Flex,
  HStack,
  ListItem,
  Text,
  UnorderedList,
  VStack,
} from "@chakra-ui/react";

import { FAQItem } from "../shared/FAQItem";

const sbtFaqs = [
  {
    question: "什么是 E 群誌 SBT ？",
    answer: `E 群誌 SBT 是由 ECN 发行，对在此企划中社区成员的贡献数量进行认证的链上数字凭证，是具有不可转让性并与 ERC721 兼容的 NFT，其 metadataURI 为每个参与者所发布有效资讯在 Arweave 上存档的链接，这些 NFT 发布在以太坊的二层网络 Optimism 上。E 群誌 SBT 发布在公开的账本上，任何人都可以查看和验证。“E 群誌 SBT” 有三个级别，每次升级，难度都会提升。`,
  },
  {
    question: "什么是 E 群誌 VC ？为什么有两款？",
    answer: (
      <VStack>
        <Text>
          作为链上凭证 SBT 的补充，ECN 开发了两款 E 群誌相关的 VC (了解什么是
          VC)，它们基于区块链，存储在链下，获取不需要消耗
          gas，可由所有者保管并自主选择向谁出示。链上链下的数据凭证结合可给社区成员对其
          web3 数据更多的选择权。{" "}
        </Text>
        <UnorderedList pl="15px" mt="10px">
          <ListItem mb="5px">
            {`“E 群誌 SBT"一一对应的 VC：当社区成员的贡献数达到可铸造 SBT
          的级别时，即可下载 SBT 对应的 VC。拥有了此
          VC，社区成员不仅相当于拥有了链下版本的 SBT，还能随时用该 VC 在
          ethgifts.com 铸造其对应的 SBT。`}
          </ListItem>
          <ListItem>
            E 群誌贡献 VC：实时更新经审核的资讯数量，数据存储在 IPFS 上，由 ECN
            签名验证，可随时下载。
          </ListItem>
        </UnorderedList>
      </VStack>
    ),
  },
];

const Title = ({
  leftText,
  rightText,
  vstackProps,
}: {
  leftText: string;
  rightText: string;
  vstackProps?: StackProps;
}) => {
  return (
    <VStack w="full" mb="12px" justify="space-between" {...vstackProps}>
      <HStack w="full" justifyContent="space-between">
        <Text fontSize="1.25rem" fontWeight={600} fontFamily="PingFang SC">
          {leftText}
        </Text>
        <Text color="#B9B9B9" fontSize="1rem" letterSpacing="0.02em">
          {rightText}
        </Text>
      </HStack>
      <Divider mt="8px" color="#B9B9B9" />
    </VStack>
  );
};

export const SBTDesc = () => (
  <Flex direction="column" w="56%" minH="600px" p="6%">
    {/*  */}
    <Title leftText="E群誌？" rightText="01 What’s E-Journal?" />
    <Box>
      <Text
        fontSize="sm"
        fontFamily="PingFang SC"
        fontWeight={500}
        letterSpacing="0.01em"
        lineHeight="180%"
        color="#000000"
      >
        E 群誌是 ECN
        推出的一个社区协作编辑企划，让社区成员以“简短一句中文概述+来源链接”的格式把自己看到的最新、重要、有趣的资讯在
        ECN Discord 的 [E 群誌-ejournal] 频道分享和讨论。ECN
        对当天的消息进行简单审核后汇总，形成日报发布，并在 Notion 归档。
      </Text>
      <Text
        mt="10px"
        fontSize="sm"
        fontFamily="PingFang SC"
        fontWeight={500}
        letterSpacing="0.01em"
        lineHeight="180%"
        color="#000000"
      >
        为了鼓励并认证社区成员的贡献，并丰富社区成员的 web3 数据，ECN 推出链上
        <Text as="span" color="#EE862B">
          {` SBTs (Soulbound Tokens) `}
        </Text>
        和
        <Text as="span" color="#EE862B">
          链下可验证凭证 (Verfiable Credentials)
        </Text>{" "}
        两种数字凭证。
      </Text>
    </Box>
    <Accordion
      mt="12px"
      color="#000000"
      width="100%"
      // minW={}
      defaultIndex={[]}
      // allowMultiple
      allowToggle
      mb={3}
      borderColor="transparent"
    >
      {sbtFaqs.map((faqItem) => {
        return (
          <FAQItem
            accordionPanelProps={{
              px: "30px",
              textAlign: "start",
            }}
            key={faqItem.question}
            {...faqItem}
          />
        );
      })}
    </Accordion>
    <Title
      vstackProps={{
        mt: "60px",
      }}
      leftText="具体流程"
      rightText="02 Process"
    />
    <Text
      fontSize="sm"
      fontFamily="PingFang SC"
      fontWeight={500}
      letterSpacing="0.01em"
      lineHeight="180%"
      color="#000000"
    >
      社区成员需要如何获得“E 群誌 SBT” 和两款 VC 呢？
    </Text>
    {[
      `1. 当社区成员在ECN Discord 的 [E 群誌-ejournal]
    频道发送第一条资讯时，ecn-bot 会收集该名成员的以太坊地址进行注册；`,
      `2. 当社区成员发送的第一条资讯通过 ECN 的审核时，该名成员已经开始争取“E 群誌 SBT level1"，ta 可以在 ethgifts.com 查看自己的数据；`,
      `3. 当社区成员在 ethgifts.com 上有“E 群誌 SBT"的有效数据时，便已经可以下载“E 群誌贡献 VC”；`,
      `4. 当社区成员的贡献数量达到 SBT 所要求的数量时，即可解锁 SBT 及其对应的 VC。`,
    ].map((text) => {
      return (
        <Text
          key={text}
          mb="10px"
          fontSize="sm"
          fontFamily="PingFang SC"
          fontWeight={500}
          letterSpacing="0.01em"
          lineHeight="180%"
          color="#000000"
        >
          {text}
        </Text>
      );
    })}
  </Flex>
);
