import { PrismaClient } from "@prisma/client";
// import { generateSignature } from "ecn-sbt-api";
const prisma = new PrismaClient();

async function main() {
  const nft = prisma.nFT.createMany({
    data: [
      {
        contractAddress: "0x0ceaea47985c4223e893599597494a35b9845b3d",
        name: "EthTiger",
        symbol: "ETHGifts",
        imageLinks: [
          "https://icloud.mypinata.cloud/ipfs/QmYA4JbwQxw18JVNtDGDYnR66e9F6XNEG2hBe1nwruBcFh",
        ],
        videoLinks: [
          "https://icloud.mypinata.cloud/ipfs/QmS1vhN4GdxZFZoRHBH3SEKGHWaMZ3CW3WSNFGRTxr39mj",
        ],
        chainId: 1,
      },
      {
        contractAddress: "0x495f947276749Ce646f68AC8c248420045cb7b5e",
        name: "The Merge & Weeth",
        symbol: "The Merge & Weeth",
        imageLinks: [
          "https://icloud.mypinata.cloud/ipfs/QmVH7jdf5aJpko2BiATUaWAFzHcyX6kU9JPsxidsnW1Jax",
        ],
        chainId: 1,
      },
      {
        contractAddress: "0x495f947276749Ce646f68AC8c248420045cb7b5e",
        name: "Decentralize staking with Rocket Pool",
        symbol: "The Merge & Weeth",
        imageLinks: [
          "https://icloud.mypinata.cloud/ipfs/QmWibxWeaZLLPRdBFYT3ci7yB6CMHFfhdK66jmpZGW2jWL",
        ],
        chainId: 1,
      },
      {
        contractAddress: "0x59FEf6b5CbA9D8351AfcC30d687D845a1361F141",
        name: "2021 The Year of 0x",
        symbol: "TY0",
        imageLinks: [
          "https://icloud.mypinata.cloud/ipfs/QmdTy8AmhyikhxCABahQCMfBfcCbM5enNUM1qUs3ELN1D5",
          "https://icloud.mypinata.cloud/ipfs/QmQdYJfjdxiSU2mYnjgDPiL4joveA9Kx7cHoG2yzB9xTbi",
          "https://icloud.mypinata.cloud/ipfs/Qmana5KvWj2uqEvgZKrpcT4HJrcosWm575UXW3FTDaEtM2",
          "https://icloud.mypinata.cloud/ipfs/QmaqcsQTE1jTWbHRexBfGY6RSBfhLDu9r4kb21fB58HjfD",
          "https://icloud.mypinata.cloud/ipfs/QmUvTLERnQSmAD4eQ2A1n7r9hQdvnNzRAZwhjgcVBNgdBS",
        ],
        chainId: 1,
      },
      {
        contractAddress: "0x266eb7895221c6331994F2C285824ccB891C4c54",
        name: "The Merge Panda",
        symbol: "PANDA",
        imageLinks: [
          "https://icloud.mypinata.cloud/ipfs/QmPStYeT6wRbQmdAjWHEqUNwnPyAr9SYaqpWhCzsgYTiqz",
        ],
        chainId: 1,
      },
      {
        contractAddress: "0xD7648602bBd6d5287A0588E80D3e2eA1c6caf3AF",
        name: "imToken & ECN Community AMA",
        symbol: "imToken &amp;amp; ECN",
        imageLinks: [
          "https://icloud.mypinata.cloud/ipfs/QmZWvHquvff87Ud3A8FynDiaks6sj9K9Xc1UeedtWCq64A",
        ],
        chainId: 42161,
      },
    ],
  });

  const sbt = prisma.sBTContractType.create({
    data: {
      contractAddress: "0x11",
      name: "ExpressSBT",
      countLevel: [1, 3, 5],
      imageLinks: [
        "https://mirror-media.imgix.net/publication-images/cDosw4qHdNtOPrVxYn5CK.jpg?h=540&w=540",
        "b",
        "c",
      ],
      chainId: 1,
    },
  });

  const poap = prisma.poap.createMany({
    data: [
      {
        eventId: 42251,
        name: "The Merge & Weeth",
        imageLinks: [
          "https://icloud.mypinata.cloud/ipfs/QmdUwiMsxvsV3hp3sHkRTTYGd6zMJyZqeAZFfdk91LEKEd",
        ],
        chainId: 100,
      },
      {
        eventId: 24174,
        name: "Chinese New Year with Vitalik",
        imageLinks: [
          "https://icloud.mypinata.cloud/ipfs/QmcpPK5vn57tieWR18duxK9mcUru611Ad8HxSaXze6n9u9",
        ],
        chainId: 100,
      },
    ],
  });

  const gallery = prisma.gallery.createMany({
    data: [
      {
        typeName: "nft",
        typeId: 1,
        tags: [],
        eventStartTime: 1643710408,
        eventDuration: 3600,
      },
      {
        typeName: "nft",
        typeId: 2,
        tags: [],
        eventStartTime: 1653041608,
        eventDuration: 3600,
      },
      {
        typeName: "nft",
        typeId: 3,
        tags: [],
        eventStartTime: 1654164808,
        eventDuration: 3600,
      },
      {
        typeName: "nft",
        typeId: 4,
        tags: [],
        eventStartTime: 1612260808,
        eventDuration: 3600,
      },
      {
        typeName: "nft",
        typeId: 5,
        tags: [],
        eventStartTime: 1635243208,
        eventDuration: 3600,
      },
      {
        typeName: "nft",
        typeId: 6,
        tags: [],
        eventStartTime: 1635243208,
        eventDuration: 3600,
      },
      {
        typeName: "poap",
        typeId: 1,
        tags: [],
        eventStartTime: 1653041608,
        eventDuration: 3600,
      },
      {
        typeName: "poap",
        typeId: 2,
        tags: [],
        eventStartTime: 1643969608,
        eventDuration: 3600,
      },
      {
        typeName: "sbt",
        typeId: 1,
        tags: [],
        eventStartTime: 1664619208,
        eventDuration: 315360000,
      },
    ],
  });

  const content = prisma.contentCategory.create({
    data: {
      contentType: "typee",
    },
  });

  interface rawMessage {
    rawMsg: string;
    discordName: string;
    content: string;
    url: string;
    contentType: string;
    discordId: string;
    ethAddress: string;
    msgId: string;
  }

  const messages = async (msgs: rawMessage[]) => {
    for (let i = 0; i < msgs.length; i++) {
      const msg = msgs[i];
      const contentType = msg.contentType;
      const discordId = msg.discordId;

      const rawMessage = await prisma.rawExpressMessage.create({
        data: {
          rawMessage: msg.rawMsg,
          id: msg.msgId,
          parsedUrl: msg.url,
          parsedMessage: msg.content,
          user: {
            connectOrCreate: {
              where: {
                discordId: discordId,
              },
              create: {
                name: msg.discordName,
                expressCount: 0,
                ethAddress: msg.ethAddress,
                discordId: discordId,
              },
            },
          },
        },
      });

      const message = await prisma.expressMessage.create({
        data: {
          expressMessage: msg.content,
          expressUrl: msg.url,
          // id: msgId,
          contentCategory: {
            connect: {
              contentType,
            },
          },
          user: {
            connect: {
              discordId: discordId,
            },
          },
          rawMessage: {
            connect: {
              id: msg.msgId,
            },
          },
        },
        include: {
          user: true,
        },
      });

      await prisma.user.update({
        where: {
          discordId: discordId,
        },
        data: {
          expressCount: {
            increment: 1,
          },
        },
      });

      console.log(message);
    }
  };

  // const generateSign = generateSignature("1", "1");

  const dbSeeding = await Promise.all([nft, sbt, poap, gallery, content]);

  const message = await messages([
    {
      rawMsg: "aaa https://example.com",
      discordName: "yourDaddy",
      content: "aaa",
      url: "https://example.com",
      contentType: "typee",
      discordId: "1",
      ethAddress: "0x6a453A70F6faC3abEF56E1Cb6741B06A25b9E9fB",
      msgId: "1",
    },
    {
      rawMsg: "aaa https://example.com",
      discordName: "yourDaddy",
      content: "aaa",
      url: "https://example.com",
      contentType: "typee",
      discordId: "2",
      ethAddress: "0xDF9B124Efd74fb0400fa026be557DE99c053ec69",
      msgId: "2",
    },
    {
      rawMsg: "aaa https://example.com",
      discordName: "yourDaddy",
      content: "aaa",
      url: "https://example.com",
      contentType: "typee",
      discordId: "2",
      ethAddress: "0xDF9B124Efd74fb0400fa026be557DE99c053ec69",
      msgId: "3",
    },
    {
      rawMsg: "aaa https://example.com",
      discordName: "yourDaddy",
      content: "aaa",
      url: "https://example.com",
      contentType: "typee",
      discordId: "2",
      ethAddress: "0xDF9B124Efd74fb0400fa026be557DE99c053ec69",
      msgId: "4",
    },
    {
      rawMsg: "aaa https://example.com",
      discordName: "yourDaddy",
      content: "aaa",
      url: "https://example.com",
      contentType: "typee",
      discordId: "3",
      ethAddress: "0x4Dc0da20f0f47038cC87F0fD3C814D5282a73518",
      msgId: "5",
    },
    {
      rawMsg: "aaa https://example.com",
      discordName: "yourDaddy",
      content: "aaa",
      url: "https://example.com",
      contentType: "typee",
      discordId: "3",
      ethAddress: "0x4Dc0da20f0f47038cC87F0fD3C814D5282a73518",
      msgId: "6",
    },
    {
      rawMsg: "aaa https://example.com",
      discordName: "yourDaddy",
      content: "aaa",
      url: "https://example.com",
      contentType: "typee",
      discordId: "3",
      ethAddress: "0x4Dc0da20f0f47038cC87F0fD3C814D5282a73518",
      msgId: "7",
    },
    {
      rawMsg: "aaa https://example.com",
      discordName: "yourDaddy",
      content: "aaa",
      url: "https://example.com",
      contentType: "typee",
      discordId: "3",
      ethAddress: "0x4Dc0da20f0f47038cC87F0fD3C814D5282a73518",
      msgId: "8",
    },
    {
      rawMsg: "aaa https://example.com",
      discordName: "yourDaddy",
      content: "aaa",
      url: "https://example.com",
      contentType: "typee",
      discordId: "3",
      ethAddress: "0x4Dc0da20f0f47038cC87F0fD3C814D5282a73518",
      msgId: "9",
    },
  ]);
  // generateSign,

  console.log(dbSeeding);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
