import "dotenv/config";

import { DISCORD_TOKEN } from "./constants";
import { client } from "./client";
// import { MessageReaction, TextChannel } from "discord.js";
import { AddRawMsg } from "./containers/AddRawMsg";
import { createEthAdressModalContainer } from "./containers/AddRawMsg/EthAddressPromptModal";

import { verifyRawMsg, verifyBtnCb } from "./containers/verifyRawMsg";

import discordModals from "discord-modals"; // Define the discord-modals package!
discordModals(client); // discord-modals needs your client in order to interact with modals

const { allEthAddressCbs, getEthAddressbtnComp } =
  createEthAdressModalContainer();

// When the client is ready, run this code (only once)
client.once("ready", () => {
  console.log("Ready!");
});

client.on("interactionCreate", async (interaction) => {
  console.log("interactionCreate: ");
  await allEthAddressCbs(interaction);
  await verifyBtnCb(interaction);
  return;
});

client.on("messageCreate", async (msg) => {
  console.log("messageCreate: ");
  await AddRawMsg(msg, getEthAddressbtnComp, client);
});

client.on("messageReactionAdd", async (reaction, user) => {
  await verifyRawMsg(reaction, user);
});

// Login to Discord with your client's token
client.login(DISCORD_TOKEN);

client.on("shardError", (error) => {
  console.error("A websocket connection encountered an error:", error);
});
