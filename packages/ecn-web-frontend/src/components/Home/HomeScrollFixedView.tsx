import { Box, Flex, Image, Text, VStack } from "@chakra-ui/react";
import { css } from "@emotion/react";

import { DesktopCards } from "./DesktopCards";
import { useScrollAnimate } from "./useScrollAnimate";

const circleLen = () => {
  // eslint-disable-next-line no-nested-ternary
  // if (window.innerWidth * 0.33 > 740 && window.innerWidth * 0.33 < 690)
  //   return "33vw";
  // const len = window.innerHeight > 690 && window.innerWidth > 690 ? 550 : 300;
  // return `${Math.min(window.innerHeight * 0.65, len)}px`;
  return Math.min(window.innerHeight * 0.618, window.innerWidth * 0.618);
};

const HEIGHT_WHOLE = "330vh";

export const HomeScrollFixedView = () => {
  const {
    hBarOpacity,
    progressRef,
    scrollOpacityRef,
    vBarOpacity,
    FIXED_SCROLL_PARAM,
    scrollY,
  } = useScrollAnimate();

  return (
    <>
      <div
        // className="page-bg-opacity"
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

          /* z-index: 50; */
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
              overflow="visible"
              // background="rgba(255, 255, 255, 0.8)"
              // backdropFilter="blur(150px)"
              // bg="green"
            >
              <div
                css={css`
                  width: calc(${circleLen()}px);

                  height: calc(${circleLen()}px);
                  background: white;
                  border-radius: 50%;
                  transform: ${`translateY(${0}vh)  scale(${
                    4.2 * progressRef.current + 1
                  })`};
                  opacity: ${scrollOpacityRef.current - 0.15};
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

            <Flex
              align="center"
              justify="center"
              css={css`
                position: fixed;
                /* transform: ${`translateY(-1vw) `}; */
                opacity: ${scrollOpacityRef.current};
                flex-direction: column;

                z-index: 20;
              `}
            >
              <Image
                src="/ethgifts-img.svg"
                alt="ethgifts-welcome"
                objectFit="contain"
                w={`${(circleLen() * 260) / 690}px`}
                h={`${(circleLen() * 165) / 690}px`}
                mb={`${(circleLen() * 10) / 690}px`}
              />
              <Image
                src="/ethgifts-title2.png"
                alt="ethgifts-title"
                objectFit="contain"
                w={`${(circleLen() * 213) / 690}px`}
                h={`${(circleLen() * 71) / 690}px`}
                mb={`${(circleLen() * 11) / 690}px`}
              />

              {/* <Text
                css={css`
                  font-family: "Megrim";
                  font-style: normal;
                  font-weight: bold;
                  font-size: calc(${circleLen()}px * 44 / 690 * 1.1);
                  color: rgba(15, 7, 1, 0.6);
                  font-weight: 600;
                `}
                mb={`${(circleLen() * 21) / 690}px`}
              >
                ETHGifts
              </Text> */}
              <Text
                css={css`
                  font-family: "PingFang SC";
                  font-style: normal;
                  width: calc(${circleLen()}px * 0.68);
                  font-weight: 600;
                  font-size: calc(${circleLen()}px * 14 / 690 * 1.3);
                  text-align: center;
                  line-height: 1.7;
                  margin-top: 15px;
                  width: 70%;
                  letter-spacing: 0.01em;
                  color: rgba(15, 7, 1, 0.8);
                `}
              >
                把你在 ECN 的社区参与编码为 Web3 的数字凭证
              </Text>
            </Flex>
          </VStack>
        )}
        <Flex
          zIndex={5}
          direction="column"
          h="100vh"
          w="120vw"
          align="center"
          justify="center"
          // position="sticky"
          position="fixed"
          css={css`
            transition: all 2s cubic-bezier(0.77, 0, 0.175, 1);
          `}
          // transform={scrollY > FIXED_SCROLL_PARAM ? 0 : 0}
          // scrollY > FIXED_SCROLL_PARAM ? `${fixedTopRef.current - 120}px` :
          opacity={scrollY > FIXED_SCROLL_PARAM ? 0 : 1}
          top={scrollY > FIXED_SCROLL_PARAM ? -window.innerHeight : 0}

          // position={"sticky"}
          // top={"8vh"}
          // spacing={0}
        >
          <DesktopCards hBarOpacity={hBarOpacity} vBarOpacity={vBarOpacity} />
        </Flex>
      </div>

      {/* <Box ></Box> */}
      <Box pt={HEIGHT_WHOLE} zIndex={40} />
    </>
  );
};
