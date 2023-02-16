import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { BigNumber } from 'ethers';
import { Domain } from './types';

export const getDomain = (
  chainId: number,
  verifyingContract: string
): Domain => {
  return {
    name: 'ExpressSBT',
    version: '1',
    chainId: chainId,
    verifyingContract: verifyingContract,
  };
};

export const getMessage = (
  receiver: string,
  metadataURI: string,
  expressAmount: number
) => {
  return {
    receiver: receiver,
    metadataURI: metadataURI,
    expressAmount: BigNumber.from(expressAmount),
  };
};
