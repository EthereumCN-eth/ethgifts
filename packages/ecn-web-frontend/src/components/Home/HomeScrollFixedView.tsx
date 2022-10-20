import { Box, Flex, VStack } from "@chakra-ui/react";
import { css } from "@emotion/react";
import throttle from "lodash.throttle";
import type { MutableRefObject } from "react";
import { useLayoutEffect, useMemo, useRef } from "react";

import { DesktopCards } from "./DesktopCards";
import { useScrollProgress } from "./useScrollProgress";

const circleLen = () => {
  // eslint-disable-next-line no-nested-ternary
  if (window.innerWidth * 0.33 > 740 && window.innerWidth * 0.33 < 690)
    return "33vw";
  const len = window.innerHeight > 690 && window.innerWidth > 690 ? 550 : 300;
  return `${Math.min(window.innerHeight * 0.65, len)}px`;
};

const HEIGHT_WHOLE = "250vh";

const throttledScrollFixedY = (fixedScrollParam: number) => {
  return throttle(
    ({
      fixedTopRef,
      scrollDirection,
      scrollY,
    }: {
      fixedTopRef: MutableRefObject<number>;
      scrollDirection: "up" | "down";
      scrollY: number;
    }) => {
      // eslint-disable-next-line sonarjs/no-collapsible-if
      if (scrollDirection === "down" && scrollY > fixedScrollParam) {
        if (fixedTopRef.current > scrollY || fixedTopRef.current === 0) {
          // eslint-disable-next-line no-param-reassign
          fixedTopRef.current = scrollY;
        }
      }
      // eslint-disable-next-line sonarjs/no-collapsible-if
      if (scrollDirection === "up" && scrollY < fixedScrollParam) {
        if (fixedTopRef.current < scrollY || !fixedTopRef.current) {
          // eslint-disable-next-line no-param-reassign
          fixedTopRef.current = scrollY;
        }
      }
    },
    100,
    {
      trailing: false,
      leading: true,
    }
  );
};

export const HomeScrollFixedView = () => {
  const { progressRef, scrollOpacityRef, scrollY, scrollDirection } =
    useScrollProgress();
  // console.log("progressRef.current", progressRef.current);
  // console.log("scrollOpacityRef.current", scrollOpacityRef.current);
  const hBarOpacity =
    progressRef.current > 0.1 ? 1 - scrollOpacityRef.current - 0.15 : 0;
  const vBarOpacity =
    progressRef.current > 0.3 ? 1 - scrollOpacityRef.current - 0.5 : 0;

  const fixedTopRef = useRef(0);

  const FIXED_SCROLL_PARAM = useMemo(() => window.innerHeight * 1.3, []);

  const debFindScrollFixedY = useMemo(() => {
    return throttledScrollFixedY(FIXED_SCROLL_PARAM);
  }, [FIXED_SCROLL_PARAM]);

  useLayoutEffect(() => {
    debFindScrollFixedY({
      fixedTopRef,
      scrollDirection,
      scrollY,
    });
  }, [debFindScrollFixedY, scrollDirection, scrollY]);
  return (
    <>
      <div
        // ref={containerRef}
        css={css`
          height: ${HEIGHT_WHOLE};
          width: 100%;
          /* background-color: whitesmoke; */
          display: flex;
          flex-direction: column;
          /* justify-content: center; */
          align-items: center;
          overflow: hidden;
          position: absolute;
          /* top: 0; */
          z-index: 50;
        `}
      >
        {scrollOpacityRef.current > 0 && (
          <VStack
            zIndex={10}
            h="full"
            w="full"
            align="center"
            justify="center"
            position="fixed"
            top={0}
            left={0}
            spacing={0}
          >
            <Flex
              align="center"
              justify="center"
              minH="68vh"
              w="full"
              overflow="hidden"
              // background="rgba(255, 255, 255, 0.8)"
              // backdropFilter="blur(150px)"
              // bg="green"
            >
              <div
                css={css`
                  width: calc(${circleLen()} * 1);

                  height: calc(${circleLen()} * 1);
                  background: white;
                  border-radius: 50%;
                  transform: ${`translateY(${0}vh)  scale(${
                    4.2 * progressRef.current + 1
                  })`};
                  opacity: ${scrollOpacityRef.current};
                  /* border: ${1 + 1 * progressRef.current}px solid black; */
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  /* box-shadow: rgba(255, 255, 255, 0.6) 0px 25px 50px -12px;
                   */
                  filter: drop-shadow(18px 18px 20px rgba(0, 0, 0, 0.25));
                `}
              />
            </Flex>

            <div
              css={css`
                position: fixed;
                /* transform: ${`translateY(-1vw) `}; */
                opacity: ${scrollOpacityRef.current};
                display: flex;
                flex-direction: column;
                align-items: center;
                z-index: 20;
              `}
            >
              <p
                css={css`
                  font-family: "PingFang SC";
                  font-style: normal;
                  font-weight: 400;
                  font-size: calc(${circleLen()} / 12);
                  color: rgba(15, 7, 1, 0.6);
                  font-weight: 600;
                `}
              >
                ETHGifts
              </p>
              <p
                css={css`
                  font-family: "PingFang SC";
                  font-style: normal;
                  width: calc(${circleLen()} * 0.68);
                  font-weight: 600;
                  font-size: calc(${circleLen()} / 34);
                  text-align: center;
                  line-height: 1.7;
                  margin-top: 15px;
                  width: 70%;
                  letter-spacing: 0.01em;
                  color: rgba(15, 7, 1, 0.6);
                `}
              >
                把你在ECN的社区参与编码为 web3 的数字凭证
              </p>
            </div>
          </VStack>
        )}
        <Flex
          zIndex={5}
          direction="column"
          h="100vh"
          w="120vw"
          align="center"
          justify="center"
          position={scrollY > FIXED_SCROLL_PARAM ? "sticky" : "fixed"}
          top={
            scrollY > FIXED_SCROLL_PARAM
              ? `calc(${fixedTopRef.current}px - 120px)`
              : 0
          }

          // position={"sticky"}
          // top={"8vh"}
          // spacing={0}
        >
          <DesktopCards hBarOpacity={hBarOpacity} vBarOpacity={vBarOpacity} />
        </Flex>
      </div>

      {/* <Box ></Box> */}
      <Box pt={HEIGHT_WHOLE} />
    </>
  );
};
