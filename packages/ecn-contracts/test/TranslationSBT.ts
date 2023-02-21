import hre from 'hardhat';
import { expect } from 'chai';
import { TranslationSBT } from '../typechain';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';

let translation: TranslationSBT;
let admin: SignerWithAddress;
let anyUser: SignerWithAddress;

before(async () => {
  [admin, anyUser] = await hre.ethers.getSigners();
  const translation_factory = await hre.ethers.getContractFactory(
    'TranslationSBT'
  );
  translation = await translation_factory.deploy('https://example.com/');
  await translation.deployed();
});

describe('basic check', () => {
  before(async () => {
    await translation.connect(admin).grantTranslation(anyUser.address, 0);
  });
  it('check token Id 0 tokenUri is equal to https://example.com/0.json', async () => {
    expect(await translation.uri(0)).to.be.equal('https://example.com/0.json');
  });
  it('reset uri and check', async () => {
    await translation.setBaseUri('https://newUri.com/');
    expect(await translation.uri(0)).to.be.equal('https://newUri.com/0.json');
  });
  it('revert: fail to mint again', async () => {
    await expect(
      translation.connect(admin).grantTranslation(anyUser.address, 0)
    ).to.be.revertedWith('TokenMinted');
  });
  it('revert: only allow admin to call', async () => {
    await expect(
      translation.connect(anyUser).grantTranslation(admin.address, 1)
    ).to.be.revertedWith('Ownable: caller is not the owner');
  });
});
