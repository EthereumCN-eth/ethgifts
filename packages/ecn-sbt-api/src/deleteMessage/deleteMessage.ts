import { prisma } from "../server";

export const deleteMessage = async (msgId: string) => {
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

      await prisma.expressMessage.delete({
        where: {
          id: msgId,
        },
        include: {
          rawMessage: {
            select: {
              id: true,
            },
          },
          SignaturePayload: {
            select: {
              id: true,
            },
          },
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
    return {
      success: true,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
    };
  }
};
