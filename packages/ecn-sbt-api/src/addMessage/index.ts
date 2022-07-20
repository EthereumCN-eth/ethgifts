import { parseMsg } from "./utils";
import { Express } from "express";
import * as yup from "yup";
import { PrismaClient, Prisma } from "@prisma/client";
import { validateRawMsg } from "./DTORawMsg";

export const setupAddMessageRoute = (
  app: Express,
  prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >
) => {
  app.post("/addRawMessage", async (req, res) => {
    // console.log("body: ", req.body);
    // await new Promise((res) => setTimeout(() => res(true), 10000));
    const { rawMessage, discordId, discordName } = req.body;
    try {
      const _ = await validateRawMsg({
        rawMessage,
        discordId,
        discordName,
      });
    } catch (error) {
      if (typeof error === "string" || error instanceof String) {
        return res.status(400).send({ success: false, error });
      }
      return res.status(400).send({ success: false, error: "unknown error" });
    }

    const { hasUrl, msg, url } = parseMsg(rawMessage);

    if (!hasUrl) {
      return res.status(200).send({ success: false, error: "no url" });
    }

    const createRawMsg = await prisma.rawExpressMessage.create({
      data: {
        rawMessage,
        parsedUrl: url.trim(),
        // parseMsg: msg.trim(),
        parsedMessage: msg.trim(),
        user: {
          connectOrCreate: {
            where: {
              discordId,
            },
            create: {
              name: discordName,
              ExpressCount: 0,
              discordId,
            },
          },
        },
      },
      include: {
        user: true,
      },
    });
    return res.status(200).send({ success: true, data: createRawMsg });
  });
};
