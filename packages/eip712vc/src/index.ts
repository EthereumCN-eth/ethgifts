import 'dotenv/config';
import {
  completeIssueCredential,
  prepareIssueCredential,
} from '@spruceid/didkit-wasm-node';
import { Wallet } from 'ethers';
import { generateDoc, generateKeyType, generateProofOptions } from './parts';

import { signTypedData, SignTypedDataVersion } from '@metamask/eth-sig-util';

// const privateKey = process.env.PRIVATE_KEY || '';

// console.log(privateKey);

// console.log(signingkey);
// const publicKey = signingkey.publicKey;

export const signVC = async ({
  issuer_privatekey,
  issuer_publickey,
  issuer_ethAddr,
  recipient_ethAddr,
  ethContractMessageSignData,
  ethContractData: {
    chainId: ethContractData_chainId,
    name: ethContractData_name,
    verifyingContract: ethContractData_verifyContract,
    version: ethContractData_version,
  },
  ethContractMessage: {
    expressAmount: ethContractMessage_expressAmount,
    metadataURI: ethContractMessage_metadataURI,
    receiver: ethContractMessage_receiver,
  },
}: {
  issuer_privatekey: string;
  issuer_publickey: string;
  issuer_ethAddr: string;
  recipient_ethAddr: string;
  ethContractMessageSignData: string;
  ethContractData: {
    chainId: number;
    name: string;
    verifyingContract: string;
    version: string;
  };
  ethContractMessage: {
    expressAmount: number;
    metadataURI: string;
    receiver: string;
  };
}) => {
  const credential = generateDoc({
    issuer_ethAddr,
    recipient_ethAddr,
    ethContractMessageSignData,
    ethContractData: {
      chainId: ethContractData_chainId,
      name: ethContractData_name,
      verifyingContract: ethContractData_verifyContract,
      version: ethContractData_version,
    },
    ethContractMessage: {
      expressAmount: ethContractMessage_expressAmount,
      metadataURI: ethContractMessage_metadataURI,
      receiver: ethContractMessage_receiver,
    },
  });

  const proofOptions = generateProofOptions({
    issuer_ethAddr,
  });

  const keyType = generateKeyType(issuer_privatekey, issuer_publickey);

  // console.log('kt', keyType);

  const credStr = JSON.stringify(credential);
  const prepStr = await prepareIssueCredential(
    credStr,
    JSON.stringify(proofOptions),
    JSON.stringify(keyType)
  );

  const preparation = JSON.parse(prepStr);
  const typedData = preparation.signingInput;
  if (!typedData || !typedData.primaryType) {
    throw new Error('Expected EIP-712 TypedData');
  }
  // console.log('typedData:', JSON.stringify(typedData, null, 2));

  // console.log('------------------------------');

  const signature = signTypedData({
    privateKey: Buffer.from(issuer_privatekey, 'hex'),
    data: typedData,
    version: SignTypedDataVersion.V4,
  });

  // console.log('sign: ', signature);

  const res = await completeIssueCredential(credStr, prepStr, signature);

  return res;

  // console.log('res:', JSON.stringify(JSON.parse(res), null, 2));
};

export const signTicket_ethers = async ({
  domain,
  types = {
    mintExpress: [
      { name: 'receiver', type: 'address' },
      { name: 'metadataURI', type: 'string' },
      { name: 'expressAmount', type: 'uint256' },
    ],
  },
  message,
  issuer_privatekey,
}: {
  domain: {
    name: string;
    version: string;
    chainId: number;
    verifyingContract: string;
  };
  types?: {
    mintExpress: {
      name: string;
      type: string;
    }[];
  };
  message: {
    receiver: string;
    metadataURI: string;
    expressAmount: number;
  };
  issuer_privatekey: string;
}) => {
  const wallet = new Wallet(issuer_privatekey);
  // const signingkey = wallet._signingKey();
  const ticketSignature = await wallet._signTypedData(domain, types, message);
  return ticketSignature;
};

export const signTicket = async ({
  domain,
  types = {
    mintExpress: [
      { name: 'receiver', type: 'address' },
      { name: 'metadataURI', type: 'string' },
      { name: 'expressAmount', type: 'uint256' },
    ],
  },
  message,
  issuer_privatekey,
}: {
  domain: {
    name: string;
    version: string;
    chainId: number;
    verifyingContract: string;
  };
  types?: {
    mintExpress: {
      name: string;
      type: string;
    }[];
  };
  message: {
    receiver: string;
    metadataURI: string;
    expressAmount: number;
  };
  issuer_privatekey: string;
}) => {
  // const wallet = new Wallet(privateKey);
  // const signingkey = wallet._signingKey();
  const ticketSignature = await signTypedData({
    privateKey: Buffer.from(issuer_privatekey, 'hex'),
    version: SignTypedDataVersion.V4,
    data: {
      types: {
        EIP712Domain: [
          { name: 'name', type: 'string' },
          { name: 'version', type: 'string' },
          { name: 'chainId', type: 'uint256' },
          { name: 'verifyingContract', type: 'address' },
        ],
        mintExpress: [
          { name: 'receiver', type: 'address' },
          { name: 'metadataURI', type: 'string' },
          { name: 'expressAmount', type: 'uint256' },
        ],
      },
      primaryType: 'mintExpress',
      domain,
      message,
    },
  });
  return ticketSignature;
};

export const signTicketAndVC = async ({
  issuer_privatekey,
  issuer_publickey,
  issuer_ethAddr,
  recipient_ethAddr,
  ethContractData,
  ethContractMessage,
}: {
  issuer_privatekey: string;
  issuer_publickey: string;
  issuer_ethAddr: string;
  recipient_ethAddr: string;
  ethContractData: {
    chainId: number;
    name: string;
    verifyingContract: string;
    version: string;
  };
  ethContractMessage: {
    expressAmount: number;
    metadataURI: string;
    receiver: string;
  };
}) => {
  const ticketSignData = await signTicket({
    message: ethContractMessage,
    domain: ethContractData,
    types: {
      mintExpress: [
        { name: 'receiver', type: 'address' },
        { name: 'metadataURI', type: 'string' },
        { name: 'expressAmount', type: 'uint256' },
      ],
    },
    issuer_privatekey,
  });

  const vc = await signVC({
    issuer_privatekey,
    issuer_publickey,
    issuer_ethAddr,
    recipient_ethAddr,
    ethContractData,
    ethContractMessage,
    ethContractMessageSignData: ticketSignData,
  });
  return {
    ticketSignData,
    vc,
  };
};
