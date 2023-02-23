import hre from 'hardhat';

const translationAddress = '0x04e12b47Ab56338DE1D0A11C9802489Dcd909AA4';

const mintTranslation = async () => {
  const [admin] = await hre.ethers.getSigners();
  const translation_factory = await hre.ethers.getContractFactory(
    'TranslationSBT'
  );
  const translation = translation_factory.attach(translationAddress);

  // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const mintTokenIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  for (let i = 0; i < mintTokenIds.length; i++) {
    await translation
      .connect(admin)
      .grantTranslation(admin.address, mintTokenIds[i]);
  }
};

(async () => {
  await mintTranslation();
})();
