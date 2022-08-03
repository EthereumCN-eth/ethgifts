import { prisma } from "../server";
import { storageMetaData } from "./generateMetaData";

export const generateSignPayload = async (
  discordId: string,
  expressId: string
) => {
  const prismaStatus = await prisma.$transaction(async (prisma) => {
    // get eth address
    const user = await prisma.user.findUnique({
      where: {
        discordId: discordId,
      },
      include: {
        expressMessages: {
          select: {
            id: true,
            expressMessage: true,
            expressUrl: true,
            verifiedAt: true,
          },
        },
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
        verifiedDate: string;
      };
    } = {};

    // get metadata content
    const expresses = user.expressMessages;

    for (let i = 0; i < expresses.length; i++) {
      contributions[i + 1] = {
        expressId: expresses[i].id.toString(),
        content: expresses[i].expressMessage,
        contentURI: expresses[i].expressUrl,
        verifiedDate: expresses[i].verifiedAt.toString(),
      };
    }

    // generate metadata URI
    // const metaDataStatus = await storageMetaData(
    //   user.ethAddress,
    //   contributions,
    //   expresses.length
    // );

    // if (metaDataStatus.success === false) {
    //   console.log(metaDataStatus);
    //   return {
    //     success: false,
    //     error: metaDataStatus.error,
    //     data: {
    //       discordId: "",
    //       expressId: "",
    //       payloadId: 0,
    //     },
    //   };
    // }

    const newPayload = await prisma.signaturePayload.create({
      data: {
        metaDataIpfsUrl: "https://exmaple.com", // testing. original code: metaDataStatus.data
        receiverETHAddress: user.ethAddress,
        ExpressCount: expresses.length,
      },
    });

    return {
      success: true,
      error: "",
      data: {
        discordId: discordId,
        expressId: expressId,
        payloadId: newPayload.id,
      },
    };
  });

  return prismaStatus;
};
