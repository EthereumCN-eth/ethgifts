import { Job } from "bull";
import { generateSignature } from "../generateSignature";

export const signProcess = async (job: Job) => {
  const signStatus = await generateSignature(
    job.data.discordId,
    job.data.expressId
  );

  return signStatus;
};
