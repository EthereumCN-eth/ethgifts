import {
  recoverTypedSignature,
  SignTypedDataVersion,
} from '@metamask/eth-sig-util';

export const verifyTicket = ({
  ticketSignedData,
  domainData,
  messageData,
  expectedVerifyPubKey,
}: {
  expectedVerifyPubKey: string;
  ticketSignedData: string;
  domainData: {
    name: string;
    version: string;
    chainId: number;
    verifyingContract: string;
  };
  messageData: {
    receiver: string;
    metadataURI: string;
    expressAmount: number;
  };
}) => {
  const pubkey = recoverTypedSignature({
    signature: ticketSignedData,
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
      domain: domainData,
      message: messageData,
    },
  });
  return pubkey.toLowerCase() === expectedVerifyPubKey.toLowerCase();
};
