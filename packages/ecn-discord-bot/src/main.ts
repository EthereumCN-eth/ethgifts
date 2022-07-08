import { executeAll } from "./commands/index";
import "dotenv/config";
// Require the necessary discord.js classes

import { DISCORD_TOKEN } from "./constants";
import { client } from "./client";

// When the client is ready, run this code (only once)
client.once("ready", () => {
  console.log("Ready!");
});

client.on("interactionCreate", async (interaction) => {
  await executeAll(interaction);
  return;
});

// Login to Discord with your client's token
client.login(DISCORD_TOKEN);
