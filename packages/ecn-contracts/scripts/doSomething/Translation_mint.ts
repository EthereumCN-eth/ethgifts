import hre from 'hardhat';

const translationAddress = '';

const mintTranslation = async () => {
  const [admin] = await hre.ethers.getSigners();
  const translation_factory = await hre.ethers.getContractFactory(
    'TranslationSBT'
  );
  const translation = translation_factory.attach(translationAddress);

  const mintTokenIds = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  await Promise.all([
    ...mintTokenIds.map(async (tokenId) => {
      await translation.connect(admin).grantTranslation(admin.address, tokenId);
    }),
  ]);
};

(async () => {
  await mintTranslation();
})();
