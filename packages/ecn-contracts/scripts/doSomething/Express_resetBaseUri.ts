import hre from 'hardhat';

const resetBaseUri = async (expressAddress: string, newBaseUri: string) => {
  const singer = (await hre.ethers.getSigners())[0];
  const expressFactory = await hre.ethers.getContractFactory('ExpressSBT');
  const express = expressFactory.attach(expressAddress);

  await express.connect(singer).setBaseUri(newBaseUri);
};

(async () => {
  resetBaseUri(
    '0x0F10Ccd29a52A2A99e8D70EF451dF46F0cCD6A28',
    'https://icloud.mypinata.cloud/ipfs/QmY7rRhGgt9Ur13552BhY7Fv3yHrFBRCeMy96LgU6JwHpN/'
  );
})();
