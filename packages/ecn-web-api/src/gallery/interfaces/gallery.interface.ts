type EventItem = {
  startTime: number;
  endTime: number;
  status: string;
};

type BaseItem = {
  imageLinks: string[];
  videoLinks: string[];
  chainId: number;
  tags: string[];
} & EventItem;

export type NFTItem = {
  typeName: 'nft';
  contractAddress: string;
} & BaseItem;

export type PoapItem = {
  typeName: 'poap';
  eventId: number;
} & BaseItem;

export type SBTItem = {
  typeName: 'sbt';
  eventId: number;
  contractAddress: string;
  SBTLevel: number[];
} & BaseItem;

export type GalleryItem = NFTItem | PoapItem | SBTItem;
