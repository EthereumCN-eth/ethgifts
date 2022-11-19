import hre from 'hardhat';

export const MergeParty_init = async (
  mergeParty_address: string,
  MergeNFT_merkleRoot: string,
  MergeNFT_baseUri: string
) => {
  try {
    if (MergeNFT_merkleRoot === '' || MergeNFT_baseUri === '') {
      throw new Error('argus not set');
    }

    const mergePartyFactory = await hre.ethers.getContractFactory('MergeParty');
    await mergePartyFactory
      .attach(mergeParty_address)
      .initializeEvent(MergeNFT_merkleRoot, MergeNFT_baseUri);
    return {
      success: true,
      data: {
        merkleRoot: MergeNFT_merkleRoot,
        BaseUri: MergeNFT_baseUri,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      data: null,
    };
  }
};

export const Anniversary_init = async (
  anni4_address: string,
  Anni4_receivers: string[]
) => {
  try {
    if (Anni4_receivers.length === 0) {
      throw new Error('argus not set');
    }

    const AnniFactory = await hre.ethers.getContractFactory(
      'ECN4thAnniversary'
    );
    await AnniFactory.attach(anni4_address).sendMany(Anni4_receivers);
    console.log('sent address: ', Anni4_receivers);
    return {
      success: true,
      data: {
        receivers: Anni4_receivers,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      data: null,
    };
  }
};
