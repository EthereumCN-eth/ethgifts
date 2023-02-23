export const types = {
  mintExpress: [
    { name: 'receiver', type: 'address' },
    { name: 'metadataURI', type: 'string' },
    { name: 'expressAmount', type: 'uint256' },
  ],
};

export type Domain = {
  name: string;
  version: string;
  chainId: number;
  verifyingContract: string;
};
