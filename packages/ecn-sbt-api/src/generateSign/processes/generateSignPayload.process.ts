import { Job } from "bull";
import { prisma } from "../../server";
import { storageMetaData } from "../generateMetaData";

export const generateSignaturePayload = async (job: Job) => {
  try {
    await prisma.$transaction(async (prisma) => {
      // get eth address
      const user = await prisma.user.findUnique({
        where: {
          discordId: job.data.discordId,
        },
      });

      if (typeof user?.ethAddress !== "string") {
        throw "please register address at first";
      }

      let contributions: {
        [index: string]: {
          expressId: string;
          content: string;
          contentURI: string;
          verifiedDate: number;
        };
      } = {};

      // get metadata content
      const expresses = await prisma.expressMessage.findMany({
        where: {
          userId: job.data.discordId,
        },
        select: {
          id: true,
          expressMessage: true,
          expressUrl: true,
          verifiedAt: true,
        },
      });

      for (let i = 0; i < expresses.length; i++) {
        contributions[i + 1] = {
          expressId: expresses[i].id.toString(),
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
        data: {
          discordId: job.data.discordId,
          expressId: job.data.expressId,
          payloadId: newPayload.id,
        },
      };
    });
  } catch (error) {
    return {
      success: false,
      error: error,
      payloadId: null,
    };
  }
};
