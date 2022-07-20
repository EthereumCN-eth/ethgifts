import {
  APIActionRowComponent,
  APIMessageActionRowComponent,
} from "discord-api-types/v9";
import {
  MessageButton,
  MessageActionRow,
  MessageActionRowComponent,
  MessageActionRowComponentResolvable,
  MessageButtonStyleResolvable,
  Interaction,
  CacheType,
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

type TBtnParams = {
  btnId: string;
  label: string;
  style: MessageButtonStyleResolvable;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  callbackTop?: (a0: any) => void;
};

export const createBtnComp = ({
  btnId,
  label,
  style = "PRIMARY",
  callbackTop,
}: TBtnParams): [
  MessageActionRow<
    MessageActionRowComponent,
    MessageActionRowComponentResolvable,
    APIActionRowComponent<APIMessageActionRowComponent>
  >,
  (a0: any) => void
] => {
  const cb = (interaction: Interaction<CacheType>) => {
    if (interaction.isButton() && interaction.customId) {
      if (interaction.customId === btnId) {
        callbackTop && callbackTop(interaction);
      }
    }
  };
  return [
    new MessageActionRow().addComponents(
      new MessageButton().setCustomId(btnId).setLabel(label).setStyle(style)
    ),
    cb,
  ];

  // return btnCache.get(key);
};
