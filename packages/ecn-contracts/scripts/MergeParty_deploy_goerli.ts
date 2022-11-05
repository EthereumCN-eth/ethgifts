import hre from 'hardhat';
import { MERGEPARTY_NFT_MERKLEROOT, MERGEPARTY_NFT_BASEURI } from './constants';
import fs from 'fs';
import path from 'path';

const testNetDeploy = async () => {
  const MergePartyNFTFactory = await hre.ethers.getContractFactory(
    'MergePartyNFT'
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
    path.join(__dirname, '../deployedContract/MergeContract_goerli.json'),
    JSON.stringify(deployInfo)
  );

  console.log(`MergeNFT deployed: ${MergePartyNFT.address}`);
  // console.log(`initialize event:
  // { MerkleRoot: ${MERGEPARTY_NFT_MERKLEROOT},
  //   BaseURI: ${MERGEPARTY_NFT_BASEURI}
  // }`);
};

(async () => {
  testNetDeploy();
})();

export const mainNetDeploy = async () => {
  const MergePartyNFTFactory = await hre.ethers.getContractFactory(
    'MergePartyNFT'
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
    path.join(__dirname, '../deployedContract/MergeContract_mainnet.json'),
    JSON.stringify(deployInfo)
  );

  console.log(`MergeNFT deployed: ${MergePartyNFT.address}`);
};
