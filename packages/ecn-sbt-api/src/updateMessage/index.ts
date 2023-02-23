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
      await prisma.$transaction(async () => {
        const findMessage = await prisma.expressMessage.findUnique({
          where: {
            id: msgId,
          },

          include: {
            contentCategory: {
              select: {
                contentType: true,
              },
            },
            user: {
              select: {
                discordId: true,
              },
            },
          },
        });

        if (!findMessage) {
          console.log("no match message");
          return new Error("no match message");
        }

        if (contentType != undefined) {
          const existedContentType = await prisma.contentCategory.findUnique({
            where: {
              contentType: contentType,
            },
          });
          if (!existedContentType) {
            await prisma.contentCategory.create({
              data: {
                contentType: contentType,
              },
            });
          }
          await prisma.expressMessage.update({
            where: {
              id: msgId,
            },
            data: {
              contentType: contentType,
            },
          });
        }
      });
      return res
        .status(200)
        .send({ success: true, data: `updated contentType: ${contentType}` });
    } catch (error) {
      return res.status(200).send({ success: false, data: null });
    }
  });
};
