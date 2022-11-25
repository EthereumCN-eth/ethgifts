import { useAccount } from "wagmi";

import { useReadClaimedSelectedLevel } from "@/hooks/useReadClaimedLevel";
import type { GallerySBTItemType } from "@/state/gallery/types";

import { GalleryItem } from "./GalleryItem";

export const GallerySBTItem = (galleryItem: GallerySBTItemType) => {
  const { id, typeName, contractAddress, chainId } = galleryItem;
  const { address } = useAccount();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const isclaimed = useReadClaimedSelectedLevel({
    chainId,
    contractAddress,
    connectedAddress: address,
    currentLevelNumber: 1,
  });
  // console.log("sbt currentIndex, isclaimed", currentIndex, isclaimed);
  return (
    <GalleryItem
      isOwnIt={isclaimed}
      linkTo={`/${typeName}/${id}/${1}`}
      {...galleryItem}
    />
  );
};
