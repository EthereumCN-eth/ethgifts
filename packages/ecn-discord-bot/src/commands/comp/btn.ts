import {
  APIActionRowComponent,
  APIMessageActionRowComponent,
} from "discord-api-types/v9";
import {
  MessageButton,
  MessageActionRow,
  MessageActionRowComponent,
  MessageActionRowComponentResolvable,
} from "discord.js";

export const resubmitButton = new MessageButton()
  .setCustomId("express-resubmit-ping")
  .setLabel("Resubmit")
  .setStyle("PRIMARY");

export const resubmitButtonRow: MessageActionRow<
  MessageActionRowComponent,
  MessageActionRowComponentResolvable,
  APIActionRowComponent<APIMessageActionRowComponent>
> = new MessageActionRow().addComponents(resubmitButton);
