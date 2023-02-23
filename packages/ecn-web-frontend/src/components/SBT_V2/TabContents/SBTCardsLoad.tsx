import { Box, Flex, Skeleton } from "@chakra-ui/react";
import { css } from "@emotion/react";

import { responsive } from "@/styles/utils";

const arr = new Array(3).fill(null).map((v, i) => i);
const numberOfItems = 3;

export const SBTCardsLoad = () => {
  return (
    <Flex
      w="full"
      h={responsive.respWStr(560)}
      // px={responsive.respWStr(63)}
      justify="space-between"
    >
      {/*  */}
      {arr.map((v) => {
        // const qualified = expressCount ? expressCount >= sbtLevel[ind] : false;
        return (
          <Box
            key={v}
            w={`${(100 - (numberOfItems - 1) * 1.5) / numberOfItems}%`}
          >
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
                <Skeleton
                  w="50.75%"
                  // color="white"
                  h={responsive.respWStr(30)}
                />

                {/* <AspectRatio maxW="full" ratio={1}> */}
                {/* <Box w="100%"> */}
                <Skeleton
                  w="100%"
                  position="relative"
                  // bgColor="red.100"
                  sx={{
                    "&::after": {
                      content: '""',
                      display: "block",
                      paddingBottom: `100%`,
                    },
                  }}
                />
                {/* </Box> */}
                <Skeleton
                  w="93.75%"
                  // color="white"
                  css={css`
                    font-family: "PingFang SC";
                    font-style: normal;
                    font-weight: 500;
                    font-size: ${responsive.respWStr(14)};
                    line-height: ${responsive.respWStr(20)};
                  `}
                  h={responsive.respWStr(40)}
                />
              </Flex>
            </Box>
          </Box>
        );
      })}
    </Flex>
  );
};
