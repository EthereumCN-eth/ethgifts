import { useNFTAndSBTRead } from "@/state/gallery/hooks";
import type { GallerySBTItemType } from "@/state/gallery/types";

import { GalleryItem } from "./GalleryItem";

export const GallerySBTItem = (galleryItem: GallerySBTItemType) => {
  const { contractReadObj } = galleryItem;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data } = useNFTAndSBTRead(contractReadObj);
  // console.log("sbt data", data);
  return <GalleryItem {...galleryItem} />;
};
