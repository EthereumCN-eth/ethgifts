import { css } from "@emotion/react";


import "@rainbow-me/rainbowkit/styles.css";
import {
  MutableRefObject,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";
import { Box, Flex, VStack } from "@chakra-ui/react";
import { useScrollProgress } from "./useScrollProgress";
import { DesktopCards } from "./DesktopCards";
import { throttle } from "lodash";

const circleLen = () => {
  return window.innerWidth * 0.33 > 740 && window.innerWidth * 0.33 < 690
    ? "33vw"
    : window.innerHeight > 690 && window.innerWidth > 690
    ? "550px"
    : "300px";
};

const HEIGHT_WHOLE = "250vh";

export const HomeScrollFixedView = () => {
  const { progressRef, scrollOpacityRef, scrollY, scrollDirection } =
    useScrollProgress();
  console.log("progressRef.current", progressRef.current);
  console.log("scrollOpacityRef.current", scrollOpacityRef.current);
  const hBarOpacity =
    progressRef.current > 0.1 ? 1 - scrollOpacityRef.current - 0.15 : 0;
  const vBarOpacity =
    progressRef.current > 0.3 ? 1 - scrollOpacityRef.current - 0.5 : 0;

  const fixedTopRef = useRef(0);

  const FIXED_SCROLL_PARAM = useMemo(() => window.innerHeight * 1.3, []);

  const debFindScrollFixedY = useMemo(() => {
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
        if (scrollDirection === "down" && scrollY > FIXED_SCROLL_PARAM) {
          if (fixedTopRef.current > scrollY || fixedTopRef.current === 0) {
            fixedTopRef.current = scrollY;
          }
        }
        if (scrollDirection === "up" && scrollY < FIXED_SCROLL_PARAM) {
          if (fixedTopRef.current < scrollY || !fixedTopRef.current) {
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
            h={"full"}
            w={"full"}
            align="center"
            justify={"center"}
            position={"fixed"}
            top={0}
            left={0}
            spacing={0}
          >
            <Flex
              align="center"
              justify={"center"}
              minH={"68vh"}
              w={"full"}
              overflow="hidden"
            >
              <div
                css={css`
                  width: calc(${circleLen()} * 1);

                  height: calc(${circleLen()} * 1);
                  background-color: transparent;
                  border-radius: 50%;
                  transform: ${`translateY(${-3}vh)  scale(${
                    4.2 * progressRef.current + 1
                  })`};
                  opacity: ${scrollOpacityRef.current};
                  border: ${1 + 1 * progressRef.current}px solid black;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                `}
              />
            </Flex>

            <div
              css={css`
                position: fixed;
                transform: ${`translateY(-1vw) `};
                opacity: ${scrollOpacityRef.current};
                display: flex;
                flex-direction: column;
                align-items: center;
                z-index: 20;
              `}
            >
              <p
                css={css`
                  font-family: "Red Rose";
                  font-style: normal;
                  font-weight: 400;
                  font-size: calc(${circleLen()} / 8);
                `}
              >
                ETHGift
              </p>
              <p
                css={css`
                  font-family: "PingFang SC";
                  font-style: normal;
                  width: calc(${circleLen()} * 0.68);
                  font-weight: 400;
                  font-size: calc(${circleLen()} / 20);
                  text-align: center;
                  line-height: 1.7;
                  margin-top: 10px;
                `}
              >
                把你在ECN的社区参与编码为 web3 的数字凭证
              </p>
            </div>
          </VStack>
        )}
        <Flex
          zIndex={5}
          direction={"column"}
          h={"100vh"}
          w={"120vw"}
          align="center"
          justify={"center"}
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
