import { MessageReaction } from "discord.js";
import { CHANNEL_ID, VERIFY_EMOJI_NAME } from "./constants";

export const isFirstVerifyReaction = (inputMsg: MessageReaction): boolean => {
  return (
    inputMsg.message.channelId === CHANNEL_ID &&
    inputMsg.count == 1 &&
    inputMsg.emoji.name === VERIFY_EMOJI_NAME
  );
};
