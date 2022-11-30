import fs from "fs";
import path from "path";
import { addRawMessages, addMessage } from "./addMessages/addMsgs";
import { updateCollector } from "./addMessages/updateCollector";
import { MD_DATA, COLLECTOR } from "./types";

const main = async () => {
  const collectors: COLLECTOR = JSON.parse(
    fs.readFileSync(
      path.join(__dirname, "../originalData/collectors.json"),
      "utf-8"
    )
  );

  const formattedData: MD_DATA[] = JSON.parse(
    fs.readFileSync(
      path.join(__dirname, "../originalData/contents.json"),
      "utf-8"
    )
  );

  await updateCollector(collectors);
  const saveRaw = await addRawMessages(collectors, formattedData);
  if (saveRaw) {
    await addMessage(collectors, formattedData);
  }
};

main();
