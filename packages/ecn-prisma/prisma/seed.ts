import { Poap, PrismaClient, Prisma } from "@prisma/client";
// import { generateSignature } from "ecn-sbt-api";
const prisma = new PrismaClient();

type NFTCreateData = Parameters<typeof prisma.nFT.create>[0]["data"];
type SBTCreateData = Parameters<
  typeof prisma.sBTContractType.create
>[0]["data"];
type PoapCreateData = Parameters<typeof prisma.poap.create>[0]["data"];
type ContentTypeCreateData = Parameters<
  typeof prisma.contentCategory.create
>[0]["data"];

const createOneNFTPromise = (input: NFTCreateData) =>
  prisma.nFT
    .create({
      data: input,
    })
    .then((item) => console.log(`nft ${item.id} created`));

const createOnePoapPromise = (input: PoapCreateData) =>
  prisma.poap
    .create({
      data: input,
    })
    .then((item) => console.log(`poap ${item.id} created`));

const createOneSBTPromise = (input: SBTCreateData) =>
  prisma.sBTContractType
    .create({
      data: input,
    })
    .then((item) => console.log(`sbt ${item.id} created`));

const createOneContentTypePromise = (input: ContentTypeCreateData) =>
  prisma.contentCategory
    .create({
      data: input,
    })
    .then((item) => console.log(`cotentType ${item.contentType} created`));

const nfts: NFTCreateData[] = [
  {
    contractAddress: "0x0ceaea47985c4223e893599597494a35b9845b3d",
    // name: "EthTiger",
    symbol: "ETHGifts",
    nftAppType: "DELIVERY",
    nftDeliveryData: {
      create: {
        merkleUrl:
          "https://raw.githubusercontent.com/EthereumCN-eth/merkle-drop-data-chunks/main/chunks/0x1bc892bb6e598efe98b86c40b2d2046a59aea65b5ca64df57c24b3708a752975.json",
        tokenType: "ERC721",
        contractAddress: "",
      },
    },
    galleryItemBase: {
      create: {
        chainId: 1,
        name: "EthTiger",
        onShelf: true,
        galleryItemType: "nft",
        tags: ["NFT", "参与凭证"],
        eventStartTime: 1642902731,
        eventDuration: 3600,
        coverLink:
          "https://icloud.mypinata.cloud/ipfs/QmYA4JbwQxw18JVNtDGDYnR66e9F6XNEG2hBe1nwruBcFh",
        imageLinks: [
          "https://icloud.mypinata.cloud/ipfs/QmYA4JbwQxw18JVNtDGDYnR66e9F6XNEG2hBe1nwruBcFh",
        ],
        videoLinks: [
          "https://icloud.mypinata.cloud/ipfs/QmS1vhN4GdxZFZoRHBH3SEKGHWaMZ3CW3WSNFGRTxr39mj",
        ],
        infoDetail: {
          eventDescription: "hello ongoing event description",
          title: "2022年虎年新春",
          subTitle: "2022 Chinese New Year EthTiger",
          dataSection: [
            {
              heading: "活动详情",
              subHeading: "Activities",
              type: "html",
              data: [
                "2022 年的虎年新春，ECN 组织举办了以太坊社区新春系列活动：<li>We create ——虎年 NFT Bounty 计划，在社区发起以春节、虎年和以太坊为主题的 NFT 设计比赛</li><li>We vote —— NFT 设计比赛的优胜作品由社区投票选出</li><li>We create ——虎年 NFT Bounty 计划，在社区发起以春节、虎年和以太坊为主题的 NFT 设计比赛</li><li>We vote —— NFT 设计比赛的优胜作品由社区投票选出</li><li>We learn and have fun —— ECN 邀请了 Vitalik 来中文社区举行线上访谈和 AMA，与大家互动</li>",
                "我们把此次 NFT 设计比赛的最佳作品铸造成 NFT 作为奖品回馈给积极参与我们活动的朋友，以作纪念。",
              ],
            },
            {
              heading: "社区投稿展示",
              subHeading: "Showcase",
              type: "image",
              data: [
                {
                  src: "https://icloud.mypinata.cloud/ipfs/QmRjrZ3eZ54XB4c38x3DKxnWHM4VeBXvRCwEvSZgXFH31P/2022%20dahudagui.jpg",
                  alt: "大虎大贵",
                },
                {
                  src: "https://icloud.mypinata.cloud/ipfs/QmRjrZ3eZ54XB4c38x3DKxnWHM4VeBXvRCwEvSZgXFH31P/ECN%20Tiger.gif",
                  alt: "ECN Tiger",
                },
                {
                  src: "https://icloud.mypinata.cloud/ipfs/QmRjrZ3eZ54XB4c38x3DKxnWHM4VeBXvRCwEvSZgXFH31P/chaocaihu.gif",
                  alt: "招财虎",
                },
                {
                  src: "https://icloud.mypinata.cloud/ipfs/QmRjrZ3eZ54XB4c38x3DKxnWHM4VeBXvRCwEvSZgXFH31P/huhushengwei%20yitailiuqian.png",
                  alt: "虎虎生威，以太六千",
                },
                {
                  src: "https://ethereumcn.mypinata.cloud/ipfs/QmZ7faJ2NCU3EY6FTZmBbWyc6uymVdv2SFb9xzSfLzdLpJ",
                  alt: "以太坊虎虎生威之虎年纪念币",
                },
                {
                  src: "https://icloud.mypinata.cloud/ipfs/QmRjrZ3eZ54XB4c38x3DKxnWHM4VeBXvRCwEvSZgXFH31P/menghulaixi.jpg",
                  alt: "萌虎来袭",
                },
                {
                  src: "https://icloud.mypinata.cloud/ipfs/QmRjrZ3eZ54XB4c38x3DKxnWHM4VeBXvRCwEvSZgXFH31P/tuantuanyuanyuan.gif",
                  alt: "团团圆圆",
                },
              ],
            },
          ],
        } as Prisma.InputJsonValue,
      },
    },
  },
  {
    contractAddress: "0x495f947276749Ce646f68AC8c248420045cb7b5e",
    symbol: "The Merge & Weeth",
    galleryItemBase: {
      create: {
        coverLink:
          "https://icloud.mypinata.cloud/ipfs/QmVH7jdf5aJpko2BiATUaWAFzHcyX6kU9JPsxidsnW1Jax",
        imageLinks: [
          "https://icloud.mypinata.cloud/ipfs/QmYA4JbwQxw18JVNtDGDYnR66e9F6XNEG2hBe1nwruBcFh",
        ],
        name: "The Merge & Weeth",
        chainId: 1,
        tokenType: "ERC1155",
        tokenId:
          "60575999203224897677942571825279155748894443364198416085237471895517392797712",
        galleryItemType: "nft",
        tags: ["NFT", "参与凭证"],
        eventStartTime: 1643710408,
        eventDuration: 3600,
        onShelf: true,
        infoDetail: {
          eventDescription: "hello ongoing event description",
          title: "The Merge & Weeth 系列活动的第一场：以太坊 PoS 之路",
          subTitle: "The Merge and Weeth",
          dataSection: [
            {
              heading: "活动详情",
              subHeading: "Activities",
              type: "html",
              data: [
                "在 2022 年 5 月，在以太坊合并将至未至之际，ECN 举办主题为 <i>The Merge & Weeth</i> —— 以太坊合并与我们的距离的系列活动，在首场活动邀请了以太坊基金会研究员🥳 Hsiao-Wei Wang (合并熊猫 🐼 这个 meme 的创作者) 给大家带来“以太坊 PoS 之路”的主题分享。",
                "在 AMA 环节，提前在我们 discrod 进行有效提问的朋友都有机会获得此款 NFT。",
              ],
            },
            {
              heading: "直播回放",
              subHeading: "Playback",
              type: "image",
              data: [
                {
                  src: "https://icloud.mypinata.cloud/ipfs/QmVH7jdf5aJpko2BiATUaWAFzHcyX6kU9JPsxidsnW1Jax",
                  alt: "data",
                },
                {
                  src: "https://icloud.mypinata.cloud/ipfs/QmaqcsQTE1jTWbHRexBfGY6RSBfhLDu9r4kb21fB58HjfD",
                  alt: "data",
                },
              ],
            },
            {
              heading: "直播回放 video",
              subHeading: "Playback Video",
              type: "video",
              data: [
                {
                  src: "https://icloud.mypinata.cloud/ipfs/QmS1vhN4GdxZFZoRHBH3SEKGHWaMZ3CW3WSNFGRTxr39mj",
                  type: "video/mp4",
                },
              ],
            },
          ],
        } as Prisma.InputJsonValue,
      },
    },
  },
  {
    contractAddress: "0x495f947276749Ce646f68AC8c248420045cb7b5e",
    symbol: "The Merge & Weeth",
    galleryItemBase: {
      create: {
        coverLink:
          "https://icloud.mypinata.cloud/ipfs/QmWibxWeaZLLPRdBFYT3ci7yB6CMHFfhdK66jmpZGW2jWL",
        imageLinks: [
          "https://icloud.mypinata.cloud/ipfs/QmWibxWeaZLLPRdBFYT3ci7yB6CMHFfhdK66jmpZGW2jWL",
        ],
        name: "Decentralize staking with Rocket Pool",
        chainId: 1,
        onShelf: true,
        tokenType: "ERC1155",
        tokenId:
          "60575999203224897677942571825279155748894443364198416085237471896616904425492",
        galleryItemType: "nft",
        tags: ["NFT", "参与凭证"],
        eventStartTime: 1654164808,
        eventDuration: 3600,
      },
    },
  },
  {
    contractAddress: "0x59FEf6b5CbA9D8351AfcC30d687D845a1361F141",
    symbol: "TY0",
    galleryItemBase: {
      create: {
        chainId: 1,
        name: "2021 The Year of 0x",
        onShelf: true,
        galleryItemType: "nft",
        tags: ["NFT", "参与凭证"],
        eventStartTime: 1612260808,
        eventDuration: 3600,
        coverLink:
          "https://icloud.mypinata.cloud/ipfs/QmdTy8AmhyikhxCABahQCMfBfcCbM5enNUM1qUs3ELN1D5",
        imageLinks: [
          "https://icloud.mypinata.cloud/ipfs/QmaqcsQTE1jTWbHRexBfGY6RSBfhLDu9r4kb21fB58HjfD",
          "https://icloud.mypinata.cloud/ipfs/QmQdYJfjdxiSU2mYnjgDPiL4joveA9Kx7cHoG2yzB9xTbi",
          "https://icloud.mypinata.cloud/ipfs/Qmana5KvWj2uqEvgZKrpcT4HJrcosWm575UXW3FTDaEtM2",
        ],
      },
    },
  },
  {
    contractAddress: "0x266eb7895221c6331994F2C285824ccB891C4c54",
    symbol: "PANDA",
    galleryItemBase: {
      create: {
        coverLink:
          "https://icloud.mypinata.cloud/ipfs/QmPStYeT6wRbQmdAjWHEqUNwnPyAr9SYaqpWhCzsgYTiqz",
        imageLinks: [
          "https://icloud.mypinata.cloud/ipfs/QmPStYeT6wRbQmdAjWHEqUNwnPyAr9SYaqpWhCzsgYTiqz",
        ],

        chainId: 1,
        name: "The Merge Panda",
        tags: ["NFT", "参与凭证"],
        eventStartTime: 1635243208,
        eventDuration: 3600,
        onShelf: true,
        galleryItemType: "nft",
      },
    },
  },
  {
    contractAddress: "0xD7648602bBd6d5287A0588E80D3e2eA1c6caf3AF",
    symbol: "imToken &amp;amp; ECN",
    galleryItemBase: {
      create: {
        coverLink:
          "https://icloud.mypinata.cloud/ipfs/QmZWvHquvff87Ud3A8FynDiaks6sj9K9Xc1UeedtWCq64A",
        imageLinks: [
          "https://icloud.mypinata.cloud/ipfs/QmZWvHquvff87Ud3A8FynDiaks6sj9K9Xc1UeedtWCq64A",
        ],
        chainId: 42161,
        name: "imToken & ECN Community AMA",
        tags: ["NFT", "参与凭证"],
        eventStartTime: 1635243208,
        eventDuration: 3600,
        onShelf: true,
        galleryItemType: "nft",
      },
    },
  },
];

const sbts: SBTCreateData[] = [
  {
    // contractAddress,

    contractAddress: "0x2057aC52fe393a51b11aa39E064e1C230A450ed8",
    //       name: "ExpressSBT",
    countLevel: [2, 4, 6],

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
        tags: ["SBT", "工作量凭证", "成员资格凭证"],
        eventStartTime: 1666076540,
      },
    },
  },
];

const poaps: PoapCreateData[] = [
  {
    poapEventId: 42251,
    galleryItemBase: {
      create: {
        coverLink:
          "https://icloud.mypinata.cloud/ipfs/QmdUwiMsxvsV3hp3sHkRTTYGd6zMJyZqeAZFfdk91LEKEd",
        name: "The Merge & Weeth",
        imageLinks: [
          "https://icloud.mypinata.cloud/ipfs/QmdUwiMsxvsV3hp3sHkRTTYGd6zMJyZqeAZFfdk91LEKEd",
        ],
        chainId: 100,
        galleryItemType: "poap",
        onShelf: true,
        tags: ["POAP", "参与凭证"],
        eventStartTime: 1643710408,
        eventDuration: 3600,
      },
    },
  },
  {
    poapEventId: 24174,
    galleryItemBase: {
      create: {
        name: "Chinese New Year with Vitalik",
        coverLink:
          "https://icloud.mypinata.cloud/ipfs/QmcpPK5vn57tieWR18duxK9mcUru611Ad8HxSaXze6n9u9",
        imageLinks: [
          "https://icloud.mypinata.cloud/ipfs/QmcpPK5vn57tieWR18duxK9mcUru611Ad8HxSaXze6n9u9",
        ],
        chainId: 100,
        galleryItemType: "poap",
        onShelf: true,
        tags: ["POAP", "参与凭证"],
        eventStartTime: 1644436823,
        eventDuration: 3600,
      },
    },
  },
];

const contentTypes: ContentTypeCreateData[] = [
  {
    contentType: "eth2",
  },
  {
    contentType: "defi",
  },
];

// const messages = [
//   {
//     rawMsg: "aaa https://example.com",
//     discordName: "yourDaddy",
//     content: "aaa",
//     url: "https://example.com",
//     contentType: "eth2",
//     discordId: "1",
//     ethAddress: "0x6a453A70F6faC3abEF56E1Cb6741B06A25b9E9fB",
//     msgId: "1",
//   },
//   {
//     rawMsg: "aaa https://example.com",
//     discordName: "yourDaddy",
//     content: "aaa",
//     url: "https://example.com",
//     contentType: "eth2",
//     discordId: "2",
//     ethAddress: "0xDF9B124Efd74fb0400fa026be557DE99c053ec69",
//     msgId: "2",
//   },
//   {
//     rawMsg: "aaa https://example.com",
//     discordName: "yourDaddy",
//     content: "aaa",
//     url: "https://example.com",
//     contentType: "eth2",
//     discordId: "2",
//     ethAddress: "0xDF9B124Efd74fb0400fa026be557DE99c053ec69",
//     msgId: "3",
//   },
//   {
//     rawMsg: "aaa https://example.com",
//     discordName: "yourDaddy",
//     content: "aaa",
//     url: "https://example.com",
//     contentType: "eth2",
//     discordId: "2",
//     ethAddress: "0xDF9B124Efd74fb0400fa026be557DE99c053ec69",
//     msgId: "4",
//   },
//   {
//     rawMsg: "aaa https://example.com",
//     discordName: "yourDaddy",
//     content: "aaa",
//     url: "https://example.com",
//     contentType: "eth2",
//     discordId: "3",
//     ethAddress: "0x4Dc0da20f0f47038cC87F0fD3C814D5282a73518",
//     msgId: "5",
//   },
//   {
//     rawMsg: "aaa https://example.com",
//     discordName: "yourDaddy",
//     content: "aaa",
//     url: "https://example.com",
//     contentType: "eth2",
//     discordId: "3",
//     ethAddress: "0x4Dc0da20f0f47038cC87F0fD3C814D5282a73518",
//     msgId: "6",
//   },
//   {
//     rawMsg: "aaa https://example.com",
//     discordName: "yourDaddy",
//     content: "aaa",
//     url: "https://example.com",
//     contentType: "eth2",
//     discordId: "3",
//     ethAddress: "0x4Dc0da20f0f47038cC87F0fD3C814D5282a73518",
//     msgId: "7",
//   },
//   {
//     rawMsg: "aaa https://example.com",
//     discordName: "yourDaddy",
//     content: "aaa",
//     url: "https://example.com",
//     contentType: "eth2",
//     discordId: "3",
//     ethAddress: "0x4Dc0da20f0f47038cC87F0fD3C814D5282a73518",
//     msgId: "8",
//   },
//   {
//     rawMsg: "aaa https://example.com",
//     discordName: "yourDaddy",
//     content: "aaa",
//     url: "https://example.com",
//     contentType: "eth2",
//     discordId: "3",
//     ethAddress: "0x4Dc0da20f0f47038cC87F0fD3C814D5282a73518",
//     msgId: "9",
//   },
// ];

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

const createMessages = async (msgs: rawMessage[]) => {
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

const main = async () => {
  await Promise.all([
    ...nfts.map(createOneNFTPromise),
    ...sbts.map(createOneSBTPromise),
    ...poaps.map(createOnePoapPromise),
    ...contentTypes.map(createOneContentTypePromise),
  ]);
  // const message = await createMessages(messages);
};
// const generateSign = generateSignature("1", "1");

//   const dbSeeding = await Promise.all([nft, sbt, poap, gallery, content]);

// generateSign,

//   console.log(dbSeeding);
// }

main()
  .then(() => {
    return prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
