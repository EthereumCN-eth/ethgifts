import { SBTSignatureRecord } from ".prisma/client";
import { prisma } from "../server";
import * as config from "./config";
import { getCurrentNonce } from "./utils";

export const sign = async (
  discordId: string,
  expressId: string,
  signaturePayloadId: number
) => {
  const signatureStatus = await prisma.$transaction(async (prisma) => {
    // get eth address
    const payload = await prisma.signaturePayload.findUnique({
      where: {
        id: signaturePayloadId,
      },
    });

    if (payload === null) {
      throw `${signaturePayloadId} payload is not existent`;
    }

    config.typedData.domain.chainId = (
      await config.provider().getNetwork()
    ).chainId;
    config.typedData.domain.verifyingContract =
      config.ExpressSBT_ContractAddress;
    config.typedData.message.receiver = payload?.receiverETHAddress;
    config.typedData.message.metadataURI = payload.metaDataIpfsUrl;
    config.typedData.message.expressCounters = payload.ExpressCount;

    try {
      config.typedData.message.nonces = await getCurrentNonce(
        payload?.receiverETHAddress
      );
    } catch (error) {
      return {
        success: false,
        error: "SBT contract has not been deployed",
        signatureRecord: null,
      };
    }

    const approver = config.Approver();

    const signature = await approver._signTypedData(
      config.typedData.domain,
      config.typedData.types,
      config.typedData.message
    );
    try {
      const signatureRecord = await prisma.sBTSignatureRecord.create({
        data: {
          userId: discordId,
          expressMessageId: expressId,
          sbtContractTypeId: config.defaultSetting.SBTContractType,
          signaturePayloadId: signaturePayloadId,
          SignatureData: signature,
        },
      });

      return {
        success: true,
        error: null,
        signatureRecord: signatureRecord,
      };
    } catch (error) {
      return {
        success: false,
        error: error,
        signatureRecord: null,
      };
    }
  });

  if (signatureStatus.success) {
    return {
      success: true,
      error: null,
      signatureRecord: signatureStatus.signatureRecord,
    };
  } else {
    return {
      success: false,
      error: signatureStatus.error,
      signatureRecord: null,
    };
  }
};
