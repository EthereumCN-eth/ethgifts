import hre from 'hardhat';
import { MergeParty_config } from './config';

const testNetDeploy = async () => {
  const MergePartyNFTFactory = await hre.ethers.getContractFactory(
    'MergeParty'
  );
  const MergePartyNFT = await MergePartyNFTFactory.deploy();

  await MergePartyNFT.deployed();

  // initialize event
  await MergePartyNFT.initializeEvent(
    MergeParty_config.goerli.merkleRoot,
    MergeParty_config.goerli.baseUri
  );

  console.log(`MergeNFT deployed: ${MergePartyNFT.address}`);
  console.log(`initialize event:
  { MerkleRoot: ${MergeParty_config.goerli.merkleRoot},
    BaseURI: ${MergeParty_config.goerli.baseUri}
  }`);
};

(async () => {
  testNetDeploy();
})();
