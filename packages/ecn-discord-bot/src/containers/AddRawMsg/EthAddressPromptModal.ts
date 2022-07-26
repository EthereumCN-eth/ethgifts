import { createBtn } from "../../comps/createBtn";
import { createModalWithInteraction } from "../../comps/createModalWithInteraction";
import { isAddress } from "@ethersproject/address";
import { updateAddressApi, userHasAddressApi } from "../../api";
import { lastest_no_address_discordId } from "../../constants";
import { CacheType, Interaction } from "discord.js";

const { btn: repromptEthAddrbtn, btnCb: repromptCb } = createBtn({
  btnId: "reprompt-EthAddress-btn",
  label: "Wrong ETH Address. Please resubmit.",
  style: "PRIMARY",
  callbackTop: async (interaction) => {
    await ethPromptModal(interaction);
  },
});
const { btn: submitEthAddrbtn, btnCb: submitCb } = createBtn({
  btnId: "submit-EthAddress-btn",
  label: "click to input eth address",
  style: "PRIMARY",
  callbackTop: async (interaction) => {
    await ethPromptModal(interaction);
  },
});

const ethPromptModal = createModalWithInteraction({
  id: "ask-ethAddress-modal",
  inputs: [
    {
      id: "ask-ethAddress-input",
      label: "ask-ethAddress-input",
      style: "SHORT",
    },
  ],
  time: 300000,
  title: "Get Eth Address",
  callbackModal: async (interaction, [userAddress]: string[]) => {
    // invalid eth address
    if (isAddress(userAddress)) {
      await interaction.deferReply({
        ephemeral: true,
      });
      // # TODO make sure eth address not existed
      // # TODO send api to collect
      const discordId = interaction.user.id;
      const discordName = interaction.user.username;
      const { success, error } = await updateAddressApi({
        discordId,
        discordName,
        ethAddress: userAddress,
      });
      if (success) {
        await interaction.editReply({
          content: ` eth address right. got u ${userAddress}.`,
        });
      } else {
        await interaction.editReply({
          content: `something went wrong: ${error}.`,
        });
      }
    } else {
      await interaction.reply({
        content: "please get the eth address right",
        components: [repromptEthAddrbtn],
        ephemeral: true,
      });
    }
  },
  // callbackTopToRun: async (interaction) => {
  //   await repromptCb(interaction);
  // },
});

const { btn: getEthAddressbtnComp, btnCb: promptCb } = createBtn({
  btnId: "prompt-ethAddress-btn",
  label: "ETH Address",
  style: "PRIMARY",
  callbackTop: async (interaction) => {
    // # TODO check has eth address(discordId)
    const discordId = interaction.user.id;
    console.log("dsid:", discordId);
    console.log("late: ", lastest_no_address_discordId);
    if (discordId === lastest_no_address_discordId.get("latest")) {
      await ethPromptModal(interaction);
      lastest_no_address_discordId.set("latest", null);
      return;
    }
    await interaction.deferReply({ ephemeral: true });
    const { success, hasEthAddress, user } = await userHasAddressApi({
      discordId,
    });
    if (success) {
      if (hasEthAddress && user) {
        await interaction.editReply({
          content: `your address is ${user?.ethAddress}`,
        });
      } else {
        // await ethModalPrompt(interaction);
        await interaction.editReply({
          content: "click to input eth address",
          components: [submitEthAddrbtn],
        });
      }
    } else {
      //
      await interaction.editReply("something went wrong.");
    }
  },
});

export const createEthAdressModalContainer = () => {
  return {
    getEthAddressbtnComp,
    allEthAddressCbs: async (interaction: Interaction<CacheType>) => {
      await promptCb(interaction);
      await repromptCb(interaction);
      await submitCb(interaction);
    },
  };
};
