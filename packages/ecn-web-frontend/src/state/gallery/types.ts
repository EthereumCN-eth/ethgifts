import type { MainViewType, NFTDeliveryData } from "@prisma/client";
import type { useContractRead } from "wagmi";

export type Tag = {
  label: string;
  variant: string;
};

export type InfoHTMLType = {
  heading: string;
  subHeading: string;
  type: "html";
  data: string[];
};

export type InfoImageType = {
  heading: string;
  subHeading: string;
  type: "image";
  data: {
    src: string;
    alt: string;
  }[];
};

export type InfoVideoType = {
  heading: string;
  subHeading: string;
  type: "video";
  data: {
    src: string;
    type: string;
    // alt: string;
  }[];
};

export type DetailInfoType = {
  eventDescription: string;
  title: string;
  subTitle: string;
  dataSection: Array<InfoHTMLType | InfoImageType | InfoVideoType>;
} | null;

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
  imageLinks: string[] | null;
  videoLinks: string[] | null;
  infoDetail?: DetailInfoType;
  mainViewType: MainViewType;
  //  Prisma.JsonValue;
};

export type GallerySBTItemType = {
  typeName: "sbt";
  SBTLevel: number[];
  artworks: string[];
  currentLevel: number;
  currentIndex: number;
  contractReadObj: Parameters<typeof useContractRead>[0];
  contractAddress: string;
} & BaseItemType;

export type GalleryPoapItemType = {
  typeName: "poap";
  contractReadObj: Parameters<typeof useContractRead>[0];
  eventId: number;
} & BaseItemType;

export type GalleryNFTItemType = {
  typeName: "nft";
  contractAddress: string;
  nftAppType: "PERSENT" | "DELIVERY";
  nftDeliveryData: NFTDeliveryData | null;
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
