import { css } from "@emotion/react";

import type { IconType } from "./types";

export const icondata: IconType[] = [
  // {
  //   type: "img",
  //   iconsrc: "/credicon.svg",
  //   text: "凭证类型",
  //   content: {
  //     str: "/sbticon.svg",
  //     w: 57,
  //     h: 29,
  //   },
  // },
  {
    type: "text",
    iconsrc: "/credicon.svg",
    text: "凭证类型",
    content: {
      str: "SBT",
      // w: 57,
      // h: 29,
    },
  },
  {
    type: "text",
    iconsrc: "/prooficon.svg",
    text: "证明类别",
    content: {
      str: "工作量证明",
      // w: 33,
      // h: 25,
    },
  },
  {
    type: "img",
    iconsrc: "/networkicon.svg",
    text: "支持网络",
    content: {
      str: "CHAIN_ICON",
      w: 103,
      h: 14,
      cssStyle: css`
        transform: translateY(4px);
      `,
    },
  },
  {
    type: "text",
    iconsrc: "/claim-method.svg",
    text: "领取方式",
    content: {
      str: "用等效VC铸造",
    },
  },
  {
    type: "text",
    iconsrc: "/contracticon.svg",
    text: "合约地址",
    content: {
      str: "CONTRACT_ADDRESS",
    },
    link: `https://optimistic.etherscan.io/address/$$$CONTRACT_ADDRESS$$$`,
  },
  {
    type: "text",
    iconsrc: "/issuer.svg",
    text: "发行者地址",
    content: {
      str: "ISSUER_ADDRESS",
    },
    link: `https://optimistic.etherscan.io/address/$$$ISSUER_ADDRESS$$$`,
  },
];
