import { sign } from "./generateSignature";
import { generateSignPayload } from "./generatePayload";
import { app } from "../server";
import dotenv from "dotenv";
dotenv.config();

// discordId and expressId trigger excute generate signature payload
// payload generation is a queue job
// signature generation will be started until queue is completed
// generated signature will be saved in signatureRecord table.

// app.post("/test-sign", (req, res) => {
//   const { discordId, expressId } = req.body;
//   generateSignatureQueue(discordId, expressId);
//   res.send({ status: "post is ok" });
// });

export const generateSignature = async (
  discordId: string,
  expressId: string
) => {
  const payload = await generateSignPayload(discordId, expressId);

  if (!payload.success) {
    throw payload.error;
  }

  const signStatus = await sign(
    payload.data.discordId,
    payload.data.expressId,
    payload.data.payloadId
  );

  if (signStatus.success) {
    return {
      success: true,
      error: null,
      signatureRecord: signStatus.signatureRecord,
    };
  } else {
    return {
      success: false,
      error: signStatus.error,
      signatureRecord: null,
    };
  }
};
