export type VCType = {
  credentialSubject: {
    id: string;
    ethContractMessage: {
      expressAmount: number;
      metadataURI: string;
    };
  };
  issuer: string;
  issuanceDate: string;
  type: string[];
};
