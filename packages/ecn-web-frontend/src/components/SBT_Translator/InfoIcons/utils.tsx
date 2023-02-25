import { useAppSelector } from "@/state/reduxHooks";
import { selectors as sbtSelectors } from "@/state/sbt";
import { shortenName } from "@/utils/shortenName";

import type { IconType, ImgIconType, TextIconType } from "./types";

export function isImgIcon(i: IconType): i is ImgIconType {
  return i.type === "img";
}
export function isTextIcon(i: IconType): i is TextIconType {
  return i.type === "text";
}

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
  if (content.str === "CHAIN_ICON" && chainId === 10) {
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

const replaceLink = ({
  link,
  contractAddress,
  issuerAddress,
}: {
  link: string | undefined;
  contractAddress: string;
  issuerAddress: string;
}) => {
  if (!link) return link;
  return link
    .replace("$$$CONTRACT_ADDRESS$$$", contractAddress)
    .replace("$$$ISSUER_ADDRESS$$$", issuerAddress);
};

export const useParseData = ({
  icondata,
}: {
  icondata: IconType[];
}): IconType[] => {
  const {
    chainId,
    contractAddress,
    issuerAddress,
    // contractAddress,
  } = useAppSelector(sbtSelectors.selectAll);

  return icondata.map((data) => {
    const { content, link } = data;
    const linkstr = replaceLink({ link, contractAddress, issuerAddress });
    const contentstr = replaceContentStr({
      chainId,
      content,
      contractAddress,
      issuerAddress,
    });
    return {
      ...data,
      content: {
        ...data.content,
        str: contentstr,
      },
      link: linkstr,
    } as IconType;
  });
};
