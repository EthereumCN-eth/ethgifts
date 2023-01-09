import { Box, Center, Flex, Skeleton, Text } from "@chakra-ui/react";
import { css } from "@emotion/react";
import { BsCheck, BsDot } from "react-icons/bs";

import { useAppSelector } from "@/state/reduxHooks";
import { selectors as sbtSelectors } from "@/state/sbt";
import { responsive } from "@/styles/utils";

const calcPercent = ({ sbtLevel }: { sbtLevel: number[] }) => {
  const total = sbtLevel[sbtLevel.length - 1];

  const percents = sbtLevel.map((v) => {
    if (v === total) return 1;
    return v / total;
  });
  return [1 / total, ...percents];
};

export const ProgressBar = () => {
  const {
    loaded,
    sbtLevel,
    // status,
    // artworks,
    // itemTexts,
    // detailTags,
    expressCount,
    // contractAddress,
  } = useAppSelector(sbtSelectors.selectAll);

  const currentCount = expressCount || 0;
  // const currentCount = 0;
  const total = sbtLevel[sbtLevel.length - 1];
  const filledLength =
    Math.min(currentCount / total, 1) * responsive.respW(670);
  // console.log("fill", filledLength);

  if (!loaded)
    return (
      <Flex
        direction="row"
        // bgColor="red.100"
        mt="auto"
        w={responsive.respWStr(700)}
        h={responsive.respHStr(60)}
        align="center"
        position="relative"
      >
        <Skeleton w={responsive.respWStr(700)} h={responsive.respWStr(12)} />
      </Flex>
    );

  // console.log(sbtLevel);
  // console.log(expressCount);
  const percents = calcPercent({ sbtLevel });

  return (
    <Flex
      direction="row"
      // bgColor="red.100"
      mt="auto"
      w={responsive.respWStr(700)}
      h={responsive.respHStr(60)}
      align="center"
      position="relative"
    >
      {/*  */}
      <Box
        position="absolute"
        left="0"
        bgColor="#FFFFFF"
        pl={responsive.respWStr(2)}
        w={responsive.respWStr(700)}
        // h={responsive.respWStr(12)}
        h={responsive.respHStr(21)}
        boxShadow="inset 0px 2px 3px rgba(0, 0, 0, 0.25)"
      >
        {/*  */}
        {/*  */}
      </Box>

      {/*  */}
      <Box
        position="absolute"
        left={responsive.respWStr(15)}
        bgColor="#757575"
        pl={responsive.respWStr(2)}
        // opacity={filledLength ? 1 : 0}
        w={responsive.respWStr(670)}
        h={responsive.respWStr(12)}
        zIndex={10}
      />

      <Box
        position="absolute"
        left={responsive.respWStr(15)}
        bgColor="#EE862B"
        pl={responsive.respWStr(2)}
        opacity={filledLength ? 1 : 0}
        w={`${filledLength}px`}
        h={responsive.respWStr(12)}
        borderTopRightRadius={responsive.respWStr(6)}
        borderBottomRightRadius={responsive.respWStr(6)}
        zIndex={10}
      />
      {percents.map((percent, ind) => {
        const transformStr =
          // eslint-disable-next-line no-nested-ternary
          ind === 0
            ? "translateX(calc(0% - 2px))"
            : percent === 1
            ? "translateX(calc(-100% + 2px))"
            : "translateX(-50%)";
        const leftOffset = ind === 0 ? 0 : percent;
        const lightenup = currentCount / total >= percent;
        return (
          <>
            {/*  the outer circle */}
            <Box
              key={percent}
              position="absolute"
              transform={transformStr}
              boxShadow="inset 0px 2px 3px rgba(0, 0, 0, 0.25)"
              left={`calc(${leftOffset * 100}%)`}
              css={css`
                width: ${responsive.respWStr(49)};
                height: ${responsive.respWStr(49)};
                border-radius: 50%;
                background-color: ${"white"};
                z-index: 5;
              `}
            />
            {/* the inner circle */}
            <Center
              key={percent}
              position="absolute"
              transform={transformStr}
              left={`calc(${leftOffset * 100}%)`}
              css={css`
                width: ${responsive.respWStr(49)};
                height: ${responsive.respWStr(49)};
                border-radius: 50%;
                z-index: 15;
              `}
            >
              <Center
                css={css`
                  width: ${responsive.respWStr(33)};
                  height: ${responsive.respWStr(33)};
                  border-radius: 50%;
                  /* background-color: #757575; */
                  background-color: ${lightenup ? "#ee862b" : "#757575"};
                `}
              >
                {ind === 0 &&
                  (lightenup ? (
                    <BsCheck color="white" size={responsive.respWStr(25)} />
                  ) : (
                    <BsDot color="white" size={responsive.respWStr(25)} />
                  ))}
                {ind !== 0 && (
                  <Text color="white" fontSize={responsive.respWStr(11)}>{`Lv${
                    ind + 1
                  }`}</Text>
                )}
              </Center>
            </Center>
          </>
        );
      })}
    </Flex>
  );
};
