import { Flex, TabPanel, Text, VStack } from "@chakra-ui/react";
import { css } from "@emotion/react";

import { useAppSelector } from "@/state/reduxHooks";
import { selectors as sbtSelectors } from "@/state/sbt";
import { responsive } from "@/styles/utils";

import { SBTCard } from "./SBTCard";

export const SBTCardSection = () => {
  const {
    loaded,
    sbtLevel,
    // status,
    artworks,
    itemTexts,
    expressCount,
    // contractAddress,
  } = useAppSelector(sbtSelectors.selectAll);

  const numberOfItems = artworks.length;

  if (numberOfItems === 0 || !loaded || !itemTexts) return null;

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
        <Flex
          w="full"
          h={responsive.respWStr(560)}
          // px={responsive.respWStr(63)}
          justify="space-between"
          // bgColor="red.100"
        >
          {/*  */}
          {artworks.map((artwork, ind) => {
            const qualified = expressCount
              ? expressCount >= sbtLevel[ind]
              : false;
            return (
              <SBTCard
                numberOfItems={numberOfItems}
                itemTexts={itemTexts}
                ind={ind}
                artwork={artwork}
                key={artwork}
                sbtLevelNumber={sbtLevel[ind]}
                qualified={qualified}
              />
            );
          })}
        </Flex>

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
        >
          {/*  */}

          <VStack align="flex-start">
            <Text
              css={css`
                font-family: "PingFang SC";
                font-style: normal;
                font-weight: 600;
                font-size: ${responsive.respWStr(16)};
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
                    font-size: ${responsive.respWStr(14)};
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

          {/*  */}
        </Flex>
      </Flex>
    </TabPanel>
  );
};
