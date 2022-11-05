export type VCType = {
  credentialSubject?: {
    ethContractMessageSignData?: string;
    id?: string;
    ethContractMessage?: {
      expressAmount?: number;
      metadataURI?: string;
      receiver?: string;
    };
    ethContract?: {
      chainId?: number;
      verifyingContract?: string;
      name?: string;
      version?: number;
    };
  };

  issuer?: string;
  issuanceDate?: string;
  type?: string[];
};
