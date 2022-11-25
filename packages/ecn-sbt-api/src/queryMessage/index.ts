import { Express } from "express";
import { PrismaClient, Prisma } from "@prisma/client";

export const setupQueryMsgRoute = (
  app: Express,
  prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >
) => {
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
  app.post("./msg/findMessage", async (req, res) => {
    const { msgId } = req.body;
    try {
      const msg = await prisma.expressMessage.findUnique({
        where: {
          id: msgId,
        },
      });
      return res.status(200).send({ success: true, data: msg });
    } catch (error) {
      return res.status(500).send({ success: false, error });
    }
  });
};
