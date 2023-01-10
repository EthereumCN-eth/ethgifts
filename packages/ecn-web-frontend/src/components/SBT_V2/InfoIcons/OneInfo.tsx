/* eslint-disable react/destructuring-assignment */
import { HStack, Image, Text, VStack } from "@chakra-ui/react";
import { css } from "@emotion/react";

import { fontSize } from "../styles";
import { ChakraNextLink } from "@/components/ChakraNextLink";
import { useAppSelector } from "@/state/reduxHooks";
import { selectors as sbtSelectors } from "@/state/sbt";
import { responsive } from "@/styles/utils";

import { SkeletonLoadView } from "./SkeletonLoadView";
import type { IconType } from "./types";
import { isImgIcon, isTextIcon } from "./utils";

export const OneInfo = (icond: IconType) => {
  // console.log("i", icond);
  const { iconsrc, content, text } = icond;
  const { loaded } = useAppSelector(sbtSelectors.selectAll);

  if (!loaded) {
    return <SkeletonLoadView iconsrc={iconsrc} text={text} />;
  }

  return (
    <VStack align="flex-start" justify="flex-start">
      {/*  */}
      {/*  */}
      <HStack>
        <Image src={iconsrc} boxSize={responsive.respWStr(20)} />
        <Text
          fontSize={fontSize.res_xs}
          css={css`
            font-family: "PingFang SC";
            font-style: normal;
            font-weight: 500;
            /* font-size: ${fontSize.res_xs}; */
            line-height: 180%;
            /* or 25px */

            letter-spacing: 0.01em;

            color: #b9b9b9;
          `}
        >
          {" "}
          {text}
        </Text>
      </HStack>
      {isImgIcon(icond) && (
        // eslint-disable-next-line react/destructuring-assignment
        <Image
          src={content.str}
          w={responsive.respWStr(icond.content.w)}
          h={responsive.respWStr(icond.content.h)}
          css={icond.content.cssStyle}
        />
      )}
      {isTextIcon(icond) && icond.link && (
        <ChakraNextLink
          target="_blank"
          href={icond.link}
          textDecoration="underline"
        >
          <Text
            fontSize={fontSize.res_md}
            css={css`
              font-family: "PingFang SC";
              font-style: normal;
              font-weight: 600;
              /* font-size: ${fontSize.res_md}; */
              line-height: ${responsive.respWStr(25)};
              text-decoration: underline;

              color: #ffffff;
            `}
          >
            {content.str}
          </Text>
        </ChakraNextLink>
      )}
      {isTextIcon(icond) && !icond.link && (
        <Text
          fontSize={fontSize.res_md}
          css={css`
            font-family: "PingFang SC";
            font-style: normal;
            font-weight: 600;
            /* font-size: ${fontSize.res_md}; */
            line-height: ${responsive.respWStr(25)};

            color: #ffffff;
          `}
        >
          {content.str}
        </Text>
      )}
    </VStack>
  );
};
