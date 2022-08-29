export const trans = {
  AddRawMsg: {
    address_prompt:
      "Hello here! Let us know your eth address for the orange juice!",
    address_prompt_btn_txt: "ETH Address",
    address_prompt_existed: (addr: string) => `your address is ${addr}`,
    address_prompt_ask: "click to input eth address",
    address_prompt_wrong: "something went wrong",
    address_modal_title: "Get Eth Address",
    address_modal_label: "ask-ethAddress-input",
    address_modal_reply_accept: (userAddress: string) =>
      `eth address right. got u ${userAddress}`,
    address_modal_reply_reject: (error: string) =>
      `something went wrong. ${error}`,
    address_modal_reply_wrong_format: "please get the eth address right"
  }
};

export const express_modal_options = [
  {
    label: "eth2",
    description: "the now of future.",
    value: "eth2"
  },
  {
    label: "defi",
    description: "Some people hate it, some people like it.",
    value: "defi"
  }
];
