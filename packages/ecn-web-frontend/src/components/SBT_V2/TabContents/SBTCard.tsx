import { Box, Flex, Text } from "@chakra-ui/react";
import { css } from "@emotion/react";

import { fontSize } from "../styles";
import { responsive } from "@/styles/utils";

import { SBTButton } from "./SBTButton";
import { SquareImg } from "./SquareImg";

export function SBTCard({
  artwork,
  ind,
  itemTexts,
  numberOfItems,
  sbtLevelNumber,
  qualified,
}: {
  numberOfItems: number;
  itemTexts: string[];
  ind: number;
  artwork: string;
  sbtLevelNumber: number;
  qualified: boolean;
}) {
  return (
    <Box w={`${(100 - (numberOfItems - 1) * 1.5) / numberOfItems}%`}>
      {/*  */}
      <Box
        w="100%"
        position="relative"
        bgColor="rgba(255, 255, 255, 0.1)"
        borderRadius="8px"
        sx={{
          "&::after": {
            content: '""',
            display: "block",
            paddingBottom: `${(550 / 370) * 100}%`,
          },
        }}
      >
        {/*  */}
        <Flex
          direction="column"
          position="absolute"
          left={0}
          top={0}
          // bgColor="red.300"
          w="full"
          h="full"
          px={responsive.respWStr(25)}
          py={responsive.respWStr(20)}
          align="center"
          justify="space-between"
        >
          <Text
            css={css`
              font-family: "PingFang SC";
              font-style: normal;
              font-weight: 600;
              font-size: ${fontSize.res_sm};
              line-height: 200%;
              /* identical to box height, or 32px */

              letter-spacing: 0.02em;

              color: #ffffff;
            `}
          >
            {itemTexts[ind]}
          </Text>
          {/* <AspectRatio maxW="full" ratio={1}> */}
          <SquareImg
            sbtLevelNumber={sbtLevelNumber}
            artwork={artwork}
            itemTexts={itemTexts}
            ind={ind}
          />
          <SBTButton qualified={qualified} sbtLevelNumber={sbtLevelNumber} />
        </Flex>
      </Box>
    </Box>
  );
}
