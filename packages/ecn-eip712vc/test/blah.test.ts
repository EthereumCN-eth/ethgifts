import { Wallet } from 'ethers';
import {
  recoverTypedSignature,
  SignTypedDataVersion,
} from '@metamask/eth-sig-util';
import {
  signTicketAndVC,
  signVC,
  signTicket,
  signTicket_ethers,
} from '../src/index';
import { verifyCredential } from '@spruceid/didkit-wasm-node';

const privateKey =
  process.env.PRIVATE_KEY ||
  'ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'; // insecure private key for testing
const w = new Wallet(privateKey);
const publicKey = w.publicKey;
const address = w.address;

const domainData = {
  name: 'ExpressSBT',
  version: '1',
  chainId: 1,
  verifyingContract: '0x9bB21B9a09003F2EFF0D949259f3e195FE356400',
};

const messageData = {
  receiver: '0x03fFAbf308822b38e68D0F9ae926096117b632EF',
  metadataURI: 'https://google.ca/',
  expressAmount: 2,
};

const types = {
  mintExpress: [
    { name: 'receiver', type: 'address' },
    { name: 'metadataURI', type: 'string' },
    { name: 'expressAmount', type: 'uint256' },
  ],
};
describe('blah', () => {
  it('sign Ticket v1 ethers', async () => {
    const ticketSignedData = await signTicket_ethers({
      domain: domainData,
      message: messageData,
      issuer_privatekey: privateKey,
    });

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
    const w = new Wallet(privateKey);
    expect(pubkey.toLowerCase()).toEqual(w.address.toLowerCase());
  });

  it('sign Ticket v2', async () => {
    const ticketSignedData = await signTicket({
      domain: domainData,
      message: messageData,
      issuer_privatekey: privateKey,
    });

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
    const w = new Wallet(privateKey);
    expect(pubkey.toLowerCase()).toEqual(w.address.toLowerCase());
  });

  it('sign vc and verify', async () => {
    const ticketSignedData = await signTicket({
      domain: domainData,
      message: messageData,
      issuer_privatekey: privateKey,
    });
    const vc = await signVC({
      issuer_privatekey: privateKey,
      issuer_publickey: publicKey,
      issuer_ethAddr: address,
      recipient_ethAddr: messageData.receiver,
      ethContractMessageSignData: ticketSignedData,
      ethContractData: domainData,
      ethContractMessage: messageData,
    });

    const resstr = await verifyCredential(vc, '{}');
    const result = JSON.parse(resstr);
    expect(result).toHaveProperty('errors');
    expect(result.errors.length).toBe(0);
    // expect(verifyCredential(vc, '{}').errors).toHaveProperty('errors');
  });

  it('sign vc and if changed doc, then fail', async () => {
    const ticketSignedData = await signTicket({
      domain: domainData,
      message: messageData,
      issuer_privatekey: privateKey,
    });
    const vc = await signVC({
      issuer_privatekey: privateKey,
      issuer_publickey: publicKey,
      issuer_ethAddr: address,
      recipient_ethAddr: messageData.receiver,
      ethContractMessageSignData: ticketSignedData,
      ethContractData: domainData,
      ethContractMessage: messageData,
    });
    const modVC = JSON.parse(vc);
    modVC.credentialSubject.ethContractMessage.expressAmount = 4;
    const resstr = await verifyCredential(JSON.stringify(modVC), '{}');
    const result = JSON.parse(resstr);
    // console.log(result);
    // {
    //   checks: [ 'proof' ],
    //   warnings: [],
    //   errors: [
    //     'Key does not match account id: got 0xc58f21649d03F6913C5dA69Fac0674584D5B8528, expected 0x5273D7f80Bedba4b89A139126239362E211A2A98'
    //   ]
    // }
    expect(result).toHaveProperty('errors');
    expect(result.errors.length).toBeGreaterThan(0);
    // expect(verifyCredential(vc, '{}').errors).toHaveProperty('errors');
  });
});
