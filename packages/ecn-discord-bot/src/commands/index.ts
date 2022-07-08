import { ButtonInteraction, CacheType, Interaction } from "discord.js";
import { CommandInteraction } from "discord.js";
import { RESTPostAPIApplicationCommandsJSONBody } from "discord-api-types/v9";
import {
  name as pingName,
  command as pingCommand,
  execute as pingExecute,
} from "./ping";

export const commands: RESTPostAPIApplicationCommandsJSONBody[] = [
  pingCommand,
].map((command) => command.toJSON());

type ECNInteraction =
  | CommandInteraction<CacheType>
  | ButtonInteraction<CacheType>;

type TExecuteFn = (interaction: ECNInteraction) => Promise<void>;

const commandToExcute: Record<string, TExecuteFn | undefined> = {
  [pingName]: pingExecute,
};

export const executeAll = async (interaction: Interaction<CacheType>) => {
  if (interaction.isCommand()) {
    const { commandName } = interaction;
    const executeFn = commandToExcute[commandName];
    if (executeFn) {
      await executeFn(interaction);
    }
  }
  if (interaction.isButton()) {
    if (interaction.customId) {
      const commandName = interaction.customId.split("-").pop();
      if (commandName) {
        const executeFn = commandToExcute[commandName];
        if (executeFn && commandName) {
          await executeFn(interaction);
        }
      }
    }
  }
};
