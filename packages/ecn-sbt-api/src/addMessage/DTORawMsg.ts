import { Express } from "express";
import * as yup from "yup";
import { PrismaClient, Prisma } from "@prisma/client";

export const addRawMsgDTOYup = yup.object().shape({
  rawMessage: yup.string().required("raw Msg is required"),
  discordId: yup.string().required("discordId is required"),
  msgId: yup.string().required("msgId is required"),
  discordName: yup.string().optional(),
});

export const validateRawMsg = async (rawMsgDto: {
  discordName: string | null;
  discordId: string;
  rawMessage: string;
  msgId: string;
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
