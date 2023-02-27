import Bull, { Job } from "bull";
import { REDIS } from "./constants";
import { generateSignature } from "./generateSignature";
import { generateMetaData } from "../getUrlMetaData/getMetaData";
import { User } from "@prisma/client";

const signatureGenerationQueue =
  process.env.BULLQUEUE_SIGN === "true" && new Bull("sign", REDIS);

const setupBull = () => {
  if (!signatureGenerationQueue) return;

  signatureGenerationQueue.process(async (job: Job) => {
    const signStatus = await generateSignature(
      job.data.userExpress,
      job.data.sbtContractTypeId
    );

    // await generateMetaData(job.data.expressId, job.data.url);

    // return signStatus;
    if (signStatus && signStatus.success) {
      return signStatus;
    }

    await job.moveToFailed({ message: "signatureGenerationQueue error" }, true);
  });

  signatureGenerationQueue.on("completed", (job, result) => {
    console.log("completed:", job.data.expressId);
    return {
      result: "ok",
      error: null,
      status: {
        signQueue: "completed",
      },
    };
  });

  signatureGenerationQueue.on("failed", function (job, err) {
    // A job failed with reason `err`!
    console.log("failed:", err);
    return;
  });
  signatureGenerationQueue.on("error", (err) => {
    // console.log("error:", err);
    return {
      result: "error",
      error: `fail to excute sign message`,
      status: {
        signQueue: "error",
      },
    };
  });
};

setupBull();

const addToSignatureGenerationQueue = async (
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
  if (!signatureGenerationQueue) return;
  const option = {
    attempts: 1000,
    backoff: 20000,
    // removeOnComplete: true,
  };
  await signatureGenerationQueue.add(
    {
      userExpress,
      sbtContractTypeId,
    },
    option
  );
};

export { addToSignatureGenerationQueue };

// export const sign = async (discordId: string, expressId: string) => {
//   const signStatus = await generateSignature(discordId, expressId);

//   return signStatus;
// };
