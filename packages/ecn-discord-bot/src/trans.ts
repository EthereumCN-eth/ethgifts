// export const trans = {
//   AddRawMsg: {
//     address_prompt:
//       "Hello here! Let us know your eth address for the orange juice!",
//     address_prompt_btn_txt: "ETH Address",
//     address_prompt_existed: (addr: string) => `your address is ${addr}`,
//     address_prompt_ask: "click to input eth address",
//     address_prompt_ask_btn_txt: "click to input eth address",
//     address_prompt_wrong: "something went wrong",
//     address_modal_title: "Get Eth Address",
//     address_modal_label: "ask-ethAddress-input",
//     address_modal_reply_accept: (userAddress: string) =>
//       `eth address right. got u ${userAddress}`,
//     address_modal_reply_reject: (error: string) =>
//       `something went wrong. ${error}`,
//     address_modal_reply_wrong_format: "please get the eth address right",
//     address_modal_relpy_wrong_format_btn_txt:
//       '"Wrong ETH Address. Please resubmit."',
//   },
// };

export const trans = {
  AddRawMsg: {
    address_prompt:
      "感谢参与E群誌编辑，提交你的ETH地址以记录 E 群誌 SBT 的贡献数量 (请注意：SBT 是不可转让的，请慎重选择地址)",

    address_prompt_btn_txt: "ETH地址",

    address_prompt_existed: (addr: string) => `你的地址是 ${addr}`,

    address_prompt_ask: "点击输入你的ETH地址",

    address_prompt_ask_btn_txt: "点击输入你的ETH地址",

    address_prompt_wrong: "啊噢，出错了",

    address_modal_title: "收集ETH地址",

    // address_modal_label: "ETH-Address",

    address_modal_label: "请输入ETH地址",

    address_modal_reply_accept: (userAddress: string) =>
      `输入正确！这是你的ETH地址 ${userAddress}`,

    address_modal_reply_reject: (error: string) => `啊噢，出错了 ${error}`,

    address_modal_reply_wrong_format: "请输入正确的ETH地址",

    address_modal_relpy_wrong_format_btn_txt: '"非ETH地址，请重新提交"',
  },
};

export const express_modal_options = `Mainnet、Layer2、Staking、MEV、Cryptography、Tool&Tech、DeFi、NFT、SocioFi、Ecosystem`;
export const express_modal_options_array = express_modal_options.split(`、`);
export const express_modal_options_lowercase_array =
  express_modal_options_array.map((name) => name.toLowerCase());
