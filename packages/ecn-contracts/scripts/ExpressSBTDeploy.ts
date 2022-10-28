import { BigNumber } from 'ethers';
import hre from 'hardhat';

(async () => {
  // ESBT contract
  console.log('deploying ESBT contract ... ');
  const ESBT_Factory = await hre.ethers.getContractFactory('ExpressSBT');
  const ESBT = await ESBT_Factory.deploy(
    '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
    [BigNumber.from(3), BigNumber.from(6), BigNumber.from(20)]
  );

  await ESBT.deployed();
  console.log('ESBT address: ', ESBT.address);
})();
