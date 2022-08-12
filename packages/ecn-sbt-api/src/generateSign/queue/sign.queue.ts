import Bull from "bull";
import { REDIS } from "../constants";
import { signProcess } from "../process/sign.process";
import * as config from "../config";
import { prisma } from "../../server";

const signatureGenerationQueue = new Bull("sign", REDIS);
signatureGenerationQueue.process(signProcess);
export const signAndSaveSignature = async (data: {
  discordId: string;
  expressId: string;
}) => {
  try {
    const availableToSign = await _availableToSign(
      data.discordId,
      data.expressId
    );
    console.log(availableToSign);
    if (availableToSign.result) {
      signatureGenerationQueue.add(data);
      signatureGenerationQueue.on("completed", () => {
        return {
          result: "ok",
          error: null,
          status: {
            availableToSign: availableToSign,
            signQueue: "completed",
          },
        };
      });
      signatureGenerationQueue.on("error", () => {
        return {
          result: "error",
          error: `fail to excute sign message`,
          status: {
            availableToSign: availableToSign,
            signQueue: "error",
          },
        };
      });
    } else {
      throw new Error(availableToSign.error);
    }
  } catch (error) {
    return {
      result: "error",
      error: `${error}`,
      status: {
        availableToSign: true,
        signQueue: "error",
      },
    };
  }
};

const _availableToSign = async (discordId: string, expressId: string) => {
  let availableToSign: boolean = false;
  try {
    const user = await prisma.user.findUnique({
      where: {
        discordId: discordId,
      },
      include: {
        expressMessages: {
          select: {
            id: true,
          },
        },
      },
    });

    const expressAmount = user?.expressMessages.length;

    if (expressAmount !== undefined && expressAmount > 0) {
      if (user?.expressMessages[expressAmount - 1].id !== expressId) {
        throw new Error(`trigger expressId ${expressId} not match`);
      }
      for (let i = 0; i < config.SBTLevels.length; i++) {
        if (config.SBTLevels[i] === expressAmount) {
          availableToSign = config.SBTLevels[i] === expressAmount;
          break;
        }
      }
    }

    return {
      result: availableToSign,
      error: "",
    };
  } catch (error) {
    return {
      result: availableToSign,
      error: `${error}`,
    };
  }
};
