import {
  Client,
  MessageReaction,
  PartialMessageReaction,
  PartialUser,
  TextChannel,
  User,
} from "discord.js";
import { CHANNEL_ID } from "../../constants";
import { isFirstVerifyReaction } from "../../utils";
import { modifiedVerifyBtn } from "./VerifyModal";
import { findMessage } from "../../api";

const { makeVerifyBtnFunc, verifyBtnCb, verifyModalCb } = modifiedVerifyBtn();

const dmBtnToAdminVerify = async (
  reaction: MessageReaction,
  user: User | PartialUser
) => {
  if (isFirstVerifyReaction(reaction)) {
    const msgId = reaction.message.id;
    const { success } = await findMessage({ msgId });

    if (success) {
      console.log("do not verify the duplicate message please");
      await user.send({
        content: `${reaction.message.content}\n msgId: ${reaction.message.id} is a duplicate message`,
      });
      return;
    } else {
      // console.log("gota");
      try {
        //   (client.channels.cache.get(CHANNEL_ID) as TextChannel).send(
        //     `gota: ${reaction.message.content} from ${reaction.message.author}`
        //   );

        const discordId = reaction.message.author?.id;
        if (discordId && msgId) {
          await user.send({
            components: [
              makeVerifyBtnFunc({
                msgId,
                discordId,
              }),
            ],
            content: `${reaction.message.content}\n from ${reaction.message.author} \n msgId: ${reaction.message.id}`,
          });
        }
      } catch (error) {
        console.error("Something went wrong when sending the message:", error);
      }
    }
  }
};

const verifyRawMsg = async (
  reaction: MessageReaction | PartialMessageReaction,
  user: User | PartialUser
  // client: Client<boolean>
) => {
  if (reaction.partial) {
    try {
      const fullMessage = await reaction.fetch();
      console.log("part react");
      await dmBtnToAdminVerify(fullMessage, user);
    } catch (error) {
      console.error("Something went wrong when fetching the message:", error);
      // Return as `reaction.message.author` may be undefined/null
      return;
    }
  } else {
    await dmBtnToAdminVerify(reaction, user);
  }
};

export { verifyBtnCb, verifyRawMsg, verifyModalCb };
