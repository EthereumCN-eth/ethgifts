import type { useContractRead } from "wagmi";

export type Tag = {
  label: string;
  variant: string;
};

export type BaseItemType = {
  homeTags: Tag[];
  detailTags: Tag[];
  itemText: string[] | null;
  imgSrc: string;
  imgAlt: string;
  title: string;
  desc: string;
  btnTxt: string;
  id: number;
  key: string;
  status: "coming soon" | "ongoing" | null;
  chainId: number;
  // imageLinks: string[] | null;
};

export type GallerySBTItemType = {
  typeName: "sbt";
  SBTLevel: number[];
  artworks: string[];
  currentLevel: number;
  currentIndex: number;
  contractReadObj: Parameters<typeof useContractRead>[0];
} & BaseItemType;

export type GalleryPoapItemType = {
  typeName: "poap";
  contractReadObj: Parameters<typeof useContractRead>[0];
  eventId: number;
} & BaseItemType;

export type GalleryNFTItemType = {
  typeName: "nft";
  contractReadObj: Parameters<typeof useContractRead>[0];
} & BaseItemType;

export type GalleryItemType =
  | GalleryNFTItemType
  | GalleryPoapItemType
  | GallerySBTItemType;

export type GalleryState = {
  shellItemNumber: 8;
  galleryItems: GalleryItemType[];
  loading: boolean;
  poapStatusLoading: false;
  poapEvents: number[]; // eventid
};
