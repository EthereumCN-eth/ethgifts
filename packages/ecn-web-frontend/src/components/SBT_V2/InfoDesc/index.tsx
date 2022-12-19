import { Button, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { css } from "@emotion/react";

import { responsive } from "@/styles/utils";

import { ProgressBar } from "./ProgressBar";

export const InfoDesc = () => {
  return (
    <Flex
      w={responsive.respWStr(700)}
      h={responsive.respWStr(360)}
      // bgColor="red.100"
      flexDirection="column"
    >
      <VStack
        align="flex-start"
        justify="space-between"
        h={responsive.respWStr(106)}
        w="full"
      >
        {/*  */}
        {/*  */}
        <Text
          css={css`
            font-family: "PingFang SC";
            font-style: normal;
            font-weight: 600;
            font-size: ${responsive.respWStr(32)};
            line-height: ${responsive.respWStr(45)};
            /* identical to box height */

            color: #ffffff;
          `}
        >
          E群誌系列SBT
        </Text>
        <Text
          css={css`
            font-family: "PingFang SC";
            font-style: normal;
            font-weight: 600;
            font-size: ${responsive.respWStr(14)};
            line-height: ${responsive.respWStr(45)};
            letter-spacing: 0.01em;
            color: #ffffff;
          `}
        >
          此 SBT 记录你在 E群志 企划中的贡献有效资讯数量。
        </Text>
      </VStack>

      <HStack
        mt={responsive.respW(35)}
        css={css`
          background: rgba(255, 255, 255, 0.1);
          border-radius: 16px;
        `}
        w="full"
        align="center"
        justify="space-between"
        pl={responsive.respWStr(63)}
        pr={responsive.respWStr(44)}
        h={responsive.respWStr(120)}
      >
        {/*  */}
        <Text
          w={responsive.respWStr(394)}
          css={css`
            font-family: "PingFang SC";
            font-style: normal;
            font-weight: 600;
            font-size: ${responsive.respWStr(14)};
            line-height: 180%;
            letter-spacing: 0.01em;
            color: #ffffff;
          `}
        >
          你还没参与过E群志编辑哦，快加入ECN
          Discord，跟大家分享一条以太坊相关的资讯吧！
        </Text>

        <Button
          variant="assist"
          px={responsive.respW(42)}
          py={responsive.respW(20)}
          css={css`
            font-family: "PingFang SC";
            font-style: normal;
            font-weight: 500;
            font-size: ${responsive.respWStr(14)};
            line-height: ${responsive.respWStr(20)};
            color: #ee862b;
          `}
        >
          连接钱包
        </Button>

        {/*  */}
      </HStack>
      <ProgressBar />
    </Flex>
  );
};
