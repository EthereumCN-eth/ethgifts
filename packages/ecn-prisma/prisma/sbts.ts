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
        coverLink: "",
        chainId: 5,
        name: "E群志 SBT",
        onShelf: true,
        galleryItemType: "sbt",
        itemText: ["E群志 SBT Lv 1", "E群志 SBT Lv 2", "E群志 SBT Lv 3"],
        imageLinks: [
          // "https://mirror-media.imgix.net/publication-images/cDosw4qHdNtOPrVxYn5CK.jpg?h=540&w=540",
          "https://foundation.app/images/drops/collection-01-02@2x.png",
          "https://foundation.app/images/drops/collection-03-03@2x.png",
          "https://foundation.app/images/drops/collection-02-02@2x.png",
        ],
        tags: ["SBT", "工作量证明"],
        eventStartTime: 1666076540,
      },
    },
  },
];
