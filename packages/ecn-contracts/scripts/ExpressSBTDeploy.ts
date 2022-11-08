import hre from 'hardhat';
import { ExpressSBT_config } from './config';

(async () => {
  // ESBT contract
  console.log('deploying ESBT contract ... ');
  const ESBT_Factory = await hre.ethers.getContractFactory('ExpressSBT');
  const ESBT = await ESBT_Factory.deploy(
    ExpressSBT_config.Approver,
    ExpressSBT_config.sbt_levels
  );

  await ESBT.deployed();
  console.log('ESBT address: ', ESBT.address);
})();
