import { BigNumber } from '@ethersproject/bignumber';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from 'chai';
import hre from 'hardhat';
import { ExpressSBT } from '../typechain';
import { getDomain, getMessage } from './utils';
import { types, Domain } from './types';
import * as config from './testConfig';

let deployer: SignerWithAddress;
let user1: SignerWithAddress;
let user2: SignerWithAddress;
let user3: SignerWithAddress;
let approver: SignerWithAddress;
let newApprover: SignerWithAddress;
let ESBT: ExpressSBT;

let domain: Domain;

/**
 * @notive level == tokenId
 */

before('initialize contracts', async () => {
  [deployer, user1, user2, user3, approver, newApprover] =
    await hre.ethers.getSigners();

  // ESBT logic contract
  const ESBTLogicFactory = await hre.ethers.getContractFactory('ExpressSBT');

  ESBT = await ESBTLogicFactory.deploy(
    approver.address,
    config.gradeLine.map((line) => {
      return BigNumber.from(line);
    }),
    config.baseUri
  );

  await ESBT.deployed();

  // fill out the domain of typeData
  domain = getDomain(hre.config.networks.hardhat.chainId, ESBT.address);
});

describe('check initial setting', () => {
  it('check initial setting', async () => {
    expect(await ESBT.approver()).to.equal(approver.address);
  });
  it('check grade line is set', async () => {
    expect(await ESBT.gradeLine(0)).to.be.equal(config.gradeLine[0]);
    expect(await ESBT.gradeLine(1)).to.be.equal(config.gradeLine[1]);
    expect(await ESBT.gradeLine(2)).to.be.equal(config.gradeLine[2]);
  });
  it('check approver is set', async () => {
    expect(await ESBT.approver()).to.be.equal(approver.address);
  });
  it('revert: can not get tokenURI before one token minted', async () => {
    await expect(ESBT.uri(0)).to.be.revertedWith('TokenNotExist');
  });
});

describe('revert: check revert without any token minted', () => {
  it('revert: can not get uri of tokenId with error of "TokenNotExist"', async () => {
    await expect(ESBT.uri(0)).to.be.revertedWith('TokenNotExist');
  });
  it('revert: can not get uri of not exist level, error: "LevelNotSet"', async () => {
    await expect(ESBT.uri(3)).to.be.revertedWith('LevelNotSet');
  });
});

/**
 * checkList:
 *  balanceOf();
 *  totalSupply();
 *  accountUri();
 *  mintedLevels();
 *  uri();
 */
describe('user1 simply mint level 0', async () => {
  before(async () => {
    const message = getMessage(user1.address, 'https://example1.com', 20);

    // generate signature
    let signature = await approver._signTypedData(domain, types, message);

    // mint SBT
    await ESBT.mintExpress(
      message.receiver,
      message.metadataURI,
      message.expressAmount,
      signature
    );
  });
  it('user1 get one tokenId 0', async () => {
    // balance = 1
    expect(await ESBT.balanceOf(user1.address, 0)).to.equal(1);
  });
  it('check tokenId 0 supply add 1', async () => {
    // totalSupply = 1 when check level 0
    expect(await ESBT.totalSupply(0)).to.equal(1);
  });
  it('check user1 account uri is "https://example1.com"', async () => {
    expect(await ESBT.accountURI(0, user1.address)).to.be.equal(
      'https://example1.com'
    );
  });
  it('check user1 minted level is 0', async () => {
    const level = await ESBT.mintedLevels(user1.address);
    expect(level.toString()).to.be.equal('0');
  });
  it('check minted level 0 is true', async () => {
    expect(await ESBT.checkMintedLevel(user1.address, 0)).to.be.equal(true);
  });
  it('check tokenUri of tokenId 0 is "https://example.com/0.json"', async () => {
    expect(await ESBT.uri(0)).to.be.equal('https://example.com/0.json');
  });
});

describe('revert: check mint error', () => {
  it('revert: invalid proof: user2 sign the mint function', async () => {
    const message = getMessage(user1.address, 'https://example1.com', 100);
    const signature = await user2._signTypedData(domain, types, message);
    await expect(
      ESBT.connect(user1).mintExpress(
        user1.address,
        'https://example1.com',
        100,
        signature
      )
    ).to.be.revertedWith('InvalidProof');
  });
  it('revert: user2 get user1 signature to mint tokenId 1 to himself/herself', async () => {
    const message = getMessage(user1.address, 'https://example1.com', 100);
    const signature = await approver._signTypedData(domain, types, message);
    await expect(
      ESBT.connect(user2).mintExpress(
        user2.address,
        'https://example1.com',
        100,
        signature
      )
    ).to.be.revertedWith('InvalidProof');
  });
  it('revert: LevelMinted: user1 mint level 0 token aganin', async () => {
    const message = getMessage(user1.address, 'https://example1.com', 20);
    const signature = await approver._signTypedData(domain, types, message);
    await expect(
      ESBT.connect(user1).mintExpress(
        user1.address,
        'https://example1.com',
        20,
        signature
      )
    ).to.be.revertedWith('LevelMinted');
  });
  it('revert: NotLevelMatched: input an error express amount', async () => {
    const message = getMessage(user1.address, 'https://example1.com', 21);
    const signature = await approver._signTypedData(domain, types, message);
    await expect(
      ESBT.connect(user1).mintExpress(
        user1.address,
        'https://example1.com',
        21,
        signature
      )
    ).to.be.revertedWith('NotLevelMatched');
  });
});

describe('user1 skip level 1, mint level 2', () => {
  before(async () => {
    const message = getMessage(user1.address, 'https://example2.com', 300);

    // generate signature
    let signature = await approver._signTypedData(domain, types, message);

    // mint SBT
    await ESBT.connect(user1).mintExpress(
      message.receiver,
      message.metadataURI,
      message.expressAmount,
      signature
    );
  });
  it('check user1 get tokenId 2(level2)', async () => {
    expect(await ESBT.balanceOf(user1.address, 2)).to.equal(1);
  });
  it('check totalSupply of tokenId 2 is 1', async () => {
    expect(await ESBT.totalSupply(2)).to.be.equal('1');
  });
  it('check user1 account uri is "https://example2.com"', async () => {
    expect(await ESBT.accountURI(2, user1.address)).to.be.equal(
      'https://example2.com'
    );
  });
  it('check user1 all minted level is 0,2', async () => {
    const levels = await ESBT.mintedLevels(user1.address);
    expect(levels.toString()).to.equal('0,2');
  });
  it('check tokenId 2 uri is "https://example.com/2.json"', async () => {
    expect(await ESBT.uri(2)).to.be.equal('https://example.com/2.json');
  });
});

describe('user1 back to mint level 1', () => {
  before(async () => {
    const message = getMessage(user1.address, 'https://example2.com', 100);
    const signature = await approver._signTypedData(domain, types, message);
    await ESBT.connect(user1).mintExpress(
      user1.address,
      'https://example2.com',
      100,
      signature
    );
  });
  it('check user1 get tokenId 1(level1)', async () => {
    expect(await ESBT.balanceOf(user1.address, 1)).to.equal(1);
  });
  it('check totalSupply of tokenId 1 is 1', async () => {
    expect(await ESBT.totalSupply(1)).to.be.equal(1);
  });
  it('check user1 account uri is "https://example2.com"', async () => {
    expect(await ESBT.accountURI(2, user1.address)).to.be.equal(
      'https://example2.com'
    );
  });
  it('check user1 all minted level is 0,2,1', async () => {
    const levels = await ESBT.mintedLevels(user1.address);
    expect(levels.toString()).to.equal('0,2,1');
  });
  it('check tokenId 2 uri is "https://example.com/1.json"', async () => {
    expect(await ESBT.uri(1)).to.be.equal('https://example.com/1.json');
  });
});

describe('admin functions', () => {
  before(async () => {
    await ESBT.connect(deployer).addLevel(400);
    await ESBT.connect(deployer).updateApprover(newApprover.address);
    await ESBT.connect(deployer).setBaseUri(config.newBaseUri);
  });
  it('check new level added', async () => {
    expect(await ESBT.gradeLine(3)).to.be.equal(400);
  });
  it('check new approver', async () => {
    expect(await ESBT.approver()).to.be.equal(newApprover.address);
  });
  it('check tokenId 0 baseUri updated: equal to "https://newExample.com/0.json"', async () => {
    expect(await ESBT.uri(0)).to.be.equal('https://newExample.com/0.json');
  });
  it('user2 mint the latest level SBT', async () => {
    const message = getMessage(user2.address, 'https://example4.com', 400);

    // generate signature
    const signature = await newApprover._signTypedData(domain, types, message);

    // mint first SBT
    await ESBT.connect(user2).mintExpress(
      message.receiver,
      message.metadataURI,
      message.expressAmount,
      signature
    );

    expect(await ESBT.balanceOf(user2.address, 3)).to.equal(1);
    ESBT.mintedLevels(user2.address).then((levels) => {
      expect(levels.toString()).to.equal('4');
    });
  });
});

describe('check admin function: sendExpress', () => {
  before(async () => {
    await ESBT.connect(deployer).sendExpress(user3.address, 1, 'test.com');
  });
  it('check user3 received level 1(tokenId 1)', async () => {
    expect(await ESBT.checkMintedLevel(user3.address, 1)).to.be.equal(true);
  });
  it('revert: can not send user3 the level 1 again', async () => {
    await expect(
      ESBT.connect(deployer).sendExpress(user3.address, 1, 'test.com')
    ).to.be.revertedWith('LevelMinted');
  });
  it('revert: can not send user3 an nonexistent level 4(level 3 has been added)', async () => {
    await expect(
      ESBT.connect(deployer).sendExpress(user3.address, 4, 'test.com')
    ).to.be.revertedWith('TokenNotExist');
  });
  it('revert: only owner can send Express', async () => {
    await expect(
      ESBT.connect(user1).sendExpress(user3.address, 0, 'test.com')
    ).to.be.revertedWith('Ownable: caller is not the owner');
  });
});
