import { Express } from "express";
import * as yup from "yup";
import { PrismaClient, Prisma } from "@prisma/client";

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
    const { ethAddress, discordId, discordName } = req.body;
    // By unique identifier
    try {
      //@ts-ignore
      const updatedUser: User | null = await prisma.$transaction(
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
          if (userWithAddr) {
            return null;
          }
          const user = await prisma.user.upsert({
            where: {
              discordId,
            },
            update: {
              ethAddress,
            },
            create: {
              name: discordName,
              ExpressCount: 0,
              discordId,
              ethAddress,
            },
          });
          return user;
        }
      );

      if (updatedUser) {
        return res.status(200).send({ success: true, data: updatedUser });
      } else {
        return res
          .status(200)
          .send({ success: false, error: "eth address taken" });
      }
    } catch (e) {
      return res.status(500).send({ success: false, error: "error" });
    }
  });
};
