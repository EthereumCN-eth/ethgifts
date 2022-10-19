import { useNFTAndSBTRead } from "@/state/gallery/hooks";
import type { GallerySBTItemType } from "@/state/gallery/types";

import { GalleryItem } from "./GalleryItem";

export const GallerySBTItem = (galleryItem: GallerySBTItemType) => {
  const { contractReadObj } = galleryItem;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data } = useNFTAndSBTRead(contractReadObj);
  // console.log("sbt data", data);
  const { id, typeName, currentIndex } = galleryItem;
  return (
    <GalleryItem
      linkTo={`/${typeName}/${id}/${currentIndex + 1}`}
      {...galleryItem}
    />
  );
};
