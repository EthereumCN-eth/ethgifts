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
  // wordart
  wordArt?: {
    script: string;
    src: string;
  };
  deliveryText: {
    beforeText: string;
    toClaimText: string;
    hasClaimedText: string;
    noClaimedText: string;
    endedNoText: string;
  };
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
  onShelf: boolean;
  //  Prisma.JsonValue;
};

export type GallerySBTItemType = {
  typeName: "sbt";
  SBTLevel: number[];
  artworks: string[];

  contractReadObj: Parameters<typeof useContractRead>[0];
  // static parsed obj; not working if switch network or account; legacy pitfall
  contractAddress: string;
  issuerAddress: string;
} & BaseItemType;

export type GalleryPoapItemType = {
  typeName: "poap";
  // static parsed obj; not working if switch network or account; legacy pitfall
  contractReadObj: Parameters<typeof useContractRead>[0];
  eventId: number;
} & BaseItemType;

export type GalleryNFTItemType = {
  typeName: "nft";
  // static parsed obj; not working if switch network or account;legacy pitfall
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
