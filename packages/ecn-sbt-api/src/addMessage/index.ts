import { Express } from "express";
import * as yup from "yup";
import { PrismaClient, Prisma } from "@prisma/client";

export const addRawMsgDTOYup = yup.object().shape({
  rawMessage: yup.string().required("raw Msg is required"),
  discordId: yup.string().required("discordId is required"),
  discordName: yup.string().optional(),
});

const validateRawMsg = async (rawMsgDto: {
  discordName: string | null;
  discordId: string;
  rawMessage: string;
}) => {
  try {
    const _result = await addRawMsgDTOYup.validate(rawMsgDto, { strict: true });
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      const errMsg =
        error && error.errors && error.errors[0]
          ? error.errors[0]
          : "validation error";
      throw errMsg;
    }
    throw "validation error";
  }
  return rawMsgDto;
};

export const setupAddMessageRoute = (
  app: Express,
  prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >
) => {
  app.post("/addRawMessage", async (req, res) => {
    console.log("body: ", req.body);
    const { rawMessage, discordId, discordName } = req.body;
    try {
      const _ = await validateRawMsg({
        rawMessage,
        discordId,
        discordName,
      });
    } catch (error) {
      if (typeof error === "string" || error instanceof String) {
        return res.status(400).send({ success: false, error });
      }
      return res.status(400).send({ success: false, error: "unknown error" });
    }

    const createRawMsg = await prisma.rawExpressMessage.create({
      data: {
        rawMessage,
        user: {
          connectOrCreate: {
            where: {
              discordId,
            },
            create: {
              name: discordName,
              ExpressCount: 0,
              discordId,
            },
          },
        },
      },
    });
    return res.status(200).send({ success: true, data: createRawMsg });
  });
};
