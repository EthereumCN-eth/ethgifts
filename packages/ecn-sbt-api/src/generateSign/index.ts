import Bull, { Job } from "bull";
import { REDIS } from "./constants";
import { generateSignature } from "./generateSignature";

const signatureGenerationQueue = new Bull("sign", REDIS);
signatureGenerationQueue.process(async (job: Job) => {
  const signStatus = await generateSignature(
    job.data.discordId,
    job.data.expressId
  );

  return signStatus;
});

signatureGenerationQueue.on("completed", (job, result) => {
  console.log("completed:", result);
  return {
    result: "ok",
    error: null,
    status: {
      signQueue: "completed",
    },
  };
});
signatureGenerationQueue.on("error", (err) => {
  console.log("error:", err);
  return {
    result: "error",
    error: `fail to excute sign message`,
    status: {
      signQueue: "error",
    },
  };
});

const addToSignatureGenerationQueue = async (
  discordId: string,
  expressId: string
) => {
  const option = {
    attempts: 100,
    backoff: { type: "exponential", delay: 5000 },
    removeOnComplete: true,
  };
  await signatureGenerationQueue.add(
    {
      discordId,
      expressId,
    },
    option
  );
};

export { addToSignatureGenerationQueue };

// export const sign = async (discordId: string, expressId: string) => {
//   const signStatus = await generateSignature(discordId, expressId);

//   return signStatus;
// };
