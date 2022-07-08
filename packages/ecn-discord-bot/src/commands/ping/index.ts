import { SlashCommandBuilder } from "@discordjs/builders";
import {
  ButtonInteraction,
  CacheType,
  CommandInteraction,
  MessageActionRow,
  Modal,
  ModalActionRowComponent,
  ModalSubmitInteraction,
  TextInputComponent,
} from "discord.js";
import { client } from "../../client";
import { resubmitButtonRow } from "../comp/btn";
import ogs from "open-graph-scraper";
import { parseOg } from "./parseOg";

export const name = "ping";

export const command = new SlashCommandBuilder()
  .setName(name)
  .setDescription("Replies with pong!");

export const execute = async (
  interaction: CommandInteraction<CacheType> | ButtonInteraction<CacheType>
) => {
  const modal = new Modal().setCustomId("ecn-express").setTitle("ECN Express");
  // Add components to modal
  // Create the text input components

  const contentInput = new TextInputComponent()
    .setCustomId("expressInput")
    .setLabel("What's the express?")
    // Paragraph means multiple lines of text.
    .setStyle("PARAGRAPH");

  const urlInput = new TextInputComponent()
    .setCustomId("urlInput")
    // The label is the prompt the user sees for this input
    .setLabel("Link to the express")
    // Short means only a single line of text
    .setStyle("SHORT");
  // An action row only holds one text input,
  // so you need one action row per text input.
  const firstActionRow =
    new MessageActionRow<ModalActionRowComponent>().addComponents(contentInput);
  const secondActionRow =
    new MessageActionRow<ModalActionRowComponent>().addComponents(urlInput);
  // Add inputs to the modal
  modal.addComponents(firstActionRow, secondActionRow);
  await interaction.showModal(modal);
  const submitModal: ModalSubmitInteraction =
    await interaction.awaitModalSubmit({
      time: 300000,
      filter: (modalInteraction: ModalSubmitInteraction) =>
        modalInteraction.user.id === interaction.user.id &&
        modalInteraction.customId === modal.customId,
    });
  const urlvalue = submitModal.fields.getTextInputValue("urlInput");
  const contentvalue = submitModal.fields.getTextInputValue("expressInput");
  if (!urlvalue) {
    if (submitModal.user.id === interaction.user.id) {
      await submitModal.reply({
        content: "please resubmit",
        ephemeral: true,
        components: [resubmitButtonRow],
      });
    }
    return;
  }
  await submitModal.deferReply();

  const { image, ogTitle, ogDescription } = await parseOg(urlvalue);

  // interaction.editReply({ content: "replied" });
  // await client.user?.setUsername("ecn-botty");
  // await client.user?.setAvatar("");
  await submitModal.editReply({
    embeds: [
      {
        color: 0x0099ff,
        title: contentvalue,
        author: {
          name: submitModal.user.username,
          icon_url: submitModal.user.avatarURL() || "",
          //   url: "https://discord.js.org",
        },
        // description: `[source link](${urlvalue})`,
        fields: [
          ogTitle &&
            ogDescription && {
              name: ogTitle,
              value: ogDescription,
            },
          {
            name: "src:",
            value: `${urlvalue}`,
          },
        ],
        image,
        timestamp: new Date(),
      },
    ],
  });
  // await submitModal.followUp(`[${contentvalue}](${urlvalue})`);

  // `Pong! Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`
  //   {
  //     embeds: [
  //       {
  //         color: 0x0099ff,
  //         title: contentvalue,
  //         url: urlvalue,
  //         author: {
  //           name: submitModal.user.username,
  //           icon_url: submitModal.user.avatarURL() || "",
  //           //   url: "https://discord.js.org",
  //         },

  //         // description: `[${contentvalue}](${urlvalue})`,
  //         // thumbnail: {
  //         //   url: urlvalue,
  //         // },
  //         // thumbnail: {
  //         //   url: urlvalue,
  //         //   width: 460,
  //         //   proxy_url: urlvalue,
  //         //   height: 215,
  //         // },
  //       },
  //     ],
  //   }
};
