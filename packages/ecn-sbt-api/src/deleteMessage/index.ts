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
      await prisma.$transaction(async () => {
        const findMessage = await prisma.expressMessage.findUnique({
          where: {
            id: msgId,
          },

          include: {
            user: {
              select: {
                discordId: true,
              },
            },
          },
        });

        if (!findMessage) {
          return new Error("no match message");
        }
        await prisma.sBTSignatureRecord.delete({
          where: {
            id: msgId,
          },
        });

        await prisma.signaturePayload.delete({
          where: {
            id: msgId,
          },
        });

        await prisma.expressMessage.delete({
          where: {
            id: msgId,
          },
          select: {
            expressMessage: true,
            expressUrl: true,
          },
        });

        await prisma.rawExpressMessage.delete({
          where: {
            id: msgId,
          },
        });

        await prisma.user.update({
          where: {
            discordId: findMessage.user.discordId,
          },
          data: {
            expressCount: {
              decrement: 1,
            },
          },
        });
      });
      return res
        .status(200)
        .send({ success: true, data: `deleted msgId: ${msgId}`, error: null });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ success: false, data: null, error });
    }
  });
};
