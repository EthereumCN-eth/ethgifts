import { updateMsgContentType } from "./queue";
import { Express } from "express";
import { PrismaClient, Prisma } from "@prisma/client";

export const setupUpdateMsgRoute = (
  app: Express,
  prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >
) => {
  app.post("/msg/updateMsgType", async (req, res) => {
    const { msgId, contentType } = req.body;

    try {
      await updateMsgContentType(msgId, contentType);
      console.log(`update is successfuly: ${msgId} => ${contentType}`);

      return res.status(200).send({ success: true, data: contentType });
    } catch (error) {
      return res.status(200).send({ success: false, data: null });
    }
  });
};
