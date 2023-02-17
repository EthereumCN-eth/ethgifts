import { BigNumber } from 'ethers';

export const ExpressSBT_config = {
  goerli: {
    Approver: '0x57924E07d3a09977fbb3a765fcB97f10e12e98f4',
    sbt_levels: [BigNumber.from(2), BigNumber.from(4), BigNumber.from(6)],
    initialUrl:
      'https://icloud.mypinata.cloud/ipfs/QmNSxruXP1yti2gBGHP5JXTHUMDsBfT8TSSsPViEuTyxva/',
  },
  optimism: {
    Approver: '',
    sbt_levels: [],
  },
};

export const ECNAnniversary_4_config = {
  goerli: {
    baseUri: 'https://example.com',
  },
  optimism: {
    baseUri: 'ipfs://QmW5E9D3HhCtqPZyPjdApSvRKuy8uMZDMPoe22Fy9QeQGx',
    receivers: [
      '0x0F83AE04F84D881157717021C6cE3c47F489Bbdf',
      '0x332345477Db00239f88CA2Eb015B159750Cf3C44',
      '0xf0B84d97327b4a27D7FF1eF03fe9Bb37E554628d',
      '0xc8e7e051d649CE23De5c61Df282aE185067284F3',
      '0xcd8eB3cdE3937bb031ECd09b22C8bAA578197da2',
      '0x49984cAeF0718B7aa86b3ecdef86C72F2511e593',
      '0xB4C99Be68bA92433A67824D6A99f6cd0Cb2C3707',
      '0x11aD9d68d0f3C277fE98cFD45C5BbBf0C427B8dC',
      '0x2D57C17525B5C0e942B0DEc90E2C5039e9D62b56',
      '0x00EFbA7cCF31767843565764Bd7fC070097E8201',
      '0xad91fC4931C309285519Fef7fb85FC0180E0457e',
      '0xec6A35E17005eF82fc39127E42dC13242298F542',
      '0x81F75ab8549c23f2FCBc1d09C37dF1F0b7A0CfFe',
      '0x371A37E0465f2120a6CF46f2a1271c10BD855fBF',
    ],
  },
};

export const MergeParty_config = {
  goerli: {
    merkleRoot:
      '0x3bc418e849fb00b3ba1c688b150aa5a4ef7492bc6106436f936e9eee4e57fc6e',
    baseUri: 'https://example.com',
  },
  optimism: {
    contract_address: process.env.MergePary_Contract_Address || '',
    merkleRoot:
      '0x5f40845f3514d446160913b22173f956cdeee6a15d241dc0c26f3d5709e54c00',
    baseUri: 'ipfs://QmUa6v7eRcT3ni7Swm2hcxXqnGy59Pijv5aLoQcJFUZ3a7',
  },
};
