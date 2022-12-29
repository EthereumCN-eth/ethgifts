import { Flex, Text, VStack } from "@chakra-ui/react";
import { css } from "@emotion/react";

import { responsive } from "@/styles/utils";

import { InfoSection } from "./InfoSection";
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

      <InfoSection />

      <ProgressBar />
    </Flex>
  );
};
