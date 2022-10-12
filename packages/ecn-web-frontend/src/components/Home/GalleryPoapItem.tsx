import type { GalleryPoapItemType } from "@/state/gallery/types";

import { GalleryItem } from "./GalleryItem";

export const GalleryPoapItem = (galleryItem: GalleryPoapItemType) => {
  return <GalleryItem {...galleryItem} />;
};
