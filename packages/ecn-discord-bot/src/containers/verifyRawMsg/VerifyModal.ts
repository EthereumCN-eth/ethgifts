import {
  APIActionRowComponent,
  APIMessageActionRowComponent,
} from "discord-api-types/v9";
import {
  Modal,
  SelectMenuComponent,
  showModal,
  TextInputComponent,
} from "discord-modals";
import {
  ButtonInteraction,
  CacheType,
  Interaction,
  MessageActionRow,
  MessageActionRowComponent,
  MessageActionRowComponentResolvable,
  MessageButton,
} from "discord.js";
import { findRawMsg } from "../../api";
import { client } from "../../client";
import { createBtn } from "../../comps/createBtn";

// const modal: Modal | null = null;
export const modifiedVerifyExpressModal = ({
  content,
  url,
}: // discordId,
// msgId,
{
  content: string;
  url: string;
  // contentType: string;
}) => {
  const modal = new Modal() // We create a Modal
    .setCustomId("verify-express-modal")
    .setTitle("Modal")
    .addComponents(
      new TextInputComponent() // We create a Text Input Component
        .setCustomId("verify-express-msg-input")
        .setLabel("content")
        .setStyle("SHORT") //IMPORTANT: Text Input Component Style can be 'SHORT' or 'LONG'
        .setPlaceholder(content)
        .setDefaultValue(content)
        .setRequired(true), // If it's required or not
      new TextInputComponent() // We create a Text Input Component
        .setCustomId("verify-express-msg-url")
        .setLabel("url")
        .setStyle("SHORT") //IMPORTANT: Text Input Component Style can be 'SHORT' or 'LONG'
        .setPlaceholder(url)
        .setDefaultValue(url)
        .setRequired(true) // If it's required or not
    )
    .addComponents(
      new SelectMenuComponent() // We create a Select Menu Component
        .setCustomId("verify-express-select")
        .setPlaceholder("What topic?")
        .addOptions(
          {
            label: "eth2",
            description: "the now of future.",
            value: "eth2",
          },
          {
            label: "defi",
            description: "Some people hate it, some people like it.",
            value: "defi",
          }
        )
    );
  return modal;
};

export const modifiedVerifyBtn = () => {
  const makeVerifyBtnFunc = ({ msgId }: { msgId: string }) =>
    new MessageActionRow().setComponents(
      new MessageButton()
        .setCustomId(`verify-expresss-btn-${msgId}`)
        .setLabel(`Verify above Express`)
        .setStyle("PRIMARY")
    );

  const verifyBtnCb = async (interaction: Interaction<CacheType>) => {
    if (interaction.isButton() && interaction.customId) {
      if (interaction.customId.startsWith("verify-expresss-btn-")) {
        const msgId = interaction.customId.split("-").pop() || null;
        let content = "";
        let url = "";
        if (msgId) {
          const { success, data } = await findRawMsg({
            msgId,
          });
          if (success) {
            content = data?.data?.parsedMessage || "";
            url = data?.data?.parsedUrl || "";
          }
        }
        // interaction.message.
        await showModal(
          modifiedVerifyExpressModal({
            content,
            url,
          }),
          {
            client, // Client to show the Modal through the Discord API.
            interaction, // Show the modal with interaction data.
          }
        );
      }
    }
  };

  return {
    makeVerifyBtnFunc,
    verifyBtnCb,
  };
};
