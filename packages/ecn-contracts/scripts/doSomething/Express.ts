import hre from 'hardhat';
import { getDomain, getMessage } from '../../test/utils';
import { types } from '../../test/types';

const initialContract = async (expressAddress: string) => {
  const expressFactory = await hre.ethers.getContractFactory('ExpressSBT');
  const express = expressFactory.attach(expressAddress);

  return express;
};

const mintSingleNFT = async (expressAddress: string, expressAmount: number) => {
  const signer = (await hre.ethers.getSigners())[0];
  const express = await initialContract(expressAddress);

  const domain = getDomain(5, expressAddress);
  const message = getMessage(signer.address, 'test.com', expressAmount);
  const signature = await signer._signTypedData(domain, types, message);

  // mint
  await express.mintExpress(
    signer.address,
    'test.com',
    expressAmount,
    signature
  );
};

const mintAllNFT = async (expressAddress: string) => {
  const signer = (await hre.ethers.getSigners())[0];
  const express = await initialContract(expressAddress);

  const domain = getDomain(5, expressAddress);

  // message of 3 token
  const message1 = getMessage(signer.address, 'https://example1.com', 20);
  const message2 = getMessage(signer.address, 'https://example2.com', 100);
  const message3 = getMessage(signer.address, 'https://example3.com', 200);

  // signature of 3 token
  const signature1 = await signer._signTypedData(domain, types, message1);
  const signature2 = await signer._signTypedData(domain, types, message2);
  const signature3 = await signer._signTypedData(domain, types, message3);

  // mint 3 token
  await express.mintExpress(
    signer.address,
    'https://example1.com',
    20,
    signature1
  );
  await express.mintExpress(
    signer.address,
    'https://example2.com',
    100,
    signature2
  );
  await express.mintExpress(
    signer.address,
    'https://example3.com',
    200,
    signature3
  );
};

const changeApprover = async (expressAddress: string, newApprover: string) => {
  const signer = (await hre.ethers.getSigners())[0];
  const express = await initialContract(expressAddress);

  await express.connect(signer).updateApprover(newApprover);

  console.log('new approver: ', await express.approver());
};

const resetBaseUri = async (expressAddress: string, newBaseUri: string) => {
  const signer = (await hre.ethers.getSigners())[0];
  const express = await initialContract(expressAddress);

  await express.connect(signer).setBaseUri(newBaseUri);
};

const checkData = async (expressAddress: string, targetAddress: string) => {
  const signer = (await hre.ethers.getSigners())[0];
  const express = await initialContract(expressAddress);

  console.log('mintLevels: ', await express.mintedLevels(targetAddress));
};

(async () => {
  // await mintSingleNFT('0x017ec385E68c39313B95591F5A89cDe2CeDf417b', 200);
  // mintAllNFT('0x017ec385E68c39313B95591F5A89cDe2CeDf417b');
  // changeApprover(
  //   '0x017ec385E68c39313B95591F5A89cDe2CeDf417b',
  //   '0x57924E07d3a09977fbb3a765fcB97f10e12e98f4'
  // );
  await resetBaseUri('0x017ec385E68c39313B95591F5A89cDe2CeDf417b', 'test.com');
})();
