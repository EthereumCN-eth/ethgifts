import { Express } from "express";
import { PrismaClient, Prisma } from "@prisma/client";

export const setupQueryRoute = (
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
  app.post("/msg/findMessage", async (req, res) => {
    const { msgId } = req.body;
    try {
      const msg = await prisma.expressMessage.findUnique({
        where: {
          id: msgId,
        },
      });
      return res.status(200).send({ success: true, data: msg, error: null });
    } catch (error) {
      return res.status(500).send({ success: false, data: null, error });
    }
  });
  app.get("/contentType", async (req, res) => {
    try {
      const content = await prisma.contentCategory.findMany({
        select: {
          contentType: true,
          ExpressMessages: true,
        },
      });
      return res
        .status(200)
        .send({ success: true, data: content, error: null });
    } catch (error) {
      return res.status(500).send({ success: false, data: null, error });
    }
  });
};
