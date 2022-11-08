import hre from 'hardhat';
import { MergeParty_config } from './config';

const mainNetDeploy = async () => {
  const MergePartyNFTFactory = await hre.ethers.getContractFactory(
    'MergeParty'
  );
  const MergePartyNFT = await MergePartyNFTFactory.deploy();

  await MergePartyNFT.deployed();

  // initialize event
  // await MergePartyNFT.initializeEvent(
  //   MergeParty_config.optimism.merkleRoot,
  //   MergeParty_config.optimism.baseUri
  // );

  console.log(`MergeNFT deployed: ${MergePartyNFT.address}`);
};

(async () => {
  mainNetDeploy();
})();
