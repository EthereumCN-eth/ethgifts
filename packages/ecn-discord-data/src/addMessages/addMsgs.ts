import { addRawMsgApi, addMsgApi, findRawMsg } from "../apis/sbt-api";
import { COLLECTOR, MD_DATA } from "../types";

export const addRawMessages = async (
  collectors: COLLECTOR,
  msgs: MD_DATA[]
) => {
  try {
    await Promise.all([
      ...msgs.map(async (msg) => {
        const rawMsgPayload = {
          rawMessage: msg.rawMessage,
          discordId: collectors[msg.discordName].discordId,
          discordName: msg.discordName,
          msgId: msg.messageId,
        };

        try {
          const rawDeposit = await addRawMsgApi(rawMsgPayload);

          if (rawDeposit.success) {
            return {
              success: true,
              data: `former data of ${msg.messageId} has been saved`,
              error: null,
            };
          }
        } catch (error) {
          return {
            success: false,
            data: null,
            error: error,
          };
        }
      }),
    ]);

    return {
      success: true,
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }
};

export const addMessage = async (collectors: COLLECTOR, msgs: MD_DATA[]) => {
  try {
    await Promise.all([
      ...msgs.map(async (msg) => {
        const msgPayload = {
          content: msg.content,
          url: msg.url,
          discordId: collectors[msg.discordName].discordId,
          contentType: msg.contentType,
          msgId: msg.messageId,
        };

        try {
          const findRaw = await findRawMsg({ msgId: msg.messageId });
          if (findRaw.success) {
            await addMsgApi(msgPayload);
          }

          return {
            success: true,
            data: `former data of ${msg.messageId} has been saved`,
            error: null,
          };
        } catch (error) {
          return {
            success: false,
            data: null,
            error: error,
          };
        }
      }),
    ]);

    return {
      success: true,
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }
};
