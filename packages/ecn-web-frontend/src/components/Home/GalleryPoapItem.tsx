import { useAccount } from "wagmi";

import type { GalleryPoapItemType } from "@/state/gallery/types";
import { useHasPoapEvent } from "@/state/poap/hooks";

import { GalleryItem } from "./GalleryItem";

export const GalleryPoapItem = (galleryItem: GalleryPoapItemType) => {
  const { id, typeName, eventId } = galleryItem;
  const { address } = useAccount();
  const { hasPoap } = useHasPoapEvent({
    eventId,
    address,
  });
  return (
    <GalleryItem
      isOwnIt={hasPoap}
      linkTo={`/${typeName}/${id}/1`}
      {...galleryItem}
      tagText={typeName}
    />
  );
};
