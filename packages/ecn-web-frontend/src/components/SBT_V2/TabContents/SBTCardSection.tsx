import { Box, Flex, TabPanel, Text, VStack } from "@chakra-ui/react";
import { css } from "@emotion/react";

import { fontSize } from "../styles";
import { responsive } from "@/styles/utils";

import { SBTCards } from "./SBTCards";

export const SBTCardSection = () => {
  return (
    <TabPanel w="full" h={responsive.respWStr(1149)}>
      <Flex
        direction="column"
        w="full"
        h={responsive.respWStr(1149)}
        // justify="space-between"
        align="center"
        px={responsive.respWStr(63)}
        // bgColor="red.300"
      >
        <SBTCards />

        <Flex
          mt={responsive.respWStr(79)}
          w="full"
          h={responsive.respWStr(411)}
          p={responsive.respWStr(36)}
          // justify="space-between"
          css={css`
            border: 2px dashed #757575;
            border-radius: 16px;
          `}
          direction="row"
          justify="space-between"
        >
          {/*  */}

          <VStack w="33.5%" align="flex-start">
            <Text
              css={css`
                font-family: "PingFang SC";
                font-style: normal;
                font-weight: 600;
                font-size: ${fontSize.res_sm};
                line-height: 200%;
                color: white;
                margin-bottom: ${responsive.respWStr(25)};
              `}
            >
              如何获取SBT
            </Text>
            {[
              "1. 在discord参与 E群誌编辑，提交 ETH 地址",
              "2. 在 ethgifts.com 查看进度",
              "3. 当贡献咨询达到等级所需数量时，即可用等价VC铸造 SBT",
            ].map((txt) => {
              return (
                <Text
                  key={txt}
                  css={css`
                    font-family: "PingFang SC";
                    font-style: normal;
                    font-weight: 400;
                    font-size: ${fontSize.res_xs};
                    line-height: 200%;
                    color: white;
                    margin-bottom: ${responsive.respWStr(25)};
                  `}
                >
                  {txt}
                </Text>
              );
            })}
          </VStack>

          <Box
            w="63.5%"
            h="full"
            css={css`
              position: relative;
              /* 16:9 */
              /* padding-bottom: calc(56.25% * 0.75); */
              /* width: 75%; */
              /* height: 0; */
              & iframe {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
              }
            `}
            // bgColor="green"
          >
            <iframe
              src="https://www.youtube.com/embed/dkT3ziEpgPc"
              // frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              // css={css``}
              title="video"
            />
            {/*  */}
          </Box>

          {/*  */}
        </Flex>
      </Flex>
    </TabPanel>
  );
};
