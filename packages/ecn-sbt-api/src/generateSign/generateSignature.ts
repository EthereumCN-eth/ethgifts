import { signTicketAndVC } from "./../../../ecn-eip712vc/src/index";
import { prisma } from "../server";
import { storeMetaData } from "./generateMetaData";
import * as config from "./config";
import { signTicket } from "ecn-eip712vc";
import { APPROVER_PRIVATE_KEY } from "./constants";

type TypeContributions = {
  [index: string]: {
    expressId: string;
    content: string;
    contentURI: string;
    verifiedDate: string;
  };
};

export const generateSignature = async (
  discordId: string,
  expressId: string
) => {
  const signStatus = await prisma.$transaction(async (prisma) => {
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
      return {
        success: false,
        error: "please register address at first",
        data: null,
      };
    }

    const expresses = user.expressMessages;

    const contributions = expresses.reduce(
      (acc: TypeContributions, item, indx) => {
        acc[indx + 1] = {
          expressId: item.id.toString(),
          content: item.expressMessage,
          contentURI: item.expressUrl,
          verifiedDate: item.verifiedAt.toString(),
        };
        return acc;
      },
      {}
    );

    try {
      // generate metadata URI

      // const metaDataStatus = await storeMetaData(
      //   user.ethAddress,
      //   contributions,
      //   user.expressCount
      // );
      const metaDataStatus = {
        success: true,
        data: "https://dfafaf",
        error: null,
      };

      if (metaDataStatus.success === false) {
        console.log(metaDataStatus);
        return {
          success: false,
          error: metaDataStatus.error,
          data: null,
        };
      }

      const metadataURI = metaDataStatus.data;
      const expressAmount = user.expressCount;
      const receiver = user.ethAddress;
      const { domain, message } = config.generateTicketData({
        messageData: {
          expressAmount,
          metadataURI,
          receiver,
        },
      });

      const { ticketSignData, vc } = await signTicketAndVC({
        issuer_ethAddr: config.APPROVER_ADDRESS,
        issuer_privatekey: APPROVER_PRIVATE_KEY,
        issuer_publickey: config.APPROVER_PUBLIC_KEY,
        recipient_ethAddr: receiver,
        ethContractData: domain,
        ethContractMessage: message,
      });

      console.log("ti", ticketSignData);
      console.log("vc", vc);

      if (!vc) {
        throw new Error("invalid typeData");
      }

      console.log("exid", expressId);

      const signPayload = await prisma.signaturePayload.create({
        data: {
          // expressMsgId: expressId,
          metadataURI,
          receiverETHAddress: user.ethAddress,
          expressCount: user.expressCount,
          expressMessage: {
            connect: {
              id: expressId,
            },
          },
          sBTSignatureRecord: {
            connectOrCreate: {
              where: {
                signaturePayloadId: expressId,
              },
              create: {
                id: expressId,
                userId: discordId,
                sbtContractTypeId: config.CONTRACT_TYPE_ID,
                signedVC: vc,
                signatureData: ticketSignData,
              },
            },
          },
        },
        include: {
          sBTSignatureRecord: true,
        },
      });

      return {
        success: true,
        error: null,
        data: signPayload.sBTSignatureRecord,
      };
    } catch (error) {
      return {
        success: false,
        error: `signature generate error: ${error}`,
        data: null,
      };
    }
  });

  return signStatus;
};
