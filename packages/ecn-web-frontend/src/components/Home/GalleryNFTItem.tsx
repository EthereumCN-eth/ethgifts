import { useNFTRead } from "@/state/gallery/hooks";
import type { GalleryNFTItemType } from "@/state/gallery/types";

import { GalleryItem } from "./GalleryItem";

export const GalleryNFTItem = (galleryItem: GalleryNFTItemType) => {
  const { contractReadObj } = galleryItem;
  // console.log("nft contract read obj", contractReadObj);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data } = useNFTRead(contractReadObj);
  // console.log("nft data", data);
  const { id, typeName } = galleryItem;
  return <GalleryItem linkTo={`/${typeName}/${id}/1`} {...galleryItem} />;
};
