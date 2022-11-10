import type { GalleryNFTItemType } from "@/state/gallery/types";
import { useHasNFT } from "@/state/nft/hooks";

import { GalleryItem } from "./GalleryItem";

export const GalleryNFTItem = (galleryItem: GalleryNFTItemType) => {
  const { contractReadObj } = galleryItem;
  // console.log("nft contract read obj", contractReadObj);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { hasNFT } = useHasNFT({
    contractReadObj,
  });
  // console.log("nft data", data);
  const { id, typeName } = galleryItem;
  return (
    <GalleryItem
      isOwnIt={hasNFT}
      linkTo={`/${typeName}/${id}/1`}
      {...galleryItem}
    />
  );
};
