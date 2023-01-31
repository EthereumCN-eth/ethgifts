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
          "https://ethereumcn.mypinata.cloud/ipfs/QmddhyXqz1A2jhCWFT5fwrHx4H57bYNp5eGYY6o2Vq7TQL",
        chainId: 5,
        name: "E群誌 SBT 系列",
        onShelf: true,
        galleryItemType: "sbt",
        itemText: ["E群誌 SBT Lv1", "E群誌 SBT Lv2", "E群誌 SBT Lv3"],
        imageLinks: [
          // "https://mirror-media.imgix.net/publication-images/cDosw4qHdNtOPrVxYn5CK.jpg?h=540&w=540",
          "https://foundation.app/images/drops/collection-01-02@2x.png",
          "https://foundation.app/images/drops/collection-03-03@2x.png",
          "https://foundation.app/images/drops/collection-02-02@2x.png",
        ],
        tags: ["SBT", "工作量证明"],
        tokenType: "ERC1155",
        eventStartTime: 1666076540,
      },
    },
  },
];
