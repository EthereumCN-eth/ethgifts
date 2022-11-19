import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import hre from 'hardhat';
import { ECN4thAnniversary } from '../typechain';
import { expect } from 'chai';

let anniver: ECN4thAnniversary;
let admin: SignerWithAddress;
let user1: SignerWithAddress;
let user2: SignerWithAddress;
let user3: SignerWithAddress;
let user4: SignerWithAddress;
const baseUri: string = 'https://example.com';

before('', async () => {
  [admin, user1, user2, user3, user4] = await hre.ethers.getSigners();
  const anniversary_factory = await hre.ethers.getContractFactory(
    'ECN4thAnniversary'
  );
  anniver = await anniversary_factory.deploy(baseUri);
  await anniver.deployed();
});

describe('just test 4th anniversary', () => {
  it('test mint function', async () => {
    await anniver
      .connect(admin)
      .sendMany([user1.address, user2.address, user3.address, user4.address]);

    expect(await anniver.balanceOf(user1.address)).to.be.equal(1);
    expect(await anniver.balanceOf(user2.address)).to.be.equal(1);
    expect(await anniver.balanceOf(user3.address)).to.be.equal(1);
    expect(await anniver.balanceOf(user4.address)).to.be.equal(1);
  });
  it('test tokenURI is the same uri', async () => {
    expect(await anniver.tokenURI(0)).to.be.equal(baseUri);
    expect(await anniver.tokenURI(1)).to.be.equal(baseUri);
    expect(await anniver.tokenURI(2)).to.be.equal(baseUri);
    expect(await anniver.tokenURI(3)).to.be.equal(baseUri);
  });
  it('not minted tokenId no tokenURI', async () => {
    await expect(anniver.tokenURI(4)).to.be.reverted;
  });
});
