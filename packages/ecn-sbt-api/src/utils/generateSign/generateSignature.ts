import { signTicketAndVC } from "../../../../ecn-eip712vc/src/index";
import { prisma } from "../../server";
import { storeMetaData } from "./generateMetaData";
import * as config from "./config";
// import { signTicket } from "ecn-eip712vc";
import { APPROVER_PRIVATE_KEY } from "./constants";
import {
  EIP712DOMAIN,
  TypeContributions,
  SBTCONTRACT_DATA_CACHE,
} from "./types";
import { User } from "@prisma/client";

export const generateSignature = async (
  userExpress: User & {
    expressMessages: {
      expressMessage: string;
      id: string;
      expressUrl: string;
      verifiedAt: Date;
    }[];
  },
  sbtContractTypeId: number
) => {
  try {
    // const signStatus = await prisma.$transaction(async (prisma) => {
    // get eth address
    // const user = await prisma.user.findUnique({
    //   where: {
    //     discordId: discordId,
    //   },
    //   include: {
    //     expressMessages: {
    //       select: {
    //         id: true,
    //         expressMessage: true,
    //         expressUrl: true,
    //         verifiedAt: true,
    //       },
    //     },
    //   },
    // });

    const user = userExpress;

    if (!user || !user.ethAddress) {
      throw new Error("please register address at first");
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

    const sbtContractDataCache = await getSBTContractDataCache(
      sbtContractTypeId
    );

    // generate metadata URI
    // const metaDataStatus = await storeMetaData(
    //   sbtContractDataCache.metaDataName,
    //   sbtContractDataCache.metaDataDescription,
    //   sbtContractDataCache.issuer,
    //   user.ethAddress,
    //   contributions,
    //   expresses.length
    // );

    // faked data, off it before product launch
    const metaDataStatus = {
      success: true,
      data: "ipfs://QmbVCG8W3iwL9SL7KEBfQnjLEkePPgj2ACyay2BzDraBim",
      error: ``,
    };

    if (metaDataStatus.success === false) {
      console.log(metaDataStatus);
      throw new Error(metaDataStatus.error);
    }

    const metadataURI = metaDataStatus.data;
    const expressAmount = expresses.length;
    const receiver = user.ethAddress;
    const EIP712domain: EIP712DOMAIN = sbtContractDataCache.EIP712Domain;
    const { message } = config.generateTicketData(EIP712domain, {
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
      ethContractData: EIP712domain,
      ethContractMessage: message,
    });

    // console.log("ti", ticketSignData);
    // console.log("vc", vc);

    if (!vc) {
      throw new Error("invalid typeData");
    }

    // console.log("exid", expressId);
    const expressId = userExpress.expressMessages[expressAmount - 1].id;

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
              userId: user.discordId,
              sbtContractTypeId: config.CONTRACT_TYPE_ID_DB,
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
    // });

    // return signStatus;
  } catch (err) {
    throw err;
  }
};

let SBTContractDataCache = new Map();

const getSBTContractDataCache = async (
  sbtContractTypeId: number
): Promise<SBTCONTRACT_DATA_CACHE> => {
  if (SBTContractDataCache.has(sbtContractTypeId)) {
    return SBTContractDataCache.get(sbtContractTypeId);
  } else {
    const sbtContract = await prisma.sBTContractType.findUnique({
      where: {
        id: sbtContractTypeId,
      },
    });

    if (sbtContract !== null) {
      const EIP712Domain = {
        name: sbtContract.contractName,
        version: sbtContract.version,
        chainId: sbtContract.chainId,
        verifyingContract: sbtContract.contractAddress,
      };

      const sbtContractDataCache: SBTCONTRACT_DATA_CACHE = {
        metaDataName: sbtContract.metaDataName,
        metaDataDescription: sbtContract.metaDataDescription,
        issuer: sbtContract.issuerAddress,
        EIP712Domain: EIP712Domain,
      };

      SBTContractDataCache.set(sbtContractTypeId, sbtContractDataCache);
      return sbtContractDataCache;
    } else {
      throw new Error("fail to get domain");
    }
  }
};
