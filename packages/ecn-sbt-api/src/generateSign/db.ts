import { BytesLike } from "@ethersproject/bytes";
import { PrismaClient, Prisma } from "@prisma/client";
import { prisma } from "../server";
import { storageMetaData } from "./generateMetaData";

export const storeSignaturePayload = async (
  discordId: string,
  prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >
) => {
  try {
    await prisma.$transaction(async (prisma) => {
      // get eth address
      const user = await prisma.user.findUnique({
        where: {
          discordId: discordId,
        },
      });

      if (typeof user?.ethAddress !== "string") {
        throw "please register address at first";
      }

      let contributions: {
        [expressId: number]: {
          content: string;
          contentURI: string;
          verifiedDate: number;
        };
      } = {};

      // get metadata content
      const expresses = await prisma.expressMessage.findMany({
        where: {
          userId: discordId,
        },
        select: {
          expressMessage: true,
          expressUrl: true,
          verifiedAt: true,
        },
      });

      for (let i = 0; i < expresses.length; i++) {
        contributions[i + 1] = {
          content: expresses[i].expressMessage,
          contentURI: expresses[i].expressUrl,
          verifiedDate: expresses[i].verifiedAt.getDate(),
        };
      }

      // generate metadata URI
      const metaDataURI = await storageMetaData(
        user.ethAddress,
        contributions,
        expresses.length
      );

      const newPayload = await prisma.signaturePayload.create({
        data: {
          metaDataIpfsUrl: metaDataURI,
          receiverETHAddress: user.ethAddress,
          ExpressCount: expresses.length,
        },
      });

      return {
        success: true,
        error: null,
        data: newPayload.id,
      };
    });
  } catch (error) {
    return {
      success: false,
      error: error,
      data: null,
    };
  }
};

export const storeSignature = async (
  discordId: string,
  expressId: string,
  expressSBTId: number,
  signData: string,
  signaturePayloadId: number,
  signature: string
) => {
  try {
    await prisma.sBTSignatureRecord.create({
      data: {
        userId: discordId,
        expressMessageId: expressId,
        signData: signData,
        sbtContractTypeId: expressSBTId,
        signaturePayloadId: signaturePayloadId,
        SignatureData: signature,
      },
    });
  } catch (error) {}
};
