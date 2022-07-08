import { Client, Intents } from "discord.js";
// Create a new client instance
export const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
