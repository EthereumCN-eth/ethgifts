import {
  ButtonInteraction,
  CacheType,
  CommandInteraction,
  Interaction,
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
  callbackModal?: (a0: any) => void;
  replyoptions?: string | MessagePayload | WebhookEditMessageOptions;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  callbackTopToRun?: (a0: any) => void;
};

export const createModal =
  ({
    id,
    title,
    inputs,
    time,
    callbackModal,
    replyoptions,
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
    if (callbackModal && replyoptions) {
      await submitModal.deferReply();
      await callbackModal(submitOps);
      await submitModal.editReply(replyoptions);
    }
    return;
  };
