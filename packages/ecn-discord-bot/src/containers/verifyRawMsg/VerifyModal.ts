import { addMsgApi } from "./../../api/index";
/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  Modal,
  // ModalSubmitInteraction,
  SelectMenuComponent,
  showModal,
  TextInputComponent
} from "discord-modals";
import {
  CacheType,
  Interaction,
  MessageActionRow,
  MessageButton,
  ModalSubmitInteraction
} from "discord.js";
import { findRawMsg } from "../../api";
import { client } from "../../client";
import { createBtn } from "../../comps/createBtn";
import { express_modal_options } from "../../trans";

// const modal: Modal | null = null;
export const modifiedVerifyExpressModal = ({
  content,
  url,
  msgId,
  discordId
}: // discordId,
// msgId,
{
  content: string;
  url: string;
  msgId: string;
  discordId: string;
}) => {
  const modal = new Modal() // We create a Modal
    .setCustomId(`verify-express-modal-${discordId}-${msgId}`)
    .setTitle(`Verify Express Message`)
    .addComponents(
      new TextInputComponent() // We create a Text Input Component
        .setCustomId("verify-express-msg-input")
        .setLabel("content")
        .setStyle("LONG") //IMPORTANT: Text Input Component Style can be 'SHORT' or 'LONG'
        // .setPlaceholder(content)
        .setDefaultValue(content)
        .setRequired(true), // If it's required or not
      new TextInputComponent() // We create a Text Input Component
        .setCustomId("verify-express-msg-url")
        .setLabel("url")
        .setStyle("LONG") //IMPORTANT: Text Input Component Style can be 'SHORT' or 'LONG'
        // .setDefaultValue(url)
        .setDefaultValue(url)
        .setRequired(true) // If it's required or not
    )
    .addComponents(
      new TextInputComponent() // We create a Text Input Component
        .setCustomId("verify-express-select")
        .setLabel(`options: ${express_modal_options} (lowercase)`)
        .setStyle("LONG") //IMPORTANT: Text Input Component Style can be 'SHORT' or 'LONG'
        .setDefaultValue(url)
        .setPlaceholder(express_modal_options)
        .setDefaultValue("")
        .setRequired(true) // If it's required or not
    );
  // .addComponents(
  //   new SelectMenuComponent() // We create a Select Menu Component
  //     .setCustomId("verify-express-select")
  //     .setPlaceholder("What topic?")
  //     .addOptions(...express_modal_options)
  // );
  return modal;
};

export const modifiedVerifyBtn = () => {
  const makeVerifyBtnFunc = ({
    msgId,
    discordId
  }: {
    msgId: string;
    discordId: string;
  }) =>
    new MessageActionRow().setComponents(
      new MessageButton()
        .setCustomId(`verify-expresss-btn-${discordId}-${msgId}`)
        .setLabel(`Verify above Express`)
        .setStyle("PRIMARY")
    );

  const verifyBtnCb = async (interaction: Interaction<CacheType>) => {
    if (interaction.isButton() && interaction.customId) {
      if (interaction.customId.startsWith("verify-expresss-btn-")) {
        console.log("cid", interaction.customId);
        const data = interaction.customId.split("-");
        console.log("btn data", data);
        const msgId = data.pop() || null;
        const discordId = data.pop() || null;
        let content = "";
        let url = "";
        if (msgId && discordId) {
          // msgId = msgId
          const { success, data } = await findRawMsg({
            msgId
          });
          if (success) {
            content = data?.data?.parsedMessage || "";
            url = data?.data?.parsedUrl || "";
          }
          await showModal(
            modifiedVerifyExpressModal({
              content,
              url,
              msgId,
              discordId
            }),
            {
              client, // Client to show the Modal through the Discord API.
              interaction // Show the modal with interaction data.
            }
          );
        }
        // interaction.message.
      }
    }
  };

  const verifyModalCb = async (modal: ModalSubmitInteraction<CacheType>) => {
    if (modal.customId.startsWith("verify-express-modal")) {
      const data = modal.customId.split("-");
      console.log("data", data);

      const msgId = data.pop() || null;
      const discordId = data.pop() || null;
      //@ts-ignore
      const content = modal.getTextInputValue("verify-express-msg-input");
      //@ts-ignore
      const url = modal.getTextInputValue("verify-express-msg-url");
      //@ts-ignore
      const contentType = modal.getTextInputValue("verify-express-select");
      // const topics = modal.getSelectMenuValues("verify-express-select");
      // const [contentType] = topics;
      if (msgId && discordId) {
        await modal.deferReply();
        const { success, data } = await addMsgApi({
          content,
          url,
          contentType,
          msgId,
          discordId
        });
        if (success) {
          await modal.editReply(
            `✅ Verified .\n msgId ${msgId} \n content: ${data?.expressMessage}`
          );
          return;
        }
      }
      await modal.editReply(
        `❌ failed; try again later.\n msgId ${msgId} \n; or duplicate msgId(added previously) or invalid option`
      );
      return;
    }
  };

  return {
    makeVerifyBtnFunc,
    verifyBtnCb,
    verifyModalCb
  };
};
