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

const { makeVerifyBtnFunc, verifyBtnCb } = modifiedVerifyBtn();

const verifyRawMsg = async (
  reaction: MessageReaction | PartialMessageReaction,
  user: User | PartialUser
  // client: Client<boolean>
) => {
  if (reaction.partial) {
    try {
      const fullMessage = await reaction.fetch();
      console.log("part react");
      if (isFirstVerifyReaction(fullMessage)) {
        // console.log("gota");
        // (client.channels.cache.get(CHANNEL_ID) as TextChannel).send(
        //   `gota: ${reaction.message.content} from ${user.username}`
        // );
        await user.send({
          components: [],
          content: `${reaction.message.content}\n from ${reaction.message.author}`,
        });
        await user.send("hhlo");
      }
    } catch (error) {
      console.error("Something went wrong when fetching the message:", error);
      // Return as `reaction.message.author` may be undefined/null
      return;
    }
  } else {
    if (isFirstVerifyReaction(reaction)) {
      // console.log("gota");
      try {
        //   (client.channels.cache.get(CHANNEL_ID) as TextChannel).send(
        //     `gota: ${reaction.message.content} from ${reaction.message.author}`
        //   );
        reaction.message.author;
        await user.send({
          components: [makeVerifyBtnFunc({ msgId: reaction.message.id })],
          content: `${reaction.message.content}\n from ${reaction.message.author} \n msgId: ${reaction.message.id}`,
        });
      } catch (error) {
        console.error("Something went wrong when sending the message:", error);
      }
    }
  }
};

export { verifyBtnCb, verifyRawMsg };
