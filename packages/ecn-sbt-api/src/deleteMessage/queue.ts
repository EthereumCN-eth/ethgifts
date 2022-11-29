import Bull, { Job } from "bull";
import { REDIS } from "./constants";
import { deleteMessage } from "./deleteMessage";

const deleteMessageQueue = new Bull("sign", REDIS);

const setupBull = () => {
  if (!deleteMessageQueue) return;

  deleteMessageQueue.process(async (job: Job) => {
    const updateStatus = await deleteMessage(job.data.msgId);
    // return signStatus;
    if (updateStatus && updateStatus.success) {
      return updateStatus;
    }

    await job.moveToFailed(
      { message: "update message contentType error" },
      true
    );
  });

  deleteMessageQueue.on("completed", (job, result) => {
    console.log("completed:", job.data.expressId);
    return {
      result: "ok",
      error: null,
      status: {
        signQueue: "completed",
      },
    };
  });

  deleteMessageQueue.on("failed", function (job, err) {
    // A job failed with reason `err`!
    console.log("failed:", err);
    return;
  });
  deleteMessageQueue.on("error", (err) => {
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

const deleteMsg = async (expressId: string) => {
  if (!deleteMessageQueue) return;
  const option = {
    attempts: 1000,
    backoff: 20000,
    // removeOnComplete: true,
  };
  await deleteMessageQueue.add(
    {
      expressId,
    },
    option
  );
};

export { deleteMsg };
