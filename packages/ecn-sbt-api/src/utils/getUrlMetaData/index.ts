import { MetaData, generateMetaData } from "./getMetaData";
import { verifyMediaUrl } from "./utils";
import { prisma } from "../../server";

import Bull, { Job } from "bull";
import { REDIS } from "./constants";

/**
 * @dev test link:
 * media(media): https://twitter.com/MevRefund/status/1579199432452886528
 *
 *
 * ogData: https://bogota.ethglobal.com/
 * https://www.theblock.co/post/178896/zksync-to-launch-on-mainnet-this-month-what-you-need-to-know?utm_source=twitter&utm_medium=social
 *
 *
 * https://www.youtube.com/channel/UCrJfD36TJb60hlSl6taZ7rw/videos
 * https://www.youtube.com/watch?v=r8jSHcHQJoU
 * https://evmsummit.org/
 *
 *
 * onlyMeta: https://www.tuoniaox.com/news/p-541633.html
 * noMeta:
 */

const metaDataGenerateQueue =
  process.env.BULLQUEUE_SIGN === "true" && new Bull("sign", REDIS);

const setupBull = () => {
  if (!metaDataGenerateQueue) return;

  metaDataGenerateQueue.process(async (job: Job) => {
    await generateMetaData(job.data.msgId, job.data.url);
    // return signStatus;

    await job.moveToFailed({ message: "signatureGenerationQueue error" }, true);
  });

  metaDataGenerateQueue.on("completed", (job, result) => {
    console.log("completed:", job.data.expressId);
    return {
      result: "ok",
      error: null,
      status: {
        signQueue: "completed",
      },
    };
  });

  metaDataGenerateQueue.on("failed", function (job, err) {
    // A job failed with reason `err`!
    console.log("failed:", err);
    return;
  });
  metaDataGenerateQueue.on("error", (err) => {
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

const addToMetaDataGenerateQueue = async (msgId: string, url: string) => {
  if (!metaDataGenerateQueue) return;
  const option = {
    attempts: 1000,
    backoff: 20000,
    // removeOnComplete: true,
  };
  await metaDataGenerateQueue.add(
    {
      msgId,
      url,
    },
    option
  );
};

export { addToMetaDataGenerateQueue };

// getMetaData("https://evmsummit.org/");
