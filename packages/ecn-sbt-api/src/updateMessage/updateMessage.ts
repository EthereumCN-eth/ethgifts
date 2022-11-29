import { prisma } from "../server";

export const updateMessageContentType = async (
  msgId: string,
  contentType: string
) => {
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
    return {
      success: true,
      error: null,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: error,
    };
  }
};
