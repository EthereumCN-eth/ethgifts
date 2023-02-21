import { addRawMsgApi, addMsgApi, findRawMsg } from "../apis/sbt-api";
import { COLLECTOR, MD_DATA } from "../types";

export const addRawMessages = async (msgs: MD_DATA[]) => {
  let successCount = 0;
  for (let i = 0; i < msgs.length; i++) {
    const msg = msgs[i];

    const rawMsgPayload = {
      rawMessage: msg.rawMessage,
      discordId: msg.discordId,
      discordName: msg.discordName,
      msgId: msg.messageId,
    };

    try {
      const rawDeposit = await addRawMsgApi(rawMsgPayload);

      if (rawDeposit.success) {
        console.log("added raw msgId ", msg.messageId);
        successCount++;
        // return {
        //   success: true,
        //   data: `former data of ${msg.messageId} has been saved`,
        //   error: null,
        // };
      } else {
        // await addRawMsgApi(rawMsgPayload);
        throw new Error(
          `fail to add message ${msg.messageId} of discordId: ${msg.discordId}, and execute again`
        );
      }
    } catch (error) {
      console.log(error);
      // return {
      //   success: false,
      //   data: null,
      //   error: error,
      // };
    }
  }

  if (successCount === msgs.length) {
    console.log("suceessfully to add all rawMessage");
    return {
      success: true,
    };
  } else {
    console.log(`fail to add all rawMessage`);
    return {
      success: false,
    };
  }
};

export const addMessage = async (msgs: MD_DATA[]) => {
  let successCount = 0;
  for (let i = 0; i < msgs.length; i++) {
    const msg = msgs[i];
    const msgPayload = {
      content: msg.content,
      url: msg.url,
      discordId: msg.discordId,
      contentType: msg.contentType,
      msgId: msg.messageId,
      //
      verifiedAt: new Date(msg.mdDate),
      isToSignCert: false,
    };

    const findRaw = await findRawMsg({ msgId: msg.messageId });
    if (findRaw.success) {
      const msgResult = await addMsgApi(msgPayload);

      if (msgResult.success) {
        console.log("added msgId ", msg.messageId);
        successCount++;
      } else {
        console.log("fail to added msgId ", msg.messageId);
      }
    } else {
      console.log("fail to find msgId ", msg.messageId);
    }
  }

  if (successCount === msgs.length) {
    console.log(`successfully to add all message`);
  } else {
    console.log("successCount:", successCount);
    console.log("msgs.length:", msgs.length);
  }
};
