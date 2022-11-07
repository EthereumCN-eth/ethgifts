import hre from 'hardhat';
import { MERGEPARTY_NFT_MERKLEROOT, MERGEPARTY_NFT_BASEURI } from './constants';
import fs from 'fs';
import path from 'path';

const mainNetDeploy = async () => {
  const MergePartyNFTFactory = await hre.ethers.getContractFactory(
    'MergeParty'
  );
  const MergePartyNFT = await MergePartyNFTFactory.deploy();

  await MergePartyNFT.deployed();

  // initialize event
  // await MergePartyNFT.initializeEvent(
  //   MERGEPARTY_NFT_MERKLEROOT,
  //   MERGEPARTY_NFT_BASEURI
  // );

  const deployInfo = {
    deployedMergeNFT: MergePartyNFT.address,
    initializeEvent: {
      merkleRoot: MERGEPARTY_NFT_MERKLEROOT,
      baseURI: MERGEPARTY_NFT_BASEURI,
    },
  };

  // save deployed info
  fs.writeFileSync(
    path.join(__dirname, '../deployedContract/MergeContract_optimism.json'),
    JSON.stringify(deployInfo)
  );

  console.log(`MergeNFT deployed: ${MergePartyNFT.address}`);
};

(async () => {
  mainNetDeploy();
})();
