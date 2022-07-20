import {
  ButtonInteraction,
  CacheType,
  CommandInteraction,
  Interaction,
  InteractionReplyOptions,
  MessageActionRow,
  MessagePayload,
  Modal,
  ModalActionRowComponent,
  ModalSubmitInteraction,
  TextInputComponent,
  TextInputStyleResolvable,
  WebhookEditMessageOptions,
} from "discord.js";

type TInputParams = {
  id: string;
  label: string;
  style: TextInputStyleResolvable;
};
type TModalParams = {
  id: string;
  title: string;
  inputs: TInputParams[];
  time: number;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  callbackModal?: (
    interaction: ModalSubmitInteraction<CacheType>,
    fields: string[]
  ) => void;
  followUpOptions?: string | MessagePayload | InteractionReplyOptions;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  callbackTopToRun?: (
    interaction: CommandInteraction<CacheType> | ButtonInteraction<CacheType>
  ) => void;
};

export const createModal =
  ({
    id,
    title,
    inputs,
    time,
    callbackModal,
    followUpOptions,
    callbackTopToRun,
  }: TModalParams) =>
  async (
    interaction: CommandInteraction<CacheType> | ButtonInteraction<CacheType>
  ) => {
    if (callbackTopToRun) await callbackTopToRun(interaction);
    const modal = new Modal().setCustomId(id).setTitle(title);
    const ActionRows = inputs.map(({ id, label, style }) => {
      return new MessageActionRow<ModalActionRowComponent>().addComponents(
        new TextInputComponent()
          .setCustomId(id)
          .setLabel(label)
          // Paragraph means multiple lines of text.
          .setStyle(style)
      );
    });
    modal.addComponents(...ActionRows);
    await interaction.showModal(modal);
    try {
      const submitModal: ModalSubmitInteraction =
        await interaction.awaitModalSubmit({
          time,
          filter: (modalInteraction: ModalSubmitInteraction) =>
            modalInteraction.user.id === interaction.user.id &&
            modalInteraction.customId === modal.customId,
        });
      const submitOps = inputs.map(({ label }) =>
        submitModal.fields.getTextInputValue(label)
      );
      if (callbackModal) {
        await callbackModal(submitModal, submitOps);
        if (followUpOptions) {
          await submitModal.followUp(followUpOptions);
        }
      }
    } catch (err) {
      console.log(`No interactions were collected.`);
    }

    return;
  };
