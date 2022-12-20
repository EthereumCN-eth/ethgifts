/* eslint-disable react/destructuring-assignment */
import { HStack, Image, Text, VStack } from "@chakra-ui/react";
import { css } from "@emotion/react";

import { useAppSelector } from "@/state/reduxHooks";
import { selectors as sbtSelectors } from "@/state/sbt";
import { responsive } from "@/styles/utils";
import { shortenName } from "@/utils/shortenName";

import type { IconType } from "./types";
import { isImgIcon, isTextIcon } from "./utils";

const replaceContentStr = ({
  content,
  chainId,
  contractAddress,
  issuerAddress,
}: {
  chainId: number;
  contractAddress: string;
  issuerAddress: string;
  content:
    | {
        str: string;
        w: number;
        h: number;
      }
    | {
        str: string;
      };
}) => {
  if (content.str === "CHAIN_ICON" && chainId === 5) {
    return "/optimism-logo.svg";
  }
  if (content.str === "CONTRACT_ADDRESS") {
    return shortenName(contractAddress);
  }
  if (content.str === "ISSUER_ADDRESS") {
    return shortenName(issuerAddress);
  }
  return content.str;
};

export const OneInfo = (icond: IconType) => {
  // console.log("i", icond);
  const { iconsrc, content, text } = icond;
  const {
    // loaded,
    // sbtLevel,
    // // status,
    // // artworks,
    // // itemTexts,
    // // detailTags,
    // expressCount,
    chainId,
    contractAddress,
    issuerAddress,
    // contractAddress,
  } = useAppSelector(sbtSelectors.selectAll);
  const contentstr = replaceContentStr({
    chainId,
    content,
    contractAddress,
    issuerAddress,
  });

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
          src={contentstr}
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
          {contentstr}
        </Text>
      )}
    </VStack>
  );
};
