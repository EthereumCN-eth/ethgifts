type EventItem = {
  startTime: number;
  endTime: number;
  status: string;
};

type BaseItem = {
  typeName: string;
  tokenName: string;
  imgaeLinks: string[];
  videoLinks: string[];
  chainId: number;
  tags: string[];
} & EventItem;

export type NFTItem = {
  contractAddress: string;
} & BaseItem;

export type PoapItem = {
  eventId: number;
} & BaseItem;

export type SBTItem = {
  SBTLevel: number[];
} & BaseItem;
