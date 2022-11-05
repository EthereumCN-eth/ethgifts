import { Prisma } from "@prisma/client";
import { NFTCreateData } from "./seed";

export const nfts: NFTCreateData[] = [
  {
    contractAddress: "0x667b493492e1d613b7C0b3E33Eb2A15A59B9C50F",
    symbol: "ETHGifts",
    nftAppType: "DELIVERY",
    nftDeliveryData: {
      create: {
        merkleUrl:
          "https://raw.githubusercontent.com/EthereumCN-eth/merkle-drop-data-chunks/main/chunks/0x3bc418e849fb00b3ba1c688b150aa5a4ef7492bc6106436f936e9eee4e57fc6e.json",
        tokenType: "ERC721",
        contractAddress: "0x667b493492e1d613b7C0b3E33Eb2A15A59B9C50F",
      },
    },
    galleryItemBase: {
      create: {
        coverLink:
          "https://ethereumcn.mypinata.cloud/ipfs/QmbcmD88rVTZ2TGLestHQKw78s8RgPce6fDwMpbFMJSSqs",
        imageLinks: [
          "https://ethereumcn.mypinata.cloud/ipfs/QmbcmD88rVTZ2TGLestHQKw78s8RgPce6fDwMpbFMJSSqs",
        ],
        chainId: 5,
        name: "(testing)以太坊合并观看派对留言板",
        tags: ["NFT", "参与证明"],
        eventStartTime: 1663222616,
        eventDuration: 7626505,
        onShelf: true,
        galleryItemType: "nft",
        infoDetail: {
          eventDescription: "",
          title: "以太坊合并观看派对留言板",
          subTitle: "Messages Board NFT",
          dataSection: [
            {
              heading: "活动详情",
              subHeading: "Activities",
              type: "html",
              data: [
                "在 2022 年 9 月 15 日，ECN、Ethplanet 与 Crypto Tech Night 在以太坊合并当天共同举办“一起来唠嗑 The Merge” 观看派对，现场连线多位嘉宾对合并、PoS 和 Staking 等话题进行讨论和分享，与现场观众互动，并转播以太坊基金会的直播现场，一起唠嗑，共同经历这个以太坊的历史时刻。",
                "ECN 还为此次观看派对的参与者准备了 “The Merge 留言板 NFT” ，参与者通过在合约页面写入自己的关于以太坊合并的语句，即可铸造一个随机的 The Merge 贴图 NFT，现在，ECN 通过前端，把参与者的留言展示在画布上，形成一个数字留言板 NFT。大家快来找找画布上自己的留言吧！",
              ],
            },
            {
              heading: "活动花絮",
              subHeading: "Highlights",
              type: "image",
              data: [
                {
                  src: "https://ethereumcn.mypinata.cloud/ipfs/QmV5fqKSvxmvavt6VNMy5Hy51EQLwwAczsHE3Y8w1MvAid",
                  alt: "poster",
                },
                {
                  src: "https://ethereumcn.mypinata.cloud/ipfs/QmQXqeSj5DfMJLKA5ysnpEMAoyaLgwLyKUpBb8ZsFMGros",
                  type: "Highlight1",
                },
                {
                  src: "https://ethereumcn.mypinata.cloud/ipfs/Qma5UpCATFi7B7u7NVPnQEJXSnHoFJLM1jkVdbfj6tNvpb",
                  type: "Highlight2",
                },
              ],
            },
            {
              heading: "直播回放 video",
              subHeading: "Playback Video",
              type: "video",
              data: [
                {
                  src: `//player.bilibili.com/player.html?aid=303227716&bvid=BV1mP411H7wy&cid=838622911&page=1`,
                  type: "iframe",
                },
              ],
            },
          ],
        } as Prisma.InputJsonValue,
      },
    },
  },
  {
    contractAddress: "0xbBE11F912599ecb054145aAD81674c137bb42657",
    symbol: "ETHGifts",
    nftAppType: "DELIVERY",
    nftDeliveryData: {
      create: {
        merkleUrl:
          "https://raw.githubusercontent.com/EthereumCN-eth/merkle-drop-data-chunks/main/chunks/0x6b7291ed04b90e6b96bc3fce1b7be5cd5bd07297d4be98a397d19e7796048474.json",
        tokenType: "ERC721",
        contractAddress: "0xbBE11F912599ecb054145aAD81674c137bb42657",
      },
    },
    galleryItemBase: {
      create: {
        coverLink:
          "https://ethereumcn.mypinata.cloud/ipfs/QmbcmD88rVTZ2TGLestHQKw78s8RgPce6fDwMpbFMJSSqs",
        imageLinks: [
          "https://ethereumcn.mypinata.cloud/ipfs/QmbcmD88rVTZ2TGLestHQKw78s8RgPce6fDwMpbFMJSSqs",
        ],

        chainId: 10,
        name: "以太坊合并观看派对留言板",
        tags: ["NFT", "参与证明"],
        eventStartTime: 1663222616,
        eventDuration: 7626505,
        onShelf: true,
        galleryItemType: "nft",
        infoDetail: {
          eventDescription: "",
          title: "以太坊合并观看派对留言板",
          subTitle: "Messages Board NFT",
          dataSection: [
            {
              heading: "活动详情",
              subHeading: "Activities",
              type: "html",
              data: [
                "在 2022 年 9 月 15 日，ECN、Ethplanet 与 Crypto Tech Night 在以太坊合并当天共同举办“一起来唠嗑 The Merge” 观看派对，现场连线多位嘉宾对合并、PoS 和 Staking 等话题进行讨论和分享，与现场观众互动，并转播以太坊基金会的直播现场，一起唠嗑，共同经历这个以太坊的历史时刻。",
                "ECN 还为此次观看派对的参与者准备了 “The Merge 留言板 NFT” ，参与者通过在合约页面写入自己的关于以太坊合并的语句，即可铸造一个随机的 The Merge 贴图 NFT，现在，ECN 通过前端，把参与者的留言展示在画布上，形成一个数字留言板 NFT。大家快来找找画布上自己的留言吧！",
              ],
            },
            {
              heading: "活动花絮",
              subHeading: "Highlights",
              type: "image",
              data: [
                {
                  src: "https://ethereumcn.mypinata.cloud/ipfs/QmV5fqKSvxmvavt6VNMy5Hy51EQLwwAczsHE3Y8w1MvAid",
                  alt: "poster",
                },
                {
                  src: "https://ethereumcn.mypinata.cloud/ipfs/QmQXqeSj5DfMJLKA5ysnpEMAoyaLgwLyKUpBb8ZsFMGros",
                  type: "Highlight1",
                },
                {
                  src: "https://ethereumcn.mypinata.cloud/ipfs/Qma5UpCATFi7B7u7NVPnQEJXSnHoFJLM1jkVdbfj6tNvpb",
                  type: "Highlight2",
                },
              ],
            },
            {
              heading: "直播回放 video",
              subHeading: "Playback Video",
              type: "video",
              data: [
                {
                  src: `//player.bilibili.com/player.html?aid=303227716&bvid=BV1mP411H7wy&cid=838622911&page=1`,
                  type: "iframe",
                },
              ],
            },
          ],
        } as Prisma.InputJsonValue,
      },
    },
  },
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
        tags: ["NFT", "参与证明"],
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
        mainViewType: "video",
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
                "2022 年的虎年新春，ECN 组织举办了以太坊社区新春系列活动：<li>We create ——虎年 NFT Bounty 计划，在社区发起以春节、虎年和以太坊为主题的 NFT 设计比赛</li><li>We vote —— NFT 设计比赛的优胜作品由社区投票选出</li><li>We learn and have fun —— ECN 邀请了 Vitalik 来中文社区举行线上访谈和 AMA，与大家互动</li>",
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
          "https://icloud.mypinata.cloud/ipfs/QmVH7jdf5aJpko2BiATUaWAFzHcyX6kU9JPsxidsnW1Jax",
        ],

        name: "The Merge & Weeth",
        chainId: 1,
        tokenType: "ERC1155",
        tokenId:
          "60575999203224897677942571825279155748894443364198416085237471895517392797712",
        galleryItemType: "nft",
        tags: ["NFT", "参与证明"],
        eventStartTime: 1652052946,
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
              heading: "直播回放 video",
              subHeading: "Playback Video",
              type: "video",
              data: [
                {
                  src: "//player.bilibili.com/player.html?aid=896420843&bvid=BV1WA4y1S7hs&cid=716634312&page=1",
                  type: "iframe",
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
        tags: ["NFT", "参与证明"],
        eventStartTime: 1653435346,
        eventDuration: 3600,
        infoDetail: {
          eventDescription: "hello ongoing event description",
          title:
            "The Merge & Weeth 系列活动的第二场：Rocket Pool 如何实现以太坊质押去中心化",
          subTitle: "The Merge and Weeth",
          dataSection: [
            {
              heading: "活动详情",
              subHeading: "Activities",
              type: "html",
              data: [
                "在 2022 年 5 月，在以太坊合并将至未至之际，ECN 举办主题为 The Merge & Weeth —— 以太坊合并与我们的距离的系列活动，在第二场活动邀请了去中心化以太坊质押协议 Rocket Pool 的总经理 Darren Langerly 给大家带来“Rocket Pool 如何实现以太坊质押去中心化”的主题分享。",
                "在 AMA 环节，提前在我们 discrod 进行有效提问的朋友都有机会获得此款 NFT。",
              ],
            },
            {
              heading: "直播回放 video",
              subHeading: "Playback Video",
              type: "video",
              data: [
                {
                  src: `//player.bilibili.com/player.html?aid=641992663&bvid=BV1cY4y1V7JQ&cid=730374576&page=1`,
                  type: "iframe",
                },
              ],
            },
          ],
        } as Prisma.InputJsonValue,
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
        tags: ["NFT", "参与证明"],
        eventStartTime: 1613000146,
        eventDuration: 3600,
        coverLink:
          "https://icloud.mypinata.cloud/ipfs/QmdTy8AmhyikhxCABahQCMfBfcCbM5enNUM1qUs3ELN1D5",
        imageLinks: [
          "https://icloud.mypinata.cloud/ipfs/QmaqcsQTE1jTWbHRexBfGY6RSBfhLDu9r4kb21fB58HjfD",
          "https://icloud.mypinata.cloud/ipfs/QmQdYJfjdxiSU2mYnjgDPiL4joveA9Kx7cHoG2yzB9xTbi",
          "https://icloud.mypinata.cloud/ipfs/Qmana5KvWj2uqEvgZKrpcT4HJrcosWm575UXW3FTDaEtM2",
        ],
        infoDetail: {
          eventDescription: "hello ongoing event description",
          title: "当以太坊遇见虚拟世界和非遗传统文化",
          subTitle: "2021 The Year of 0x",
          dataSection: [
            {
              heading: "活动详情",
              subHeading: "Activities",
              type: "html",
              data: [
                "2021 年 2 月 11 日~14 日，ECN 在 Decentraland 的龙城举行了牛年新春活动，主题为“当以太坊遇见虚拟世界和非遗传统文化”。此次活动内容丰富，奖品特别。ECN 邀请了 AI 和区块链艺术家宋婷 (Twitter@song11ting) 制作此次活动的奖品，包括 Non Fungible Indigo 系列的0号作品和1号作品，以及以以太坊为主题的扎染和蜡染作品，其中的创作理念是，“扎染”是中国非物质文化遗产，古称扎缬、绞缬、夹缬和染缬。“扎”的过程如同创建私钥，“染”的过程如同基于私钥创建公钥。艺术家宋婷也想以区块链技术守护古典技艺瑰宝、传递可持续发展理念。",
              ],
            },
            {
              heading: "NFT制作花絮",
              subHeading: "Showcase",
              type: "image",
              data: [
                {
                  src: "https://ethereumcn.mypinata.cloud/ipfs/QmNZhCC7zkJL7jqfskjZK1pEWwDAWd1vUFBUxDJ7sVjikG",
                  alt: "扎染",
                },
                {
                  src: "https://ethereumcn.mypinata.cloud/ipfs/QmT7ZUCJnvUFbZ8HJfgCp9B8Cs4hSoSmZBYPdpQ4SuGFXd",
                  alt: "蜡染",
                },
              ],
            },
          ],
        } as Prisma.InputJsonValue,
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
        tags: ["NFT", "参与证明"],
        eventStartTime: 1635243208,
        eventDuration: 3600,
        onShelf: true,
        galleryItemType: "nft",

        infoDetail: {
          eventDescription: "hello ongoing event description",
          title: "2021 Shanghai Meetup",
          subTitle: "The Merge Panda",
          dataSection: [
            {
              heading: "活动详情",
              subHeading: "Activities",
              type: "html",
              data: [
                "在 2021 年 10 月 26 日，ECN 携 togETHer 的社区伙伴 (ETHPlanet/DAOSquare/原语里弄/Hiblock/Rebase/BTCU) 在上海举办了以太坊社区 Meetup，现场气氛活跃，干货满满，对多个主题进行了讨论，包括 EIP-1559、以太坊2.0、MEV、DAO、区块链安全等。",
                "ECN 还为此次现场参与的朋友准备了以合并熊猫为主题的生成式 NFT 铸造活动。我们对熊猫的背景、身体、耳朵、眼睛、脸部和嘴巴都进行了多种样式的设计，参与者铸造出来的熊猫是各个部件随机组合的结果，为此次 Meetup 增添了不少乐趣。",
              ],
            },
            {
              heading: "活动海报",
              subHeading: "Poster",
              type: "image",
              data: [
                {
                  src: "https://ethereumcn.mypinata.cloud/ipfs/QmW3eqdAUnVWaKKcbVzkreAxGZjUXBUQLh5GPQbGwCDGYt",
                  alt: "poster",
                },
              ],
            },
            {
              heading: "NFT全景图",
              subHeading: "Review",
              type: "image",
              data: [
                {
                  src: "https://ethereumcn.mypinata.cloud/ipfs/QmbV6qK79ibRH8psJsnuf2vjrXLSNAtkCRi8Mx1TAhahzJ",
                  type: "Review",
                },
              ],
            },
          ],
        } as Prisma.InputJsonValue,
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
        tags: ["NFT", "参与证明"],
        eventStartTime: 1664237148,
        eventDuration: 3600,
        onShelf: true,
        galleryItemType: "nft",
        infoDetail: {
          eventDescription: "hello ongoing event description",
          title: "Learn and Earn with imToken",
          subTitle: "The Merge of Ethereum",
          dataSection: [
            {
              heading: "活动详情",
              subHeading: "Activities",
              type: "html",
              data: [
                "ECN 有幸受邀与 imToken 联合举办此次以太坊合并主题活动。<br>学习以太坊合并知识并完成答题，即可赢取 imToken 以太坊升级系列 NFT 和 5000 USDC。<br>以太坊已于 2022 年 9 月 15 日完成期待已久的合并，从 PoW 共识机制顺利升级至 PoS。",
                "那么：<li>什么是以太坊合并？<li>以太坊会走向哪里？<li>什么是以太坊质押？<li>我该如何选择并参与质押？",
                "参加此次活动，在学习以太坊合并的同时还有 NFT 和奖金等大家拿！<br>活动入口：https://www.campaign.token.im/zh",
              ],
            },
            {
              heading: "活动海报",
              subHeading: "Poster",
              type: "image",
              data: [
                {
                  src: "https://ethereumcn.mypinata.cloud/ipfs/Qmakhp7gnHcVq8Fi13ZkGPPN4ckcY7iDmzVA4bpUnJuXLw",
                  alt: "poster",
                },
              ],
            },
          ],
        } as Prisma.InputJsonValue,
      },
    },
  },
];
