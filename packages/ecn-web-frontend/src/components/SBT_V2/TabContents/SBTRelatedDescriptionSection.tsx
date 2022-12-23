import { Box, ListItem, TabPanel, Text, UnorderedList } from "@chakra-ui/react";
import { css } from "@emotion/react";

import { ChakraNextLink } from "@/components/ChakraNextLink";
import { responsive } from "@/styles/utils";

const contentData = [
  {
    title: "什么是 E 群誌 ？",
    contentHTML: () => (
      <>
        <Text
          css={css`
            font-family: "PingFang SC";
            font-style: normal;
            font-weight: 500;
            font-size: ${responsive.respWStr(14)};
            line-height: 180%;
            /* or 25px */

            letter-spacing: 0.01em;
            margin-bottom: ${responsive.respWStr(7)};

            color: #ffffff;
          `}
        >
          E 群誌是 ECN
          推出的一个社区协作编辑企划，让社区成员以“简短一句中文概述+来源链接”的格式把自己看到的最新、重要、有趣的资讯在
          ECN Discord 的 [E 群誌-ejournal] 频道分享和讨论。ECN
          对当天的消息进行简单审核后汇总，形成日报发布，并在 Notion 归档。
        </Text>
        <Text
          css={css`
            font-family: "PingFang SC";
            font-style: normal;
            font-weight: 500;
            font-size: ${responsive.respWStr(14)};
            line-height: 180%;
            /* or 25px */

            letter-spacing: 0.01em;

            color: #ffffff;
          `}
        >
          为了鼓励并认证社区成员的贡献，并丰富社区成员的 web3 数据，ECN 推出链上{" "}
          <ChakraNextLink
            display="inline"
            target="_blank"
            textDecoration="underline"
            href="#"
            color="#EE862B"
          >
            SBTs (Soulbound Tokens)
          </ChakraNextLink>{" "}
          和{" "}
          <ChakraNextLink
            color="#EE862B"
            display="inline"
            target="_blank"
            textDecoration="underline"
            href="#"
          >
            链下可验证凭证 (Verfiable Credentials)
          </ChakraNextLink>{" "}
          两种数字凭证。
        </Text>
      </>
    ),
  },
  {
    title: "什么是 E 群誌 SBT ？",
    contentHTML: () => (
      <Text
        css={css`
          font-family: "PingFang SC";
          font-style: normal;
          font-weight: 500;
          font-size: ${responsive.respWStr(14)};
          line-height: 180%;
          /* or 25px */

          letter-spacing: 0.01em;

          color: #ffffff;
        `}
      >
        E 群誌 SBT(Soul-Bound Token) 是由 ECN
        发行，对在此企划中社区成员的贡献数量进行认证的链上数字凭证，是具有不可转让性并与
        ERC721 兼容的 NFT，其 metadataURI 为每个参与者所发布有效资讯在 Arweave
        上存档的链接，这些 NFT 发布在以太坊的二层网络 Optimism 上。E 群誌 SBT
        发布在公开的账本上，任何人都可以查看和验证。“E 群誌 SBT”
        有三个级别，每次升级，难度都会提升。
      </Text>
    ),
  },
  {
    title: "什么是 E 群誌 VC ？为什么有两款？",
    contentHTML: () => (
      <>
        <Text
          css={css`
            font-family: "PingFang SC";
            font-style: normal;
            font-weight: 500;
            font-size: ${responsive.respWStr(14)};
            line-height: 180%;
            /* or 25px */

            letter-spacing: 0.01em;

            color: #ffffff;
            margin-bottom: ${responsive.respWStr(7)};
          `}
        >
          作为链上凭证 SBT 的补充，ECN 开发了两款 E 群誌相关的 VC (了解什么是
          VC)，它们基于区块链，存储在链下，获取不需要消耗
          gas，可由所有者保管并自主选择向谁出示。链上链下的数据凭证结合可给社区成员对其
          web3 数据更多的选择权
        </Text>
        <UnorderedList
          css={css`
            font-family: "PingFang SC";
            font-style: normal;
            font-weight: 500;
            font-size: ${responsive.respWStr(14)};
            line-height: 180%;
            /* or 25px */

            letter-spacing: 0.01em;

            color: #ffffff;
          `}
        >
          <ListItem>
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
      </>
    ),
  },
];

export const SBTRelatedDescriptionSection = () => {
  return (
    <TabPanel
      w="full"
      pt={responsive.respWStr(52)}
      pb={responsive.respWStr(63)}
      px={responsive.respWStr(74)}
      minH={responsive.respWStr(666)}
    >
      {contentData.map((obj) => {
        return (
          <Box key={obj.title} mb={responsive.respWStr(56)}>
            <Text
              css={css`
                font-family: "PingFang SC";
                font-style: normal;
                font-weight: 600;
                font-size: ${responsive.respWStr(16)};
                line-height: 200%;
                color: #ffffff;

                letter-spacing: 0.02em;
                margin-bottom: ${responsive.respWStr(16)};
              `}
            >
              {obj.title}
            </Text>
            <obj.contentHTML />
          </Box>
        );
      })}
    </TabPanel>
  );
};
