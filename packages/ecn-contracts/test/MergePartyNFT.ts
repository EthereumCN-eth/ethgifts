import hre, { network } from 'hardhat';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import fs from 'fs';
import path from 'path';
import { MergeParty } from '../typechain';
import { BigNumber, BytesLike } from 'ethers';
import { expect } from 'chai';

interface MerkleDistributorInfo {
  merkleRoot: string;
  totalAmount: string;
  claims: {
    [account: string]: {
      index: number;
      Ids: string[];
      proof: string[];
    };
  };
}

let admin: SignerWithAddress;
let user1: SignerWithAddress;
let user2: SignerWithAddress;
let mergePartyNFT: MergeParty;
let merkleRoot: BytesLike;
let messageBoard: string;
let messageBoard_fake: string;
let merkleTree: MerkleDistributorInfo;

before(async () => {
  [admin, user1, user2] = await hre.ethers.getSigners();

  messageBoard = 'https://example.com';
  messageBoard_fake = 'https://fake.com';
  merkleRoot =
    '0x5f40845f3514d446160913b22173f956cdeee6a15d241dc0c26f3d5709e54c00';

  merkleTree = JSON.parse(
    fs.readFileSync(
      path.join(
        __dirname,
        `../airdrop/0x5f40845f3514d446160913b22173f956cdeee6a15d241dc0c26f3d5709e54c00.json`
      ),
      'utf-8'
    )
  );

  // contract deployment
  const mergePartyNFTFactory = await hre.ethers.getContractFactory(
    'MergeParty'
  );
  mergePartyNFT = await mergePartyNFTFactory.deploy();

  await mergePartyNFT.deployed();

  // initialize event
  await mergePartyNFT.connect(admin).initializeEvent(merkleRoot, messageBoard);
});

describe('mint merge party nft', () => {
  it('check initial setting', async () => {
    expect(await mergePartyNFT.messageBoard()).to.be.equal(messageBoard);
    expect(await mergePartyNFT.merkleRoot()).to.be.equal(merkleRoot);
  });
  it('mint nft with user1', async () => {
    // get user1 verify data;
    const user = '0x85ecCCF0495048873AdFd107343630C95d49F42C';
    const claim = merkleTree.claims[user];

    await mergePartyNFT.claim(BigNumber.from(71), user, claim.proof);

    expect(await mergePartyNFT.balanceOf(user)).to.be.equal(1);
  });
  // it('mint two nft with user2 with throw error', async () => {
  //   // get user1 verify data;
  //   const claim = merkleTree.claims[user2.address];

  //   // mint first nft
  //   await mergePartyNFT.claim(
  //     BigNumber.from(claim.index),
  //     user2.address,
  //     claim.proof
  //   );

  //   // mint second nft
  //   await expect(
  //     mergePartyNFT.claim(
  //       BigNumber.from(claim.index),
  //       user2.address,
  //       claim.proof
  //     )
  //   ).to.reverted;
  // });
  it('all token id have the same baseUri', async () => {
    expect(await mergePartyNFT.tokenURI(BigNumber.from(0))).to.be.equal(
      messageBoard
    );
    // expect(await mergePartyNFT.tokenURI(BigNumber.from(1))).to.be.equal(
    //   messageBoard
    // );
  });
  it('can not call initializeEvent() again', async () => {
    expect(mergePartyNFT.initializeEvent(merkleRoot, messageBoard)).to.reverted;
  });
  // it('reset base uri', async () => {
  //   await mergePartyNFT.resetBaseUri(messageBoard_fake);

  //   expect(await mergePartyNFT.messageBoard()).to.be.equal(messageBoard_fake);
  // });
});
