export type VCType = {
  credentialSubject?: {
    ethContractMessageSignData?: string;
    id?: string;
    ethContractMessage?: {
      expressAmount?: number;
      metadataURI?: string;
      receiver?: string;
    };
  };
  issuer?: string;
  issuanceDate?: string;
  type?: string[];
};
