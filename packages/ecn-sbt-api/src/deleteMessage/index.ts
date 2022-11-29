import { deleteMsg } from "./queue";
import { Express } from "express";
import { PrismaClient, Prisma } from "@prisma/client";

export const setupDeleteMsgRoute = (
  app: Express,
  prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >
) => {
  app.post("/msg/deleteMessage", async (req, res) => {
    const { msgId } = req.body;

    try {
      await deleteMsg(msgId);
      console.log(`delete is successfuly: ${msgId}`);

      return res.status(200).send({ success: true });
    } catch (error) {
      return res.status(200).send({ success: false });
    }
  });
};
