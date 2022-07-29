import { generateSignatureQueue } from "./queues/generateSignature.queue";

// discordId and expressId trigger excute generate signature payload
// payload generation is a queue job
// signature generation will be started until queue is completed
// generated signature will be saved in signatureRecord table.

export const generateSignature = (discordId: string, expressId: string) => {
  generateSignatureQueue(discordId, expressId);
};
