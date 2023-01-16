import { Box, HStack, TabPanel, Text } from "@chakra-ui/react";
import { css } from "@emotion/react";
import { MdModeEditOutline } from "react-icons/md";

import { fontSize } from "../styles";
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
            font-size: ${fontSize.res_xs};
            line-height: 180%;
            /* or 25px */

            letter-spacing: 0.01em;
            margin-bottom: ${responsive.respWStr(7)};

            color: #ffffff;
          `}
        >
          E 群誌是 ECN
          推出的一个社区协作编辑企划，让社区成员以“简短一句中文概述+来源链接”的格式把自己看到的最新、重要、有趣的资讯在
          ECN Discord 的 E 群誌-ejournal 频道分享和讨论。ECN
          对当天的消息进行简单审核后汇总，形成日报发布，并在 Notion 归档。
        </Text>
        <Text
          css={css`
            font-family: "PingFang SC";
            font-style: normal;
            font-weight: 500;
            font-size: ${fontSize.res_xs};
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
          font-size: ${fontSize.res_xs};
          line-height: 180%;
          /* or 25px */

          letter-spacing: 0.01em;

          color: #ffffff;
        `}
      >
        E 群誌 SBT 是由 ECN
        发行，对在此企划中社区成员的贡献数量进行认证的链上数字凭证，是具有不可转让性并与
        ERC721 兼容的 NFT。E 群誌 SBT 有三个级别，每次升级，难度都会提升。
      </Text>
    ),
  },
  {
    title: "什么是 E 群誌 SBT 等价 VC？",
    contentHTML: () => (
      <>
        <Text
          css={css`
            font-family: "PingFang SC";
            font-style: normal;
            font-weight: 500;
            font-size: ${fontSize.res_xs};
            line-height: 180%;
            /* or 25px */

            letter-spacing: 0.01em;

            color: #ffffff;
            margin-bottom: ${responsive.respWStr(7)};
          `}
        >
          作为链上凭证 SBT 的补充，ECN 开发了 E 群誌 SBT 等价 VC。VC
          同样是不可转让，使用密码学签名防篡改，且默认情况下存放在链下，具备隐私性且不消耗
          gas。链上链下的数据凭证结合可给社区成员对其 web3 数据更多的选择权
        </Text>
        <Text
          css={css`
            font-family: "PingFang SC";
            font-style: normal;
            font-weight: 500;
            font-size: ${fontSize.res_xs};
            line-height: 180%;
            /* or 25px */

            letter-spacing: 0.01em;

            color: #ffffff;
            margin-bottom: ${responsive.respWStr(7)};
          `}
        >
          当社区成员的贡献数达到可铸造 SBT 的级别时，即可下载 E 群誌 SBT 等价
          VC。拥有了此 VC，社区成员不仅相当于拥有了链下版本的 SBT，还能用该 VC
          在{" "}
          <ChakraNextLink
            color="#EE862B"
            display="inline"
            target="_blank"
            textDecoration="underline"
            href="http://ethgifts.com/"
          >
            ethgifts.com
          </ChakraNextLink>{" "}
          铸造其对应的 SBT。
        </Text>
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
            <HStack>
              <MdModeEditOutline color="white" size={fontSize.res_edit} />
              <Text
                css={css`
                  font-family: "PingFang SC";
                  font-style: normal;
                  font-weight: 600;
                  font-size: ${fontSize.res_sm};
                  line-height: 200%;
                  color: #ffffff;

                  letter-spacing: 0.02em;
                  margin-bottom: ${responsive.respWStr(16)};
                `}
              >
                {obj.title}
              </Text>
            </HStack>
            <obj.contentHTML />
          </Box>
        );
      })}
    </TabPanel>
  );
};

// {/* <UnorderedList
//   css={css`
//     font-family: "PingFang SC";
//     font-style: normal;
//     font-weight: 500;
//     font-size: ${responsive.respWStr(14)};
//     line-height: 180%;
//     /* or 25px */

//     letter-spacing: 0.01em;

//     color: #ffffff;
//   `}
// >
//   <ListItem>
//     {`“E 群誌 SBT"一一对应的 VC：当社区成员的贡献数达到可铸造 SBT
//     的级别时，即可下载 SBT 对应的 VC。拥有了此
//     VC，社区成员不仅相当于拥有了链下版本的 SBT，还能随时用该 VC 在
//     ethgifts.com 铸造其对应的 SBT。`}
//   </ListItem>
//   <ListItem>
//     E 群誌贡献 VC：实时更新经审核的资讯数量，数据存储在 IPFS 上，由 ECN
//     签名验证，可随时下载。
//   </ListItem>
// </UnorderedList> */}
