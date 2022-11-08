import { BigNumber } from 'ethers';

export const ExpressSBT_config = {
  Approver: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
  sbt_levels: [BigNumber.from(2), BigNumber.from(4), BigNumber.from(6)],
};

export const MergeParty_config = {
  goerli: {
    merkleRoot:
      '0x3bc418e849fb00b3ba1c688b150aa5a4ef7492bc6106436f936e9eee4e57fc6e',
    baseUri: 'https://example.com',
  },
  optimism: {
    merkleRoot:
      '0x6b7291ed04b90e6b96bc3fce1b7be5cd5bd07297d4be98a397d19e7796048474',
    baseUri: 'ipfs://QmP4nnhyxXa5aqEUPP2r8gE4PCn6oSxBpch7yNnu379FsV',
  },
};
