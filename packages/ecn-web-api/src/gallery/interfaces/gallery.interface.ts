export interface Item {
  [index: number]: {
    typeName: string;
    typeId: number;
    tokenName: string;
    startTime: number;
    imageLinks: string[];
    videoLinks: string[];
    status: string;
    tags: string[];
    SBTLevel: number[] | null;
    chainId: number | null;
    contractAddress: string | null;
    eventIds: number | null;
  };
}

export interface Token {
  tokenName: string;
  tokenImageLinks: string[];
  tokenVideoLinks: string[];
  chainId?: number;
  contractAddress?: string;
  sbtLevels?: number[];
  eventId?: number;
}
