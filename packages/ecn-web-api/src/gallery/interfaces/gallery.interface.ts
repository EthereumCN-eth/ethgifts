import { Prisma, NFTDeliveryData, MainViewType } from '@prisma/client';

export type EventItem = {
  startTime: number;
  endTime: number;
  status: 'coming soon' | 'ongoing' | null;
};

export const STATUS_COMP_VAL = {
  ongoing: 2,
  'coming soon': 1,
  null: 0,
};

export type BaseItem = {
  itemText: string[] | null;
  coverLink: string;
  imageLinks: string[] | null;
  videoLinks: string[] | null;
  chainId: number;
  tags: string[];
  id: number;
  name: string;
  onShelf: boolean;
  tokenType: 'ERC1155' | 'ERC721';
  tokenId: string;
  infoDetail: Prisma.JsonValue;
  mainViewType: MainViewType;
} & EventItem;

export type NFTItem = {
  typeName: 'nft';
  contractAddress: string;
  nftAppType: 'PERSENT' | 'DELIVERY';
  nftDeliveryData: NFTDeliveryData | null;
} & BaseItem;

export type PoapItem = {
  typeName: 'poap';
  eventId: number;
} & BaseItem;

export type SBTItem = {
  typeName: 'sbt';
  // eventId: number;
  artworks: string[];
  contractAddress: string;
  SBTLevel: number[];
  issuerAddress: string;
} & BaseItem;

export type GalleryItem = NFTItem | PoapItem | SBTItem;
