import type { GalleryPoapItemType } from "@/state/gallery/types";

import { GalleryItem } from "./GalleryItem";

export const GalleryPoapItem = (galleryItem: GalleryPoapItemType) => {
  const { id, typeName } = galleryItem;
  return <GalleryItem linkTo={`/${typeName}/${id}`} {...galleryItem} />;
};
