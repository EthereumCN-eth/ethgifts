import { executeAll } from "./commands/index";
import "dotenv/config";
import axios from "axios";
// Require the necessary discord.js classes

import { DISCORD_TOKEN, CHANNEL_ID } from "./constants";
import { client } from "./client";
import { MessageReaction, TextChannel } from "discord.js";

// When the client is ready, run this code (only once)
client.once("ready", () => {
  console.log("Ready!");
});

client.on("interactionCreate", async (interaction) => {
  await executeAll(interaction);
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
      discordName: string | null;
      discordId: string;
      rawMessage: string;
    }>("http://localhost:3010/addRawMessage", msgPayload);
    console.log("res:", results.data);
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
