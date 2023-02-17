import hre from 'hardhat';
import { getDomain, getMessage } from '../../test/utils';
import { types } from '../../test/types';

const mintAllNFT = async (expressAddress: string) => {
  const singer = (await hre.ethers.getSigners())[0];
  const expressFactory = await hre.ethers.getContractFactory('ExpressSBT');
  const express = expressFactory.attach(expressAddress);

  const domain = getDomain(5, expressAddress);

  // message of 3 token
  const message1 = getMessage(singer.address, 'https://example1.com', 2);
  const message2 = getMessage(singer.address, 'https://example2.com', 4);
  const message3 = getMessage(singer.address, 'https://example3.com', 6);

  // signature of 3 token
  const signature1 = await singer._signTypedData(domain, types, message1);
  const signature2 = await singer._signTypedData(domain, types, message2);
  const signature3 = await singer._signTypedData(domain, types, message3);

  // mint 3 token
  await express.mintExpress(
    singer.address,
    'https://example1.com',
    2,
    signature1
  );
  await express.mintExpress(
    singer.address,
    'https://example2.com',
    4,
    signature2
  );
  await express.mintExpress(
    singer.address,
    'https://example3.com',
    6,
    signature3
  );
};

(async () => {
  mintAllNFT('0x0F10Ccd29a52A2A99e8D70EF451dF46F0cCD6A28');
})();
