export interface MD_DATA {
  title: string;
  mdDate: string;
  messageId: string;
  rawMessage: string;
  content: string;
  url: string;
  contentType: string;
  discordName: string;
  discordId: string;
}

export interface COLLECTOR {
  [discordName: string]: {
    discordId: string;
    ethAddress: string;
  };
}
