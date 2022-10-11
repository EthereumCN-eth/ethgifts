import type { GalleryItemType } from "@/state/gallery/types";

import { GalleryItem } from "./GalleryItem";

export const GalleryPoapItem = (galleryItem: GalleryItemType) => {
  return <GalleryItem {...galleryItem} />;
};
