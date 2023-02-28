import { PrismaClient } from "@prisma/client";

// import { generateSignature } from "ecn-sbt-api";
const prisma = new PrismaClient();

export type SBTCreateData = Parameters<
  typeof prisma.sBTContractType.create
>[0]["data"];

const translatorSbt: SBTCreateData = {
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
};

const main = async () => {
  // const message = await createMessages(messages);
  prisma.sBTContractType
    .create({
      data: translatorSbt,
    })
    .then((item) => console.log(`sbt ${item.id} created`));
};

main()
  .then(() => {
    return prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
