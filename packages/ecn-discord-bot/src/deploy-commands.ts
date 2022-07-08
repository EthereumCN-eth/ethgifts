import "dotenv/config";
import { APP_ID, DISCORD_TOKEN, GUILD_ID } from "./constants";

import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { commands } from "./commands";

const rest = new REST({ version: "9" }).setToken(DISCORD_TOKEN);

rest
  .put(Routes.applicationGuildCommands(APP_ID, GUILD_ID), { body: commands })
  .then(() => console.log("Successfully registered application commands."))
  .catch(console.error);
