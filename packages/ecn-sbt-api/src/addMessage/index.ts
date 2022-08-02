import { parseMsg } from "./utils";
import { Express } from "express";
import * as yup from "yup";
import { PrismaClient, Prisma, RawExpressMessage, User } from "@prisma/client";
import { validateRawMsg } from "./DTORawMsg";

export const setupAddMessageRoute = (
  app: Express,
  prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >
) => {
  app.post("/rawMsg/addRawMessage", async (req, res) => {
    // console.log("body: ", req.body);
    // await new Promise((res) => setTimeout(() => res(true), 10000));
    const { rawMessage, discordId, discordName, msgId } = req.body;
    try {
      const _ = await validateRawMsg({
        rawMessage,
        discordId,
        discordName,
        msgId,
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

    try {
      const createRawMsg: RawExpressMessage & {
        user: User;
      } = await prisma.rawExpressMessage.create({
        data: {
          rawMessage,
          id: msgId,
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
    } catch (e) {
      console.log("/rawMsg/addRawMessage error: ", e);
      return res.status(200).send({ success: false, data: null });
    }
  });

  app.post("/msg/addMessage", async (req, res) => {
    const { msgId, content, url, discordId, contentType } = req.body;

    // const rawMsg = await prisma.rawExpressMessage.findUnique({
    //   where: {
    //     id: msgId,
    //   },
    // });
    try {
      //@ts-ignore
      const createdExpress = await prisma.$transaction(
        //@ts-ignore
        async (
          prisma: PrismaClient<
            Prisma.PrismaClientOptions,
            never,
            Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
          >
        ) => {
          const createdExpress = await prisma.expressMessage.create({
            data: {
              expressMessage: content,
              expressUrl: url,
              // id: msgId,
              contentCategory: {
                connect: {
                  contentType,
                },
              },
              user: {
                connect: {
                  discordId,
                },
              },
              rawMessage: {
                connect: {
                  id: msgId,
                },
              },
            },
          });

          await prisma.user.update({
            where: {
              discordId,
            },
            data: {
              ExpressCount: {
                increment: 1,
              },
            },
          });

          return createdExpress;
        }
      );

      //
      return res.status(200).send({ success: true, data: createdExpress });
    } catch (e) {
      console.log("/msg/addMessage error: ", e);
      return res.status(200).send({ success: false, data: null });
    }
  });

  app.post("/rawMsg/findRawMessage", async (req, res) => {
    const { msgId } = req.body;
    try {
      const rawMsg = await prisma.rawExpressMessage.findUnique({
        where: {
          id: msgId,
        },
      });
      return res.status(200).send({ success: true, data: rawMsg });
    } catch (error) {
      return res.status(500).send({ success: false, error });
    }
  });
};
