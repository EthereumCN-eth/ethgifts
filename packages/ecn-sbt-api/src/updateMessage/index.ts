import Bull, { Job } from "bull";
import { REDIS } from "./constants";
import { updateMessageContentType } from "./updateMessage";

const updateMessageQueue =
  process.env.BULLQUEUE_SIGN === "true" && new Bull("sign", REDIS);

const setupBull = () => {
  if (!updateMessageQueue) return;

  updateMessageQueue.process(async (job: Job) => {
    const updateStatus = await updateMessageContentType(
      job.data.msgId,
      job.data.contentType
    );
    // return signStatus;
    if (updateStatus && updateStatus.success) {
      return updateStatus;
    }

    await job.moveToFailed(
      { message: "update message contentType error" },
      true
    );
  });

  updateMessageQueue.on("completed", (job, result) => {
    console.log("completed:", job.data.expressId);
    return {
      result: "ok",
      error: null,
      status: {
        signQueue: "completed",
      },
    };
  });

  updateMessageQueue.on("failed", function (job, err) {
    // A job failed with reason `err`!
    console.log("failed:", err);
    return;
  });
  updateMessageQueue.on("error", (err) => {
    // console.log("error:", err);
    return {
      result: "error",
      error: `fail to excute update message content type`,
      status: {
        signQueue: "error",
      },
    };
  });
};

setupBull();

const updateMessageContentTypeWithQueue = async (
  discordId: string,
  expressId: string
) => {
  if (!updateMessageQueue) return;
  const option = {
    attempts: 1000,
    backoff: 20000,
    // removeOnComplete: true,
  };
  await updateMessageQueue.add(
    {
      discordId,
      expressId,
    },
    option
  );
};

export { updateMessageContentTypeWithQueue };
