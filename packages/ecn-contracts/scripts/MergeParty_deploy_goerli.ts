import hre from 'hardhat';
import { MERGEPARTY_NFT_MERKLEROOT, MERGEPARTY_NFT_BASEURI } from './constants';
import fs from 'fs';
import path from 'path';

const testNetDeploy = async () => {
  const MergePartyNFTFactory = await hre.ethers.getContractFactory(
    'MergeParty'
  );
  const MergePartyNFT = await MergePartyNFTFactory.deploy();

  await MergePartyNFT.deployed();

  // initialize event
  await MergePartyNFT.initializeEvent(
    MERGEPARTY_NFT_MERKLEROOT,
    MERGEPARTY_NFT_BASEURI
  );

  const deployInfo = {
    deployedMergeNFT: MergePartyNFT.address,
    initializeEvent: {
      merkleRoot:
        '0x3bc418e849fb00b3ba1c688b150aa5a4ef7492bc6106436f936e9eee4e57fc6e',
      baseURI: 'https://example.com',
    },
  };

  // save deployed info
  fs.writeFileSync(
    path.join(__dirname, '../deployedContract/MergeContract_goerli.json'),
    JSON.stringify(deployInfo)
  );

  console.log(`MergeNFT deployed: ${MergePartyNFT.address}`);
  console.log(`initialize event:
  { MerkleRoot: ${MERGEPARTY_NFT_MERKLEROOT},
    BaseURI: ${MERGEPARTY_NFT_BASEURI}
  }`);
};

(async () => {
  testNetDeploy();
})();
