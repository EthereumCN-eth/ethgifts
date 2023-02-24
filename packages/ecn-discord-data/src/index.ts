import fs from "fs";
import path from "path";
import { addRawMessages, addMessage } from "./addMessages/addMsgs";
import { updateCollector } from "./addMessages/updateCollector";
import { MD_DATA, COLLECTOR } from "./types";

const main = async () => {
  const collectors: COLLECTOR = JSON.parse(
    fs.readFileSync(
      path.join(__dirname, "../LatestData/collectors.json"),
      "utf-8"
    )
  );

  const formattedData: MD_DATA[] = JSON.parse(
    fs.readFileSync(
      path.join(__dirname, "../LatestData/contents.json"),
      "utf-8"
    )
  );

  const updateCollectorResult = await updateCollector(collectors);
  if (updateCollectorResult.success) {
    const saveRaw = await addRawMessages(formattedData);
    if (saveRaw.success) {
      await addMessage(formattedData);
    }
  }
};

main();
