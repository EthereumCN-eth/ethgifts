import { BigNumber } from 'ethers';
import hre from 'hardhat';

export const MergeParty_optimism = async () => {
  const MergePartyNFTFactory = await hre.ethers.getContractFactory(
    'MergeParty'
  );
  const MergePartyNFT = await MergePartyNFTFactory.deploy();

  await MergePartyNFT.deployed();
  console.log(`MergeNFT deployed: ${MergePartyNFT.address}`);
  return MergePartyNFT.address;
};

export const ExpressSBT_optimism = async (
  Approver: string,
  levels: BigNumber[]
) => {
  const ESBT_Factory = await hre.ethers.getContractFactory('ExpressSBT');
  const ESBT = await ESBT_Factory.deploy(Approver, levels);

  await ESBT.deployed();
  console.log('ESBT address: ', ESBT.address);
  return ESBT.address;
};

export const ECNAnniversary_4_optimism = async (baseUri: string) => {
  const Anniversary4Factory = await hre.ethers.getContractFactory(
    'ECN4thAnniversary'
  );
  const Anniversary = await Anniversary4Factory.deploy(baseUri);

  await Anniversary.deployed();
  console.log('Anniversary 4 address: ', Anniversary.address);
  return Anniversary.address;
};
