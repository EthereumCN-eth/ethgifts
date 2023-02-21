import type { IconDataType } from "./types";

export const data: IconDataType[] = [
  {
    text: "工作量证明",
    imageSrc: "/powin.png",
    imgOutSrc: "/powout.png",
    descLines: [
      "可量化贡献，随时查看领取进度",
      "资讯贡献内容上传至IPFS",
      "经验证铸造或发行",
      "等效链上链下凭证",
    ],
    bgColor: "rgba(236, 241, 254, 0.6)",
  },
  {
    text: "技能证明",
    imageSrc: "/posin.png",
    imgOutSrc: "/posout.png",
    descLines: ["质量受认可发布", "翻译内容上传至IPFS", "经验证铸造或发行"],
    bgColor: "rgba(254, 249, 236, 0.6)",
  },
  {
    text: "知识证明",
    imageSrc: "/pokin.png",
    imgOutSrc: "/pokout.png",
    descLines: ["质量受认可发布", "原创内容上传至IPFS", "经验证铸造或发行"],
    bgColor: "rgba(254, 236, 236, 0.6)",
  },
  {
    text: "参与证明",
    imageSrc: "/popin.png",
    imgOutSrc: "/popout.png",
    descLines: ["反映 NFT 所有者的志趣", "展示你的社区活跃程度"],
    bgColor: "rgba(236, 254, 243, 0.6)",
  },
];
