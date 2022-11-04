import type { Tag } from "@/state/gallery/types";

export type StatusBoardPropstype = {
  detailTags: Tag[];
  itemTexts: null | string[];
  selectedIndex: number;
  sbtLevel: number[];
  expressCount: number | null;
  contractAddress: string;
  // chainId: number;
};

export type ConnectWalletBoardProps = {
  detailTags: Tag[];
  itemTexts: null | string[];
  selectedIndex: number;
};
