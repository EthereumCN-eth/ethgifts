import {
  APIActionRowComponent,
  APIMessageActionRowComponent,
} from "discord-api-types/v9";
import {
  Client,
  Message,
  MessageActionRow,
  MessageActionRowComponent,
  MessageActionRowComponentResolvable,
  TextChannel,
} from "discord.js";
import { addRawMsgApi } from "../../api";
import { CHANNEL_ID, lastest_no_address_discordId } from "../../constants";

export const AddRawMsg = async (
  msg: Message<boolean>,
  btn: MessageActionRow<
    MessageActionRowComponent,
    MessageActionRowComponentResolvable,
    APIActionRowComponent<APIMessageActionRowComponent>
  >,
  client: Client<boolean>
) => {
  if (
    msg.channelId === CHANNEL_ID &&
    msg.content &&
    msg.content.includes("https")
  ) {
    const msgPayload = {
      rawMessage: msg.content,
      discordId: msg.author.id,
      discordName: msg.author.username,
      msgId: msg.id,
    };
    try {
      const { success, data } = await addRawMsgApi(msgPayload);
      if (success) {
        // await msg.reply("gota u");
        if (data && data.user && !data.user.ethAddress) {
          lastest_no_address_discordId.set("latest", data.user.discordId);
          await (client.channels.cache.get(CHANNEL_ID) as TextChannel).send({
            content:
              "Hello here! Let us know your eth address for the orange juice!",
            components: [btn],
          });
        }
      }
    } catch (e) {
      console.log("addRawMessage error:", e);
    }
  }
};
