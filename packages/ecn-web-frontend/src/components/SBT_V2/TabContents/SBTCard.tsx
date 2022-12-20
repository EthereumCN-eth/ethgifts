import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { css } from "@emotion/react";

import { responsive } from "@/styles/utils";

import { SquareImg } from "./SquareImg";

export function SBTCard({
  artwork,
  ind,
  itemTexts,
  numberOfItems,
}: {
  numberOfItems: number;
  itemTexts: string[];
  ind: number;
  artwork: string;
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
              font-size: ${responsive.respWStr(16)};
              line-height: 200%;
              /* identical to box height, or 32px */

              letter-spacing: 0.02em;

              color: #ffffff;
            `}
          >
            {itemTexts[ind]}
          </Text>
          {/* <AspectRatio maxW="full" ratio={1}> */}
          <SquareImg artwork={artwork} itemTexts={itemTexts} ind={ind} />
          <Button
            // onClick={onOpen}
            variant="orangeBg"
            w="93.75%"
            css={css`
              font-family: "PingFang SC";
              font-style: normal;
              font-weight: 500;
              font-size: ${responsive.respWStr(14)};
              line-height: ${responsive.respWStr(20)};
            `}
            h={responsive.respWStr(40)}
          >
            申领 SBT
          </Button>
        </Flex>
      </Box>
    </Box>
  );
}
