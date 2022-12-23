import { Box, Center, Flex, Skeleton } from "@chakra-ui/react";
import { css } from "@emotion/react";

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
  // const currentCount = 20;
  const total = sbtLevel[sbtLevel.length - 1];
  const filledLength = (currentCount / total) * responsive.respW(670);

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
        h={responsive.respWStr(12)}
        boxShadow="inset 0px 2px 3px rgba(0, 0, 0, 0.25)"
      >
        {/*  */}
        {/*  */}
      </Box>
      <Box
        position="absolute"
        left={responsive.respWStr(15)}
        bgColor="#EE862B"
        pl={responsive.respWStr(2)}
        w={`${filledLength}px`}
        h={responsive.respWStr(8)}
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
          <Center
            key={percent}
            position="absolute"
            transform={transformStr}
            left={`calc(${leftOffset * 100}%)`}
            css={css`
              width: ${responsive.respWStr(30)};
              height: ${responsive.respWStr(30)};
              border-radius: 50%;
              background-color: ${lightenup ? "#ee862b" : "white"};
            `}
          >
            {/* {`Lv ${ind}`} */}
          </Center>
        );
      })}
    </Flex>
  );
};
