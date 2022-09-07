import { BigNumber } from '@ethersproject/bignumber';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from 'chai';
import hre from 'hardhat';
import { ExpressSBT } from '../typechain';

let deployer: SignerWithAddress;
let user1: SignerWithAddress;
let user2: SignerWithAddress;
let user3: SignerWithAddress;
let approver: SignerWithAddress;

let ESBT: ExpressSBT;

let types = {
  mintExpress: [
    { name: 'receiver', type: 'address' },
    { name: 'metadataURI', type: 'string' },
    { name: 'expressAmount', type: 'uint256' },
  ],
};

let domain = {
  name: 'ExpressSBT',
  version: '1',
  chainId: 0,
  verifyingContract: '',
};

let message = {
  receiver: '',
  metadataURI: '',
  expressAmount: 0,
};

beforeEach('initialize contracts', async () => {
  [deployer, user1, user2, user3, approver] = await hre.ethers.getSigners();

  // ESBT logic contract
  const ESBTLogicFactory = await hre.ethers.getContractFactory('ExpressSBT');
  ESBT = await ESBTLogicFactory.deploy(approver.address, [
    BigNumber.from(20),
    BigNumber.from(100),
    BigNumber.from(300),
  ]);

  await ESBT.deployed();

  // fill out the domain of typeData
  domain.chainId = hre.config.networks.hardhat.chainId;
  domain.verifyingContract = ESBT.address;
});

// todo: 1. if account's express counters reach out a higher level, but only minted the lower level SBT, check if the func can mint all level SBT
// todo: 2. mint level 1,2,3 to account
// todo: 3. keep 3 level signature and mint it at the same time

describe('initial check', () => {
  it('check initial setting', async () => {
    expect(await ESBT.connect(user2).approver()).to.equal(approver.address);
  });
});

describe('simple mint 3 level SBT', () => {
  it('check status after mint', async () => {
    // fill out the message of typedData
    message.receiver = user1.address;
    message.metadataURI = 'https://example';
    message.expressAmount = 20;

    // generate signature
    let signature = await approver._signTypedData(domain, types, message);

    // mint SBT
    await expect(
      ESBT.mintExpress(
        message.receiver,
        message.metadataURI,
        message.expressAmount,
        signature
      )
    ).to.emit(ESBT, 'ESBTMinted');

    // balance = 1
    expect(await ESBT.balanceOf(user1.address)).to.equal(1);

    // totalSupply = 1
    expect(await ESBT.totalSupply()).to.equal(1);

    // check minted tokenId = 0
    expect(await ESBT.tokenOfOwnerByIndex(user1.address, 0)).to.equal(0);

    // check minted tokenId belong to level 1
    ESBT.tokenOfOwnerByIndex(user1.address, 0).then(async (tokenId) => {
      expect(await ESBT.tokenLevel(tokenId)).to.equal(1);
    });
  });

  it('mint: mint all levels in order', async () => {
    // fill out the message of typedData
    message.receiver = user1.address;
    message.metadataURI = 'https://example.com';
    message.expressAmount = 20;

    // mint the level 1
    let signature1 = await approver._signTypedData(domain, types, message);

    // mint SBT
    await ESBT.mintExpress(
      message.receiver,
      message.metadataURI,
      message.expressAmount,
      signature1
    );

    // mint the level 2
    message.expressAmount = 100;
    let signature2 = await approver._signTypedData(domain, types, message);
    await ESBT.mintExpress(
      message.receiver,
      message.metadataURI,
      message.expressAmount,
      signature2
    );

    expect(await ESBT.balanceOf(user1.address)).to.equal(2);

    let levels = await ESBT.currentLevels(user1.address);
    expect(levels.toString()).to.equal('1,2');

    // mint the level 3
    message.expressAmount = 300;
    let signature3 = await approver._signTypedData(domain, types, message);
    await ESBT.mintExpress(
      message.receiver,
      message.metadataURI,
      message.expressAmount,
      signature3
    );

    expect(await ESBT.balanceOf(user1.address)).to.equal(3);

    let alllevels = await ESBT.currentLevels(user1.address);
    expect(alllevels.toString()).to.equal('1,2,3');
  });

  it('mint: mint level 3, and then mint level 2, at last mint level 1', async () => {
    // fill level 3
    message.receiver = user1.address;
    message.metadataURI = 'https://example.com';
    message.expressAmount = 300;

    let signature3 = await approver._signTypedData(domain, types, message);
    await ESBT.mintExpress(
      message.receiver,
      message.metadataURI,
      message.expressAmount,
      signature3
    );

    expect(await ESBT.tokenLevel(BigNumber.from(0))).to.equal(3);

    // mint level 2
    message.expressAmount = 100;
    let signature2 = await approver._signTypedData(domain, types, message);
    await ESBT.mintExpress(
      message.receiver,
      message.metadataURI,
      message.expressAmount,
      signature2
    );

    expect(await ESBT.tokenLevel(BigNumber.from(1))).to.equal(2);

    // mint level 1
    message.expressAmount = 20;
    let signature1 = await approver._signTypedData(domain, types, message);
    await ESBT.mintExpress(
      message.receiver,
      message.metadataURI,
      message.expressAmount,
      signature1
    );

    expect(await ESBT.tokenLevel(BigNumber.from(2))).to.equal(1);
  });

  it('mint: mint arbitrary level SBT after another account mint', async () => {
    // mint level 3 with user1
    message.receiver = user1.address;
    message.metadataURI = 'https://example.com';
    message.expressAmount = 300;

    let signature3 = await approver._signTypedData(domain, types, message);
    await ESBT.connect(user1).mintExpress(
      message.receiver,
      message.metadataURI,
      message.expressAmount,
      signature3
    );

    expect(await ESBT.tokenLevel(BigNumber.from(0))).to.equal(3);

    // mint level 2 with user2
    message.receiver = user2.address;
    message.metadataURI = 'https://example.com';
    message.expressAmount = 100;

    let signature2 = await approver._signTypedData(domain, types, message);
    await ESBT.connect(user2).mintExpress(
      message.receiver,
      message.metadataURI,
      message.expressAmount,
      signature2
    );

    expect(await ESBT.tokenLevel(BigNumber.from(1))).to.equal(2);

    // mint level 1 with user1
    message.receiver = user1.address;
    message.metadataURI = 'https://example.com';
    message.expressAmount = 20;

    let signature1 = await approver._signTypedData(domain, types, message);
    await ESBT.connect(user1).mintExpress(
      message.receiver,
      message.metadataURI,
      message.expressAmount,
      signature1
    );

    expect(await ESBT.tokenLevel(BigNumber.from(2))).to.equal(1);
  });
  it('mint: mint level 1, level 3, and then mint level 2 with level 2 signature', async () => {
    // mint level 1
    message.receiver = user1.address;
    message.metadataURI = 'https://example.com';
    message.expressAmount = 20;

    let signature1 = await approver._signTypedData(domain, types, message);
    await ESBT.connect(user1).mintExpress(
      message.receiver,
      message.metadataURI,
      message.expressAmount,
      signature1
    );

    // mint level 3
    message.expressAmount = 300;
    let signature3 = await approver._signTypedData(domain, types, message);
    await ESBT.connect(user1).mintExpress(
      message.receiver,
      message.metadataURI,
      message.expressAmount,
      signature3
    );

    // mint level 2
    message.expressAmount = 100;
    let signature2 = await approver._signTypedData(domain, types, message);
    await ESBT.connect(user1).mintExpress(
      message.receiver,
      message.metadataURI,
      message.expressAmount,
      signature2
    );

    expect(await ESBT.tokenLevel(BigNumber.from(2))).to.equal(2);
    expect(await ESBT.totalSupply()).to.equal(3);
  });

  it('revert: not enough express counters to mint SBT level', async () => {
    // fill out message
    message.receiver = user1.address;
    message.metadataURI = 'https://example.com';
    message.expressAmount = 10;

    // generate signature
    let signature = await approver._signTypedData(domain, types, message);

    // mint SBT
    await expect(
      ESBT.connect(user1).mintExpress(
        message.receiver,
        message.metadataURI,
        message.expressAmount,
        signature
      )
    ).to.revertedWith(
      'you are not available to mint, or you have minted all level SBT'
    );
  });

  it('revert: mint the same level at twice', async () => {
    // fill out message
    message.receiver = user1.address;
    message.metadataURI = 'https://example.com';
    message.expressAmount = 20;

    // generate signature
    let signature = await approver._signTypedData(domain, types, message);

    // mint first SBT
    await ESBT.mintExpress(
      message.receiver,
      message.metadataURI,
      message.expressAmount,
      signature
    );

    // mint second SBT of the same level will be reverted
    message.expressAmount = 30;
    let signature2 = await approver._signTypedData(domain, types, message);

    await expect(
      ESBT.mintExpress(
        message.receiver,
        message.metadataURI,
        message.expressAmount,
        signature2
      )
    ).to.revertedWith('you have minted this level');
  });

  it('revert: mint level 1, 3, then mint level 3 again', async () => {
    // mint level 1
    message.receiver = user1.address;
    message.metadataURI = 'https://example.com';
    message.expressAmount = 20;

    let signature1 = await approver._signTypedData(domain, types, message);
    await ESBT.connect(user1).mintExpress(
      message.receiver,
      message.metadataURI,
      message.expressAmount,
      signature1
    );

    // mint level 3
    message.expressAmount = 300;
    let signature3 = await approver._signTypedData(domain, types, message);
    await ESBT.connect(user1).mintExpress(
      message.receiver,
      message.metadataURI,
      message.expressAmount,
      signature3
    );

    // mint level 3 agian will revert
    message.expressAmount = 300;
    let signature33 = await approver._signTypedData(domain, types, message);
    await expect(
      ESBT.connect(user1).mintExpress(
        message.receiver,
        message.metadataURI,
        message.expressAmount,
        signature33
      )
    ).revertedWith('you have minted this level');
  });
});

describe('admin functions', () => {
  it('add more level and then mint the latest level SBT', async () => {
    await ESBT.connect(deployer).addLevel(400);

    // fill out message
    message.receiver = user1.address;
    message.metadataURI = 'https://example.com';
    message.expressAmount = 410;

    // generate signature
    let signature = await approver._signTypedData(domain, types, message);

    // mint first SBT
    await ESBT.mintExpress(
      message.receiver,
      message.metadataURI,
      message.expressAmount,
      signature
    );

    expect(await ESBT.balanceOf(user1.address)).to.equal(1);
    await ESBT.currentLevels(user1.address).then((levels) => {
      expect(levels.toString()).to.equal('4');
    });
  });
});
