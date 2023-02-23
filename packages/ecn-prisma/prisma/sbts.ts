import { SBTCreateData } from "./seed";

export const sbts: SBTCreateData[] = [
  {
    contractAddress: "0xbBE11F912599ecb054145aAD81674c137bb42657",
    contractName: "ExpressSBT",
    version: "1",
    chainId: 5,
    countLevel: [3, 6, 20],
    metaDataName: "ExpressSBT",
    metaDataDescription: "just a goerli test sbt",
    issuerAddress: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    galleryItemBase: {
      create: {
        coverLink:
          "https://ethereumcn.mypinata.cloud/ipfs/QmX5Zib9wG6XkH3PjYEz5f1nM2toGznhNfFgRSHjTUfF2C/express_sbt_cover.jpg",
        chainId: 5,
        name: "E群誌系列SBT",
        onShelf: true,
        galleryItemType: "sbt",
        itemText: ["E群誌 SBT Lv1", "E群誌 SBT Lv2", "E群誌 SBT Lv3"],
        imageLinks: [
          // "https://mirror-media.imgix.net/publication-images/cDosw4qHdNtOPrVxYn5CK.jpg?h=540&w=540",
          "https://ethereumcn.mypinata.cloud/ipfs/QmX5Zib9wG6XkH3PjYEz5f1nM2toGznhNfFgRSHjTUfF2C/v1.png",
          "https://ethereumcn.mypinata.cloud/ipfs/QmX5Zib9wG6XkH3PjYEz5f1nM2toGznhNfFgRSHjTUfF2C/v2.png",
          "https://ethereumcn.mypinata.cloud/ipfs/QmX5Zib9wG6XkH3PjYEz5f1nM2toGznhNfFgRSHjTUfF2C/v3.png",
        ],
        tags: ["SBT", "工作量证明"],
        tokenType: "ERC1155",
        eventStartTime: 1677029754,
      },
    },
  },

  {
    contractAddress: "0x04e12b47Ab56338DE1D0A11C9802489Dcd909AA4",
    contractName: "TranslatorSBT",
    version: "1",
    chainId: 5,
    // token id here
    countLevel: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    metaDataName: "TranslatorSBT",
    metaDataDescription: "just a goerli test sbt",
    issuerAddress: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    galleryItemBase: {
      create: {
        coverLink:
          "https://ethereumcn.mypinata.cloud/ipfs/QmddhyXqz1A2jhCWFT5fwrHx4H57bYNp5eGYY6o2Vq7TQL",
        chainId: 5,
        name: "ECN Translator系列SBT",
        onShelf: false,
        galleryItemType: "sbt",
        itemText: [
          "Mainnet",
          "Layer2",
          "Staking",
          "MEV",
          "Cryptography",
          "Tool&Tech",
          "DeFi",
          "NFT",
          "SocialFi",
          "Ecosystem",
        ],
        imageLinks: [
          "https://ethereumcn.mypinata.cloud/ipfs/QmddhyXqz1A2jhCWFT5fwrHx4H57bYNp5eGYY6o2Vq7TQL",
          "https://ethereumcn.mypinata.cloud/ipfs/QmddhyXqz1A2jhCWFT5fwrHx4H57bYNp5eGYY6o2Vq7TQL",
          "https://ethereumcn.mypinata.cloud/ipfs/QmddhyXqz1A2jhCWFT5fwrHx4H57bYNp5eGYY6o2Vq7TQL",
          "https://ethereumcn.mypinata.cloud/ipfs/QmddhyXqz1A2jhCWFT5fwrHx4H57bYNp5eGYY6o2Vq7TQL",
          "https://ethereumcn.mypinata.cloud/ipfs/QmddhyXqz1A2jhCWFT5fwrHx4H57bYNp5eGYY6o2Vq7TQL",
          "https://ethereumcn.mypinata.cloud/ipfs/QmddhyXqz1A2jhCWFT5fwrHx4H57bYNp5eGYY6o2Vq7TQL",
          "https://ethereumcn.mypinata.cloud/ipfs/QmddhyXqz1A2jhCWFT5fwrHx4H57bYNp5eGYY6o2Vq7TQL",
          "https://ethereumcn.mypinata.cloud/ipfs/QmddhyXqz1A2jhCWFT5fwrHx4H57bYNp5eGYY6o2Vq7TQL",
          "https://ethereumcn.mypinata.cloud/ipfs/QmddhyXqz1A2jhCWFT5fwrHx4H57bYNp5eGYY6o2Vq7TQL",
          "https://ethereumcn.mypinata.cloud/ipfs/QmddhyXqz1A2jhCWFT5fwrHx4H57bYNp5eGYY6o2Vq7TQL",
        ],
        tags: ["SBT", "工作量证明"],
        tokenType: "ERC1155",
        eventStartTime: 1677029754,
      },
    },
  },
];
