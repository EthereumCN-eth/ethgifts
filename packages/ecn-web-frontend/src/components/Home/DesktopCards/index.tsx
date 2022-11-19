import { Box, HStack, Center, Flex } from "@chakra-ui/react";
import { css } from "@emotion/react";
import { useEffect, useRef, useState } from "react";

import { TOTAL_H } from "./constants";
import { data } from "./data";
import { OneCard } from "./OneCard";

export const DesktopCards = ({
  hBarOpacity,
  vBarOpacity,
}: {
  hBarOpacity: number;
  vBarOpacity: number;
}) => {
  const [opacityBlocked, setOpacitBlocked] = useState(true);
  const [isBiggerH, setBiggerH] = useState(false);
  const vOpacityRef = useRef(0);
  const hOpacityRef = useRef(0);
  hOpacityRef.current = opacityBlocked ? 0 : hBarOpacity;
  vOpacityRef.current = opacityBlocked ? 0 : vBarOpacity;

  useEffect(() => {
    const c = setTimeout(() => {
      setOpacitBlocked(false);
    }, 1500);
    return () => clearTimeout(c);
  }, []);
  const [isOnHover, setIsOnHover] = useState(false);
  return (
    <>
      <Box
        bg="#E1E1E1"
        w="100vw"
        minH="1px"
        css={css`
          opacity: ${hOpacityRef.current};
        `}
        position="relative"
        alignItems="center"
      />

      <Center
        css={css`
          width: 100%;
          opacity: ${vOpacityRef.current};
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
            h={isBiggerH ? "80vh" : "68vh"}
            align="center"
            justify="space-between"
            gap={0}
            onMouseOver={() => {
              setIsOnHover(true);
            }}
            onMouseOut={() => {
              setIsOnHover(false);
            }}
          >
            {data.map((i, index) => {
              return (
                <OneCard
                  setBiggerH={setBiggerH}
                  isOuterOnHover={isOnHover}
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
          opacity: ${hOpacityRef.current};
        `}
      />
    </>
  );
};
