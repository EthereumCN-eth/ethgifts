import { Prisma } from "@prisma/client";
import { PoapCreateData } from "./seed";

export const poaps: PoapCreateData[] = [
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
        tags: ["POAP", "贡献证明"],
        eventStartTime: 1652054748,
        eventDuration: 3600,
        infoDetail: {
          deliveryText: {
            beforeText: "申领还没开始",
            toClaimText: `🍻🥳你在 2022 年 2 月 4 日农历新年参加了“新春 Vitalik 线上直播”活动，获得了此次活动的纪念 POAP`,
            hasClaimedText: `🍻🥳你在 2022 年 2 月 4 日农历新年参加了“新春 Vitalik 线上直播”活动，获得了此次活动的纪念 POAP`,
            noClaimedText: `🙁 你错过了2022 年 2 月 4 日“新春 Vitalik 线上直播”活动的 POAP，但未来 ECN 还有很多活动等待你的参与哦🥰`,
            endedNoText: `🙁 你错过了2022 年 2 月 4 日“新春 Vitalik 线上直播”活动的 POAP，但未来 ECN 还有很多活动等待你的参与哦🥰`,
          },
          eventDescription: "",
          title: "The Merge & Weeth 系列活动课代表计划",
          subTitle: "Community Support Project",
          dataSection: [
            {
              heading: "活动详情",
              subHeading: "Activities",
              type: "html",
              data: [
                "在 2022 年 5 月，在以太坊合并将至未至之际，ECN 联合区块律动、链捕手、巴比特 和 DeFi 之道，举办主题为 The Merge & Weeth —— 以太坊合并与我们的距离的活动，邀请了以太坊基金会研究员🥳 Hsiao-Wei Wang (合并熊猫 🐼 这个 meme 的创作者)以及去中心化质押服务提供商🤟 Rocket Pool 的总经理 Darren Langerly 给大家带来主题分享+AMA，解答大家关于合并与 Staking 尽可能多的疑问。 ",
                "此外，ECN 在此次活动还设计了社区互动环节——“课代表”评选，活动中给大家分享相关资料帮助理解，或者担任野生字幕君的社区成员都有机会获得此款限量版 POAP。",
              ],
            },
            {
              heading: "活动海报",
              subHeading: "Poster",
              type: "image",
              data: [
                {
                  src: "https://ethereumcn.mypinata.cloud/ipfs/QmbkADv27C6ZVMQBKr78QEvesbvvqjdXpUiM6jWG58Ca6L",
                  alt: "poster",
                },
                {
                  src: "https://ethereumcn.mypinata.cloud/ipfs/QmNyXywDs296Wd6vufb6eVRMSTrZxBgDRpvXuyDZWrXiHy",
                  alt: "poster",
                },
              ],
            },
          ],
        } as Prisma.InputJsonValue,
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
        tags: ["POAP", "参与证明"],
        eventStartTime: 1643933148,
        eventDuration: 3600,
        infoDetail: {
          deliveryText: {
            beforeText: "申领还没开始",
            toClaimText: `🍻🥳你在 2022 年 5 月参与了 ECN 举办的“The Merge & Weeth 合并主题系列直播活动”并主动担任活动“课代表”，获得了限量 POAP，感谢你的参与♥️`,
            hasClaimedText: `🍻🥳你在 2022 年 5 月参与了 ECN 举办的“The Merge & Weeth 合并主题系列直播活动”并主动担任活动“课代表”，获得了限量 POAP，感谢你的参与♥️`,
            noClaimedText: `🙁 你错过了2022 年 5 月“The Merge & Weeth 合并主题系列直播活动”的课代表 POAP ，但未来 ECN 还有很多活动等待你的参与哦🥰`,
            endedNoText: `🙁 你错过了2022 年 5 月“The Merge & Weeth 合并主题系列直播活动”的课代表 POAP ，但未来 ECN 还有很多活动等待你的参与哦🥰`,
          },
          eventDescription: "hello ongoing event description",
          title: "2022 新春访谈&AMA with Vitalik",
          subTitle: "Chinese New Year with Vitalik",
          dataSection: [
            {
              heading: "活动详情",
              subHeading: "Activities",
              type: "html",
              data: [
                "2022 年 2 月 4 日大年初四，ECN 邀请了以太坊联合创始人 Vitalik Buterin 来中文社区过年，通过线上访谈和 AMA 的形式与大家互动，主题聚焦以太坊过去一年的发展以及对新岁的展望。活动期间，Vitalik 向以太坊中文社区拜年，并对以太坊未来一年的发展致以祝福。",
                "活动除了在 Bilibili (以太坊中国) 上直播，还在 Decentraland 的Dragon City上同步直播，把中国农历新年的庆祝氛围带到了虚拟世界。",
              ],
            },
            {
              heading: "活动花絮",
              subHeading: "highlights",
              type: "image",
              data: [
                {
                  src: "https://ethereumcn.mypinata.cloud/ipfs/QmRjq2amwaG7ZZKfqCAzjAi8Lr9Zfc1Q3ddQxNUvhQX5VQ",
                  alt: "highlights",
                },
              ],
            },
            {
              heading: "直播回放 video",
              subHeading: "Playback Video",
              type: "video",
              data: [
                {
                  src: `//player.bilibili.com/player.html?aid=593785919&bvid=BV1Gq4y1b7pZ&cid=503275322&page=1`,
                  type: "iframe",
                },
              ],
            },
          ],
        } as Prisma.InputJsonValue,
      },
    },
  },
];
