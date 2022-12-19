/* eslint-disable react/destructuring-assignment */
import { HStack, Image, Text, VStack } from "@chakra-ui/react";
import { css } from "@emotion/react";

import { responsive } from "@/styles/utils";

import type { IconType } from "./types";
import { isImgIcon, isTextIcon } from "./utils";

export const OneInfo = (icond: IconType) => {
  // console.log("i", icond);
  const { iconsrc, content, text } = icond;
  return (
    <VStack align="flex-start" justify="flex-start">
      {/*  */}
      {/*  */}
      <HStack>
        <Image src={iconsrc} boxSize={responsive.respWStr(20)} />
        <Text
          css={css`
            font-family: "PingFang SC";
            font-style: normal;
            font-weight: 500;
            font-size: ${responsive.respWStr(14)};
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
        />
      )}
      {isTextIcon(icond) && (
        <Text
          css={css`
            font-family: "PingFang SC";
            font-style: normal;
            font-weight: 600;
            font-size: ${responsive.respWStr(18)};
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
