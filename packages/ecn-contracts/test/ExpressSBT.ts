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
  ESBT = await ESBTLogicFactory.deploy(
    approver.address,
    [BigNumber.from(20), BigNumber.from(100), BigNumber.from(300)],
    'https:exmaple.com'
  );

  await ESBT.deployed();

  // fill out the domain of typeData
  domain.chainId = hre.config.networks.hardhat.chainId;
  domain.verifyingContract = ESBT.address;
});

const mintSBT = async (account: SignerWithAddress, expressAmount: number) => {
  // fill out the message of typedData
  message.receiver = account.address;
  message.metadataURI = 'https://example1.com';
  message.expressAmount = expressAmount;

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
};

describe('initial check', () => {
  it('check initial setting', async () => {
    expect(await ESBT.connect(user2).approver()).to.equal(approver.address);
  });
});

describe('simply mint 3 levels SBT', async () => {
  it('check status after mint level 0', async () => {
    await mintSBT(user1, 20);

    // balance = 1
    expect(await ESBT.balanceOf(user1.address, 0)).to.equal(1);

    // totalSupply = 1 when check level 0
    expect(await ESBT.totalSupply(0)).to.equal(1);

    // check level 0 is minted by user1
    expect(await ESBT.checkMintedLevel(user1.address, 0)).to.equal(true);
  });

  it('mint: mint all levels in order', async () => {
    // mint level 0
    await mintSBT(user1, 20);

    // mint level 1
    await mintSBT(user1, 100);

    expect(await ESBT.balanceOf(user1.address, 1)).to.equal(1);

    let levels = await ESBT.mintedLevels(user1.address);
    expect(levels.toString()).to.equal('0,1');

    // mint the level 2
    await mintSBT(user1, 300);

    expect(await ESBT.balanceOf(user1.address, 2)).to.equal(1);

    let alllevels = await ESBT.mintedLevels(user1.address);
    expect(alllevels.toString()).to.equal('0,1,2');
  });

  it('mint: mint level 2, and then mint level 1, at last mint level 0', async () => {
    // fill level 2
    await mintSBT(user1, 300);
    expect(await ESBT.checkMintedLevel(user1.address, 2)).to.equal(true);

    // mint level 1
    await mintSBT(user1, 100);
    expect(await ESBT.checkMintedLevel(user1.address, 1)).to.equal(true);

    // mint level 0
    await mintSBT(user1, 20);
    expect(await ESBT.checkMintedLevel(user1.address, 0)).to.equal(true);
  });

  it('mint: mint inverted order level SBT after another account mint', async () => {
    // mint level 2 with user1
    await mintSBT(user1, 300);
    expect(await ESBT.checkMintedLevel(user1.address, 2)).to.equal(true);

    // mint level 1 with user2
    await mintSBT(user2, 100);
    expect(await ESBT.checkMintedLevel(user2.address, 1)).to.equal(true);

    // mint level 0 with user1
    await mintSBT(user1, 20);
    expect(await ESBT.checkMintedLevel(user1.address, 0)).to.equal(true);
  });

  it('mint: mint level 0, level 2, and then mint level 1 with level 1 signature', async () => {
    // mint level 0
    await mintSBT(user1, 20);

    // mint level 2
    await mintSBT(user1, 300);

    // mint level 1
    await mintSBT(user1, 100);

    expect(await ESBT.checkMintedLevel(user1.address, 1)).to.equal(true);
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
    ).to.revertedWith('you are not available to mint');
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

  it('revert: mint level 0, 2, then mint level 2 again', async () => {
    // mint level 0
    await mintSBT(user1, 20);

    // mint level 2
    await mintSBT(user1, 300);

    // mint level 2 agian will revert
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
    message.expressAmount = 400;

    // generate signature
    let signature = await approver._signTypedData(domain, types, message);

    // mint first SBT
    await ESBT.mintExpress(
      message.receiver,
      message.metadataURI,
      message.expressAmount,
      signature
    );

    expect(await ESBT.balanceOf(user1.address, 3)).to.equal(1);
    ESBT.mintedLevels(user1.address).then((levels) => {
      expect(levels.toString()).to.equal('4');
    });
  });
});
