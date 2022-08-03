import { prisma } from "../server";
import { storageMetaData } from "./generateMetaData";
import * as config from "./config";

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

    // generate metadata content
    let contributions: {
      [index: string]: {
        expressId: string;
        content: string;
        contentURI: string;
        verifiedDate: string;
      };
    } = {};
    const expresses = user.expressMessages;

    for (let i = 0; i < expresses.length; i++) {
      contributions[i + 1] = {
        expressId: expresses[i].id.toString(),
        content: expresses[i].expressMessage,
        contentURI: expresses[i].expressUrl,
        verifiedDate: expresses[i].verifiedAt.toString(),
      };
    }

    try {
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

      config.typedData.domain.chainId = (
        await config.provider().getNetwork()
      ).chainId;
      config.typedData.domain.verifyingContract =
        config.ExpressSBT_ContractAddress;
      config.typedData.message.receiver = user.ethAddress;
      config.typedData.message.metadataURI = "https://exmaple.com"; // testing. original code: metaDataStatus.data
      config.typedData.message.expressAmount = expresses.length;

      const approver = config.Approver();

      const signature = await approver._signTypedData(
        config.typedData.domain,
        config.typedData.types,
        config.typedData.message
      );

      const signatureRecord = await prisma.sBTSignatureRecord.create({
        data: {
          userId: discordId,
          expressMessageId: expressId,
          sbtContractTypeId: config.defaultSetting.SBTContractType,
          signaturePayloadId: newPayload.id,
          SignatureData: signature,
        },
      });

      return {
        success: true,
        error: null,
        data: signatureRecord,
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
