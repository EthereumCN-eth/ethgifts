import { BigNumber } from 'ethers';
import hre from 'hardhat';

(async () => {
  // ESBT contract
  const ESBTLogicFactory = await hre.ethers.getContractFactory('ExpressSBT');
  const ESBT = await ESBTLogicFactory.deploy(
    '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
    [BigNumber.from(3), BigNumber.from(6), BigNumber.from(9)]
  );

  await ESBT.deployed();
  console.log('ESBT address: ', ESBT.address);
})();
