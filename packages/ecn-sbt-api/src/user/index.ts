import { Express } from "express";
import * as yup from "yup";
import { PrismaClient, Prisma, User } from "@prisma/client";

export const setupUserRoute = (
  app: Express,
  prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >
) => {
  app.post("/user/hasEthAddress", async (req, res) => {
    const { discordId } = req.body;
    // By unique identifier
    try {
      const user = await prisma.user.findUnique({
        where: {
          discordId,
        },
      });
      if (user && user.ethAddress) {
        return res
          .status(200)
          .send({ success: true, data: { hasEthAddress: true, user } });
      } else {
        return res
          .status(200)
          .send({ success: true, data: { hasEthAddress: false } });
      }
    } catch (e) {
      return res.status(500).send({ success: false, error: "error" });
    }
  });

  app.post("/user/updateEthAddress", async (req, res) => {
    const { ethAddress, discordId, discordName, discordAvatar } = req.body;
    // By unique identifier
    try {
      //@ts-ignore
      const resp = await prisma.$transaction(
        //@ts-ignore
        async (
          prisma: PrismaClient<
            Prisma.PrismaClientOptions,
            never,
            Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
          >
        ) => {
          const userWithAddr = await prisma.user.findUnique({
            where: {
              ethAddress,
            },
          });
          // eth addr taken
          if (userWithAddr) {
            return {
              success: false,
              error: "Eth address taken.",
            };
          }
          const userWithId = await prisma.user.findUnique({
            where: {
              discordId,
            },
          });
          if (userWithId && userWithId.ethAddress) {
            return {
              success: false,
              error: "You had eth address registered.",
            };
          }
          // #TODO check user has addr areadly
          const updatedUser: User = await prisma.user.upsert({
            where: {
              discordId,
            },
            update: {
              ethAddress,
            },
            create: {
              name: discordName,
              expressCount: 0,
              discordId,
              ethAddress,
              discordAvatar,
            },
          });
          return {
            success: true,
            error: null,
            data: updatedUser,
          };
        }
      );

      return res.status(200).send(resp);
    } catch (e) {
      return res.status(500).send({ success: false, error: "error" });
    }
  });
};
