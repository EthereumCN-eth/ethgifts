import { Box, HStack, keyframes, Center, Flex } from "@chakra-ui/react";
import { css } from "@emotion/react";
import { useState } from "react";

import { TOTAL_H } from "./constants";
import { data } from "./data";
import { OneCard } from "./OneCard";

const textAnimation = keyframes`
  0%   {opacity:0}
  50%  {opacity:0}
  100% {opacity:1}
`;

export const DesktopCards = ({
  hBarOpacity,
  vBarOpacity,
}: {
  hBarOpacity: number;
  vBarOpacity: number;
}) => {
  const [isOnHover, setIsOnHover] = useState(false);
  return (
    <>
      <Box
        bg="#E1E1E1"
        w="100vw"
        minH="1px"
        css={css`
          opacity: ${hBarOpacity};
        `}
        position="relative"
        alignItems="center"
      />

      <Center
        css={css`
          width: 100%;
          opacity: ${vBarOpacity};
          background: rgba(255, 255, 255);
          filter: drop-shadow(18px 25px 15px rgba(0, 0, 0, 0.25));
        `}
      >
        <Flex
          justify="center"
          alignItems="center"
          width={`${(100 / (data.length + 1)) * 4 * 0.8}vw`}
          // bgColor="green"
        >
          <HStack
            spacing={0}
            //   borderY={"black solid 1px"}
            w="full"
            // px={}
            minH={`${TOTAL_H}vh`}
            align="center"
            justify="space-between"
            gap={0}
            sx={{
              "& .ecn-card-title": {
                transform: `rotateZ(${isOnHover ? "90deg" : "0deg"})`,
                // eslint-disable-next-line sonarjs/no-duplicate-string
                transition: "all 1s cubic-bezier(0.77, 0, 0.175, 1)",
              },
              "& .ecn-card-title-char": {
                display: "inline-block",
                /* display: ${isOnHover ? "block" : "inline"}; */
                transform: `rotateZ(${isOnHover ? "-90deg" : "0deg"})`,
                transition: "all 1s cubic-bezier(0.77, 0, 0.175, 1)",
                letterSpacing: isOnHover ? "0.3em" : "0",
              },
            }}
            _hover={{
              "& > div": {
                w: "25%",

                transition: "all 1s cubic-bezier(0.77, 0, 0.175, 1)",
              },

              "& > div:hover": {
                w: "65%",
                "& .ecn-icon": {
                  // top: "3%",
                },

                "& .ecn-card-title": {
                  transform: `rotateZ(${"0deg"})`,
                  // top: "81.4%",

                  transition: "all 1s cubic-bezier(0.77, 0, 0.175, 1)",
                },
                "& .ecn-card-title-char": {
                  transform: `rotateZ(${"0deg"})`,
                  transition: "all 1s cubic-bezier(0.77, 0, 0.175, 1)",
                },
                "& .ecn-card-desc": {
                  visibility: "visible",
                  opacity: 1,
                  animation: `${textAnimation} 1.5s cubic-bezier(0.77, 0, 0.175, 1)`,
                  transition: "all 1s cubic-bezier(0.77, 0, 0.175, 1)",
                },
              },
              "& > div:not(:hover)": {
                w: isOnHover ? "11.666%" : "25%",
                "& .ecn-in-icon-shell": {
                  // top: "14.4%",
                  opacity: 0,
                },
              },
            }}
          >
            {data.map((i, index) => {
              return (
                <OneCard
                  isOuterOnHover={isOnHover}
                  setOuterIsOnHover={setIsOnHover}
                  key={i.text}
                  item={i}
                  index={index}
                />
              );
            })}
          </HStack>
        </Flex>
      </Center>
      <Box
        bg="#E1E1E1"
        w="120vw"
        minH="1px"
        css={css`
          opacity: ${hBarOpacity};
        `}
      />
    </>
  );
};
