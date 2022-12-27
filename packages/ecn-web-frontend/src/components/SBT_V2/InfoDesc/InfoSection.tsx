import { HStack, Skeleton } from "@chakra-ui/react";
import { css } from "@emotion/react";

import { useAppSelector } from "@/state/reduxHooks";
import { selectors as sbtSelectors } from "@/state/sbt";
import { responsive } from "@/styles/utils";

import { InfoButton } from "./InfoButton";
import { InfoText } from "./InfoText";

export const InfoSection = () => {
  const { loaded } = useAppSelector(sbtSelectors.selectAll);

  if (!loaded) {
    return (
      <Skeleton
        mt={responsive.respW(35)}
        css={css`
          background: rgba(255, 255, 255, 0.1);
          border-radius: 16px;
        `}
        w="full"
        // align="center"
        // justify="space-between"
        pl={responsive.respWStr(63)}
        pr={responsive.respWStr(44)}
        h={responsive.respWStr(120)}
      />
    );
  }
  return (
    <HStack
      mt={responsive.respW(35)}
      css={css`
        background: rgba(255, 255, 255, 0.1);
        border-radius: 16px;
      `}
      w="full"
      align="center"
      justify="space-between"
      pl={responsive.respWStr(63)}
      pr={responsive.respWStr(44)}
      h={responsive.respWStr(120)}
    >
      {/*  */}

      <InfoText />

      <InfoButton />
      {/*  */}
    </HStack>
  );
};
