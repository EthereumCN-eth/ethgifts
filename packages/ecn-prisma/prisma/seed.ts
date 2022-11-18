import { Poap, PrismaClient } from "@prisma/client";
import { MD_DATA, COLLECTOR } from "./types";
import { addMsgApi, userHasAddressApi } from "../apis/sbt-api";
import fs from "fs";
import path from "path";
import { nfts } from "./nfts";
import { sbts } from "./sbts";
import { poaps } from "./poaps";
// import { generateSignature } from "ecn-sbt-api";
const prisma = new PrismaClient();

export type NFTCreateData = Parameters<typeof prisma.nFT.create>[0]["data"];
export type SBTCreateData = Parameters<
  typeof prisma.sBTContractType.create
>[0]["data"];
export type PoapCreateData = Parameters<typeof prisma.poap.create>[0]["data"];
type ContentTypeCreateData = Parameters<
  typeof prisma.contentCategory.create
>[0]["data"];

const createOneNFTPromise = (input: NFTCreateData) =>
  prisma.nFT
    .create({
      data: input,
    })
    .then((item) => console.log(`nft ${item.id} created`));

const createOnePoapPromise = (input: PoapCreateData) =>
  prisma.poap
    .create({
      data: input,
    })
    .then((item) => console.log(`poap ${item.id} created`));

const createOneSBTPromise = (input: SBTCreateData) =>
  prisma.sBTContractType
    .create({
      data: input,
    })
    .then((item) => console.log(`sbt ${item.id} created`));

const createOneContentTypePromise = (input: ContentTypeCreateData) =>
  prisma.contentCategory
    .create({
      data: input,
    })
    .then((item) => console.log(`cotentType ${item.contentType} created`));

const contentTypes: ContentTypeCreateData[] = [
  {
    contentType: "eth2",
  },
  {
    contentType: "defi",
  },
  {
    contentType: "uncategorized",
  },
];

const rawMessages: MD_DATA[] = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, "../originalData/discordData.json"),
    "utf-8"
  )
);

const createMessages = async (msgs: MD_DATA[]) => {
  await Promise.all([
    msgs.map(async (msg) => {
      const rawMsgPayload = {
        rawMessage: msg.rawMessage,
        content: msg.content,
        url: msg.url,
        discordId: msg.discordId,
        discordName: msg.discordName,
        ethAddress: msg.ethAddress,
        msgId: msg.messageId,
        contentTypes: msg.contentType,
      };

      const msgPayload = {
        content: rawMsgPayload.content,
        url: rawMsgPayload.url,
        discordId: rawMsgPayload.discordId,
        contentType: rawMsgPayload.contentTypes,
        msgId: rawMsgPayload.msgId,
      };

      const discordId = rawMsgPayload.discordId;

      try {
        await prisma.rawExpressMessage.create({
          data: {
            rawMessage: rawMsgPayload.rawMessage,
            id: rawMsgPayload.msgId,
            parsedUrl: rawMsgPayload.url,
            parsedMessage: rawMsgPayload.content,
            user: {
              connectOrCreate: {
                where: {
                  discordId,
                },
                create: {
                  name: rawMsgPayload.discordName,
                  expressCount: 0,
                  discordId,
                  ethAddress: rawMsgPayload.ethAddress,
                },
              },
            },
          },
          include: {
            user: true,
          },
        });
      } catch (error) {
        try {
          await prisma.rawExpressMessage.create({
            data: {
              rawMessage: rawMsgPayload.rawMessage,
              id: rawMsgPayload.msgId,
              parsedUrl: rawMsgPayload.url,
              parsedMessage: rawMsgPayload.content,
              user: {
                connectOrCreate: {
                  where: {
                    discordId,
                  },
                  create: {
                    name: rawMsgPayload.discordName,
                    expressCount: 0,
                    discordId,
                    ethAddress: rawMsgPayload.ethAddress,
                  },
                },
              },
            },
            include: {
              user: true,
            },
          });
        } catch (error) {
          console.log(
            // error,
            rawMsgPayload.msgId,
            rawMsgPayload.discordName,
            discordId,
            rawMsgPayload.discordId
          );
        }
      }

      try {
        await addMsgApi(msgPayload);
      } catch (error) {
        console.log(error);
      }
    }),
  ]);
};

const main = async () => {
  // await Promise.all([
  //   ....map(createOneNFTPromise),

  //   // createMessages(rawMessages),
  // ]);

  for (const nft of nfts) {
    await createOneNFTPromise(nft);
  }

  await Promise.all([
    // ...sbts.map(createOneSBTPromise),
    ...poaps.map(createOnePoapPromise),
    ...contentTypes.map(createOneContentTypePromise),
  ]);
  // const message = await createMessages(messages);
};

main()
  .then(() => {
    return prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
