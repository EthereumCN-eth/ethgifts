import { getDidFromEthAddress, jwkConv } from './utils';

export const generateDoc = ({
  issuer_ethAddr,
  recipient_ethAddr,
  ethContractData: { name, version, chainId, verifyingContract },
  ethContractMessageSignData,
  ethContractMessage: { expressAmount, receiver, metadataURI },
}: {
  issuer_ethAddr: string;
  recipient_ethAddr: string;
  ethContractData: {
    name: string;
    version: string;
    chainId: number;
    verifyingContract: string;
  };
  ethContractMessage: {
    expressAmount: number;
    receiver: string;
    metadataURI: string;
  };
  ethContractMessageSignData: string;
}) => {
  const issuerDid = getDidFromEthAddress(issuer_ethAddr);
  const recipientDid = getDidFromEthAddress(recipient_ethAddr);
  const credential = {
    '@context': [
      'https://www.w3.org/2018/credentials/v1',
      //
    ],
    issuer: issuerDid,

    type: ['VerifiableCredential'],
    credentialSubject: {
      id: recipientDid,
      '@context': {
        ethContractMessageSignData: 'https://schema.org/identifier',
      },
      ethContractMessage: {
        metadataURI,
        expressAmount,
        receiver,
        '@context': {
          '@type': 'https://schema.org/CreativeWork',
          expressAmount: 'https://schema.org/creditText',
          receiver: 'https://schema.org/author',
          metadataURI: 'https://schema.org/archivedAt',
        },

        //
      },
      ethContractMessageSignData,
      ethContract: {
        '@context': {
          '@type': 'https://schema.org/CreativeWork',
          name: 'https://schema.org/name',
          version: 'https://schema.org/version',
          chainId: 'https://schema.org/genre',
          verifyingContract: 'https://schema.org/contentLocation',
        },
        name,
        version,
        chainId,
        verifyingContract,
      },
    },
    issuanceDate: new Date().toISOString(),
  };
  return credential;
};

export const generateProofOptions = ({
  issuer_ethAddr,
}: {
  issuer_ethAddr: string;
}) => {
  const issuerDid = getDidFromEthAddress(issuer_ethAddr);
  const proofOptions = {
    verificationMethod: issuerDid + '#Recovery2020',
    proofPurpose: 'assertionMethod',
    eip712Domain: {
      primaryType: 'VerifiableCredential',
      domain: {
        name: 'ECN SBT Issuance Verifiable Credential',
      },
      messageSchema: {
        EIP712Domain: [{ name: 'name', type: 'string' }],
        VerifiableCredential: [
          { name: '@context', type: 'string[]' },
          // { name: 'id', type: 'string' },
          { name: 'type', type: 'string[]' },
          { name: 'issuer', type: 'string' },
          { name: 'issuanceDate', type: 'string' },
          { name: 'credentialSubject', type: 'CredentialSubject' },
          { name: 'proof', type: 'Proof' },
        ],
        CredentialSubjectContext: [
          { name: 'ethContractMessageSignData', type: 'string' },
        ],
        CredentialSubject: [
          { name: 'id', type: 'string' },
          {
            name: '@context',
            type: 'CredentialSubjectContext',
          },
          { name: 'ethContractMessage', type: 'ETHContractMessage' },
          { name: 'ethContract', type: 'EthContract' },
          { name: 'ethContractMessageSignData', type: 'string' },
        ],
        ETHContractMessageContext: [
          { name: '@type', type: 'string' },
          { name: 'metadataURI', type: 'string' },
          { name: 'expressAmount', type: 'string' },
          { name: 'receiver', type: 'string' },
        ],
        EthContractContext: [
          { name: '@type', type: 'string' },
          { name: 'name', type: 'string' },
          { name: 'version', type: 'string' },
          { name: 'chainId', type: 'string' },
          { name: 'verifyingContract', type: 'string' },
        ],
        ETHContractMessage: [
          {
            name: '@context',
            type: 'ETHContractMessageContext',
          },
          { name: 'metadataURI', type: 'string' },
          { name: 'expressAmount', type: 'uint256' },
          { name: 'receiver', type: 'string' },
        ],
        EthContract: [
          {
            name: '@context',
            type: 'EthContractContext',
          },
          { name: 'name', type: 'string' },
          { name: 'version', type: 'string' },
          { name: 'chainId', type: 'uint256' },
          { name: 'verifyingContract', type: 'address' },
        ],
        Proof: [
          { name: '@context', type: 'string' },
          { name: 'verificationMethod', type: 'string' },
          { name: 'created', type: 'string' },
          { name: 'proofPurpose', type: 'string' },
          { name: 'type', type: 'string' },
        ],
      },
    },
  };

  return proofOptions;
};

export const generateKeyType = (prvHex: string, pubHex: string) => {
  const jwk = jwkConv(prvHex, pubHex);
  const keyType = {
    kty: 'EC',
    crv: 'secp256k1',
    alg: 'ES256K-R',
    x: jwk.x,
    y: jwk.y,
    key_ops: ['signTypedData'],
  };
  return keyType;
};
