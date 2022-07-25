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
  ButtonInteraction,
} from "discord.js";

type TBtnParams = {
  btnId: string;
  label: string;
  style: MessageButtonStyleResolvable;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  callbackTop?: (a0: ButtonInteraction<CacheType>) => void;
};

export const createBtn = ({
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (a0: any) => void
] => {
  const btn = new MessageActionRow().addComponents(
    new MessageButton().setCustomId(btnId).setLabel(label).setStyle(style)
  );
  const cb = async (interaction: Interaction<CacheType>) => {
    if (interaction.isButton() && interaction.customId) {
      if (interaction.customId === btnId && callbackTop) {
        await callbackTop(interaction);
      }
    }
  };
  return [btn, cb];

  // return btnCache.get(key);
};
