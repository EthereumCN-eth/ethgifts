import { addRawMsgApi, addMsgApi, findRawMsg } from "../apis/sbt-api";
import { COLLECTOR, MD_DATA } from "../types";
import { addToSignatureGenerationQueue } from "../../../ecn-sbt-api/src/utils/generateSign";

import {
  User,
  PrismaClient,
  RawExpressMessage,
  SBTContractType,
} from "@prisma/client";
import { DB_CONTRACT_TYPE_ID } from "../../../ecn-sbt-api/src/utils/generateSign/constants";
const prisma = new PrismaClient();

export const addRawMessages = async (msgs: MD_DATA[]) => {
  const createTxs = msgs.map((msg) => {
    const rawMessage = msg.rawMessage;
    const discordId = msg.discordId;
    const discordName = msg.discordName;
    const discordAvatar = msg.discordAvatar;

    return prisma.rawExpressMessage.create({
      data: {
        rawMessage,
        id: msg.messageId,
        parsedUrl: msg.url.trim(),

        // parseMsg: msg.trim(),
        parsedMessage: msg.rawMessage.trim(),
        user: {
          connectOrCreate: {
            where: {
              discordId,
            },
            create: {
              name: discordName,
              expressCount: 0,
              discordId,
              discordAvatar,
            },
          },
        },
      },
      include: {
        user: true,
      },
    });
  });

  try {
    const results = await prisma.$transaction([...createTxs]);
    console.log("success to add rawMessages: ", results.length);
    return {
      success: true,
    };
  } catch (error) {
    console.log("fail to add rawMessage: ", error);
    return {
      success: false,
    };
  }

  // for (let i = 0; i < msgs.length; i++) {
  //   const msg = msgs[i];

  //   const rawMsgPayload = {
  //     rawMessage: msg.rawMessage,
  //     discordId: msg.discordId,
  //     discordName: msg.discordName,
  //     msgId: msg.messageId,
  //   };

  //   const findRaw = await findRawMsg({ msgId: msg.messageId });
  //   if (findRaw.success) {
  //     alreadyCompleted++;
  //     break;
  //   }

  //   try {
  //     const rawDeposit = await addRawMsgApi(rawMsgPayload);

  //     if (rawDeposit.success) {
  //       console.log("added raw msgId ", msg.messageId);
  //       successCount++;
  //       // return {
  //       //   success: true,
  //       //   data: `former data of ${msg.messageId} has been saved`,
  //       //   error: null,
  //       // };
  //     } else {
  //       // await addRawMsgApi(rawMsgPayload);
  //       throw new Error(
  //         `fail to add message ${msg.messageId} of discordId: ${msg.discordId}, and execute again`
  //       );
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     // return {
  //     //   success: false,
  //     //   data: null,
  //     //   error: error,
  //     // };
  //   }
  // }
};

export const addMessage = async (msgs: MD_DATA[]) => {
  // const userMessage: { [name: string]: number } = {};

  // const countLevel = (
  //   await prisma.sBTContractType.findMany({
  //     where: {
  //       contractName: "ExpressSBT",
  //     },
  //     select: {
  //       countLevel: true,
  //     },
  //   })
  // )[0].countLevel;

  try {
    // await Promise.all([
    //   ...msgs.map(async (msg) => {
    //     const discordName = msg.discordName;
    //     const content = msg.content;
    //     const url = msg.url;
    //     const contentType = msg.contentType;
    //     const verifiedAt = msg.mdDate;
    //     const discordId = msg.discordId;
    //     const messageId = msg.messageId;

    //     while (userMessage[msg.discordName] == undefined) {
    //       userMessage[msg.discordName] = 0;
    //     }
    //     userMessage[msg.discordName] += 1;

    //     return prisma.$transaction([
    //       prisma.expressMessage.create({
    //         data: {
    //           expressMessage: content,
    //           expressUrl: url,
    //           // id: msgId,
    //           contentCategory: {
    //             connect: {
    //               contentType,
    //             },
    //           },
    //           verifiedAt,
    //           user: {
    //             connect: {
    //               discordId,
    //             },
    //           },
    //           rawMessage: {
    //             connect: {
    //               id: messageId,
    //             },
    //           },
    //         },
    //       }),

    //       prisma.user.update({
    //         where: {
    //           discordId,
    //         },
    //         data: {
    //           expressCount: {
    //             increment: 1,
    //           },
    //         },
    //       }),
    //     ]);
    //   }),
    // ]);

    // await Promise.all([
    //   ...msgs.map((msg) => {
    //     const discordName = msg.discordName;
    //     const discordId = msg.discordId;
    //     const messageId = msg.messageId;

    //     if (
    //       countLevel.find((level) => {
    //         return userMessage[discordName] == level;
    //       }) !== undefined
    //     ) {
    //       const sbtContractTypeId = Number(DB_CONTRACT_TYPE_ID);
    //       if (typeof sbtContractTypeId === "number") {
    //         addToSignatureGenerationQueue(
    //           discordId,
    //           messageId,
    //           sbtContractTypeId
    //         );
    //       } else {
    //         new Error("sbt contract type id not set");
    //       }
    //     }
    //   }),
    // ]);

    // @ts-ignore

    // const st = await sign(discordId, msgId);
    // console.log("st:", st);

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
        isToSignCert: true,
      };

      const findRaw = await findRawMsg({ msgId: msg.messageId });
      if (findRaw.success) {
        const msgResult = await addMsgApi(msgPayload);

        if (msgResult.success) {
          console.log("added msgId ", msg.messageId);
        } else {
          console.log("fail to added msgId ", msg.messageId);
        }
      } else {
        console.log("fail to find msgId ", msg.messageId);
      }
    }

    console.log(`successfully to add message`);
    return {
      success: true,
    };
  } catch (error) {
    console.log("fail to add message: ", error);
    return {
      success: false,
    };
  }
};
