import type { useContractRead } from "wagmi";

export type Tag = {
  label: string;
  variant: string;
};

export type BaseItemType = {
  tags: Tag[];
  imgSrc: string;
  imgAlt: string;
  title: string;
  desc: string;
  btnTxt: string;
  id: number;
  key: string;
};

export type GallerySBTItemType = {
  typeName: "sbt";
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
