import fs from "fs";
import path from "path";
import { MD_DATA, COLLECTOR } from "./types";
import { User, PrismaClient, Prisma } from "@prisma/client";
import { updateAddressApi } from "./apis/addMsgs";
const prisma = new PrismaClient();

const getCollectors = (): COLLECTOR => {
  return JSON.parse(
    fs.readFileSync(
      path.join(__dirname, "./originalData/collectors.json"),
      "utf-8"
    )
  );
};

const getContents = (): MD_DATA[] => {
  return JSON.parse(
    fs.readFileSync(
      path.join(__dirname, "./originalData/contents.json"),
      "utf-8"
    )
  );
};

const updateUserAddress = async (collectors: COLLECTOR) => {
  await Promise.all([
    Object.keys(collectors).map(async (collector) => {
      const collectorPayload = {
        ethAddress: collectors[collector].ethAddress,
        discordId: collectors[collector].discordId,
        discordName: collector,
      };

      try {
        await updateAddressApi(collectorPayload);
        console.log(
          `address of ${collectorPayload.discordName} has been updated`
        );
      } catch (error) {
        console.log(error);
      }
    }),
  ]);
};

const reformatContents = async () => {
  const collectors: COLLECTOR = getCollectors();
  const contents: MD_DATA[] = getContents();

  const newContents = contents.map((content) => {
    return {
      title: content.content,
      mdDate: content.mdDate,
      messageId: content.messageId,
      rawMessage: content.rawMessage,
      content: content.content,
      url: content.url,
      contentType: content.contentType,
      discordName: content.discordName,
      discordId: collectors[content.discordName].discordId,
      ethAddress: collectors[content.discordName].ethAddress,
    };
  });

  updateUserAddress(collectors);

  fs.writeFileSync(
    path.join(__dirname, "./discordData.json"),
    JSON.stringify(newContents, null, 2)
  );
};

reformatContents();
