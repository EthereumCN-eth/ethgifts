import { createModal } from "./commands/comp/createModal";
import { executeAll } from "./commands/index";
import "dotenv/config";
import axios from "axios";
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

const ethModalPrompt = createModal({
  id: "modal-eth-address",
  inputs: [
    {
      id: "ethAddress",
      label: "eth-address",
      style: "SHORT",
    },
  ],
  time: 300000,
  title: "Get Eth Address",
});

const btnToModal = async (
  interaction: CommandInteraction<CacheType> | ButtonInteraction<CacheType>
) => {
  await ethModalPrompt(interaction);
};

const [btnComp, cb] = createBtnComp({
  btnId: "updateEth",
  label: "ETH Address",
  style: "PRIMARY",
  callbackTop: async (interaction) => {
    btnToModal(interaction);
  },
});
// When the client is ready, run this code (only once)
client.once("ready", () => {
  console.log("Ready!");
  const dayMillseconds = 1000 * 30;
  setInterval(function () {
    // repeat this every 24 hours
    (client.channels.cache.get(CHANNEL_ID) as TextChannel).send({
      content: "Hello here!",
      components: [btnComp],
    });
  }, dayMillseconds);
});

client.on("interactionCreate", async (interaction) => {
  console.log("interactionCreate: ");
  cb(interaction);
  return;
});

client.on("messageCreate", async (msg) => {
  console.log("ct: ", msg);
  if (msg.channelId === CHANNEL_ID) {
    const msgPayload = {
      rawMessage: msg.content,
      discordId: msg.author.id,
      discordName: msg.author.username,
    };
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
      if (results.data.data?.user.ethAddress) {
        msg.reply({
          content: "we would like to know your eth address",
          components: [],
          // ephemeral: true,
        });
      }
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
