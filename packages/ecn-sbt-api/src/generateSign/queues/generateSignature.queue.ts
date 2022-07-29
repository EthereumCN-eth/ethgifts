import Queue from "bull";
import { REDIS } from "../constants";
import { generateSignaturePayload } from "../processes/generateSignPayload.process";
import { sign } from "../generateSignature";
import { createBullBoard } from "@bull-board/api";
import { BullAdapter } from "@bull-board/api/bullAdapter";

export const generateSignatureQueue = async (
  discordId: string,
  expressId: string
) => {
  const generateSignatureQueue =
    REDIS !== undefined
      ? new Queue("generatePayload", REDIS)
      : new Queue("generatePayload");

  // const { setQueues, replaceQueues } = createBullBoard({
  //   queues: [new BullAdapter(generateSignatureQueue)],
  // });

  generateSignatureQueue.process(
    "generateSignPayload",
    generateSignaturePayload
  );

  await generateSignatureQueue.add("generateSignPayload", {
    discordId: discordId,
    expressId: expressId,
  });

  generateSignatureQueue.on("completed", (job) => {
    const data = job.data;
    sign(data.discordId, data.expressId, data.signaturePayloadId);
  });
};
