export interface METADATA {
  name: string;
  description: string;
  issuer: string;
  expressAmount: number;
  subject: string;
  contributions: {
    [index: string]: {
      expressId: string;
      content: string;
      contentURI: string;
      verifiedDate: string;
    };
  };
}

export interface EIP712DOMAIN {
  name: string;
  version: string;
  chainId: number;
  verifyingContract: string;
}

export type TypeContributions = {
  [index: string]: {
    expressId: string;
    content: string;
    contentURI: string;
    verifiedDate: string;
  };
};

export interface SBTCONTRACT_DATA_CACHE {
  metaDataName: string;
  metaDataDescription: string;
  issuer: string;
  EIP712Domain: EIP712DOMAIN;
}
