import type { Tag } from "@/state/gallery/types";

export type StatusBoardPropstype = {
  detailTags: Tag[];
  itemTexts: null | string[];
  selectedIndex: number;
};
