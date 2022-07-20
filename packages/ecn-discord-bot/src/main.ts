import { createModal } from "./commands/comp/createModal";
import { executeAll } from "./commands/index";
import "dotenv/config";
import axios from "axios";
import { isAddress } from "@ethersproject/address";
// Require the necessary discord.js classes

import { DISCORD_TOKEN, CHANNEL_ID } from "./constants";
import { client } from "./client";
import {
  ButtonInteraction,
  CacheType,
  CommandInteraction,
  MessageReaction,
  TextChannel,
} from "discord.js";
import { createBtnComp } from "./commands/comp/btn";

const [WrongEthAddrbtn, repromptCb] = createBtnComp({
  btnId: "repromptEth",
  label: "Wrong ETH Address. Please resubmit.",
  style: "PRIMARY",
  callbackTop: async (interaction) => {
    await ethModalPrompt(interaction);
  },
});

const ethModalPrompt = createModal({
  id: "modal-eth-address",
  inputs: [
    {
      id: "input-eth-address",
      label: "input-eth-address",
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

      await interaction.editReply({
        content: " eth address right. got u.",
      });
    } else {
      await interaction.reply({
        content: "please get the eth address right",
        components: [WrongEthAddrbtn],
        ephemeral: true,
      });
    }
  },
  // callbackTopToRun: async (interaction) => {
  //   await repromptCb(interaction);
  // },
});

const [getEthAddressbtnComp, cb] = createBtnComp({
  btnId: "updateEth",
  label: "ETH Address",
  style: "PRIMARY",
  callbackTop: async (interaction) => {
    // # TODO check has eth address(discordId)
    await ethModalPrompt(interaction);
  },
});
// When the client is ready, run this code (only once)
client.once("ready", () => {
  console.log("Ready!");
});

client.on("interactionCreate", async (interaction) => {
  console.log("interactionCreate: ");
  await cb(interaction);
  await repromptCb(interaction);
  return;
});

client.on("messageCreate", async (msg) => {
  console.log("ct: ", msg);
  if (
    msg.channelId === CHANNEL_ID &&
    msg.content &&
    msg.content.includes("https")
  ) {
    const msgPayload = {
      rawMessage: msg.content,
      discordId: msg.author.id,
      discordName: msg.author.username,
    };
    try {
      const results = await axios.post<{
        success: boolean;
        data?: {
          discordName: string | null;
          userId: string;
          rawMessage: string;
          parsedUrl: string;
          parsedMessage: string;
          user: {
            ethAddress: string | null;
          };
        };
      }>("http://localhost:3010/addRawMessage", msgPayload);
      console.log("res:", results.data);
      if (results.data.success) {
        // await msg.reply("gota u");
        if (!results.data.data?.user.ethAddress) {
          await (client.channels.cache.get(CHANNEL_ID) as TextChannel).send({
            content:
              "Hello here! Let us know your eth address for the orange juice!",
            components: [getEthAddressbtnComp],
          });
        }
      }
    } catch (e) {
      console.log("addRawMessage error:", e);
    }
  }
});

const IfSpecificChan = (inputMsg: MessageReaction): boolean => {
  return (
    inputMsg.message.channelId === CHANNEL_ID &&
    inputMsg.count == 1 &&
    inputMsg.emoji.name === "verifiedMsg"
  );
};

client.on("messageReactionAdd", async (reaction, user) => {
  // When a reaction is received, check if the structure is partial
  if (reaction.partial) {
    // If the message this reaction belongs to was removed, the fetching might result in an API error which should be handled
    try {
      const fullMessage = await reaction.fetch();

      console.log("part react");
      if (IfSpecificChan(fullMessage)) {
        console.log("gota");
        (client.channels.cache.get("995978559556427857") as TextChannel).send(
          `gota: ${reaction.message.content} from ${user.username}`
        );
      }
    } catch (error) {
      console.error("Something went wrong when fetching the message:", error);
      // Return as `reaction.message.author` may be undefined/null
      return;
    }
  } else {
    console.log("full react: ");
    if (IfSpecificChan(reaction)) {
      console.log("gota");
      (client.channels.cache.get("995978559556427857") as TextChannel).send(
        `gota: ${reaction.message.content} from ${reaction.message.author}`
      );
    }
  }
});

// Login to Discord with your client's token
client.login(DISCORD_TOKEN);
