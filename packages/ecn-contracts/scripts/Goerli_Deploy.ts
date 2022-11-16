import { BigNumber } from 'ethers';
import hre from 'hardhat';

export const MergeParty_goerli = async (
  MergeNFT_merkleRoot: string,
  MergeNFT_baseUri: string
) => {
  const MergePartyNFTFactory = await hre.ethers.getContractFactory(
    'MergeParty'
  );
  const MergePartyNFT = await MergePartyNFTFactory.deploy();

  await MergePartyNFT.deployed();
  console.log(`MergeNFT deployed: ${MergePartyNFT.address}`);

  // initialize event
  await MergePartyNFT.initializeEvent(MergeNFT_merkleRoot, MergeNFT_baseUri);
  console.log(`initialize event:
  { MerkleRoot: ${MergeNFT_merkleRoot},
    BaseURI: ${MergeNFT_baseUri}
  }`);
};

export const ECNAnniversary_4_goerli = async (
  Anni4_merkleRoot: string,
  Anni4_baseUri: string
) => {
  const Anniversary4Factory = await hre.ethers.getContractFactory(
    'ECN4Anniversary'
  );
  const Anniversary = await Anniversary4Factory.deploy();

  await Anniversary.deployed();
  console.log('4 Anniversary address: ', Anniversary.address);

  // initialize event
  await Anniversary.initializeEvent(Anni4_merkleRoot, Anni4_baseUri);
  console.log(`initialize event:
  { MerkleRoot: ${Anni4_merkleRoot},
    BaseURI: ${Anni4_baseUri}
  }`);
};

export const ExpressSBT_goerli = async (
  Approver: string,
  levels: BigNumber[]
) => {
  const ESBT_Factory = await hre.ethers.getContractFactory('ExpressSBT');
  const ESBT = await ESBT_Factory.deploy(Approver, levels);

  await ESBT.deployed();
  console.log('ESBT address: ', ESBT.address);
};