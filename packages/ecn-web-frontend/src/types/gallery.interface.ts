export type EventItem = {
  startTime: number;
  endTime: number;
  status: "coming soon" | "ongoing" | null;
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
  tokenType: "ERC1155" | "ERC721";
  tokenId: string;
} & EventItem;

export type NFTItem = {
  typeName: "nft";
  contractAddress: string;
} & BaseItem;

export type PoapItem = {
  typeName: "poap";
  eventId: number;
} & BaseItem;

export type SBTItem = {
  typeName: "sbt";
  // eventId: number;
  artworks: string[];
  contractAddress: string;
  SBTLevel: number[];
  currentLevel: number;
  currentIndex: number;
} & BaseItem;
export type GalleryServerItem = NFTItem | PoapItem | SBTItem;
