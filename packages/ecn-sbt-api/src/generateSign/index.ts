import { generateSignature } from "./generateSignature";

// discordId and expressId trigger excute generate signature payload
// payload generation is a queue job
// signature generation will be started until queue is completed
// generated signature will be saved in signatureRecord table.

export const sign = async (discordId: string, expressId: string) => {
  const signStatus = await generateSignature(discordId, expressId);

  return signStatus;
};
