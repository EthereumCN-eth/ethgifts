import { Flex, Text, VStack } from "@chakra-ui/react";
import { css } from "@emotion/react";

import { fontSize } from "../styles";
import { responsive } from "@/styles/utils";

import { InfoSection } from "./InfoSection";

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
          fontSize={fontSize.res_xl}
          css={css`
            font-family: "PingFang SC";
            font-style: normal;
            font-weight: 600;
            /* font-size: ${fontSize.res_xl}; */
            line-height: ${responsive.respWStr(45)};
            /* identical to box height */

            color: #ffffff;
          `}
        >
          E群誌系列SBT
        </Text>
        <Text
          fontSize={fontSize.res_xs}
          css={css`
            font-family: "PingFang SC";
            font-style: normal;
            font-weight: 600;
            /* font-size: ${fontSize.res_xs}; */
            line-height: 150%;
            letter-spacing: 0.01em;
            color: #ffffff;
          `}
        >
          ECN Translator 系列 SBT
          以翻译内容主题分类，翻译志愿者在每个类别上有三篇文章成功发布后即可获得一枚相应的
          SBT。
        </Text>
      </VStack>

      <InfoSection />

      {/* <ProgressBar /> */}
    </Flex>
  );
};
