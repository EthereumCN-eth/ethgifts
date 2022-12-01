import fs from "fs";
import path from "path";
import { MD_DATA, COLLECTOR } from "./types";

const getCollectors = (): COLLECTOR => {
  return JSON.parse(
    fs.readFileSync(
      path.join(__dirname, "./originalData/collectors.json"),
      "utf-8"
    )
  );
};

const getContents = (): MD_DATA[] => {
  return JSON.parse(
    fs.readFileSync(
      path.join(__dirname, "./originalData/contents.json"),
      "utf-8"
    )
  );
};

const reformatContents = () => {
  const collectors: COLLECTOR = getCollectors();
  const contents: MD_DATA[] = getContents();

  const newContents = contents.map((content) => {
    return {
      title: content.content,
      mdDate: content.mdDate,
      messageId: content.messageId,
      rawMessage: content.rawMessage,
      content: content.content,
      url: content.url,
      contentType: content.contentType,
      discordName: content.discordName,
      discordId: collectors[content.discordName].discordId,
    };
  });

  fs.writeFileSync(
    path.join(__dirname, "./discordData.json"),
    JSON.stringify(newContents, null, 2)
  );
};

// const retrieveContent = () => {
//   const formattedData: MD_DATA[] = JSON.parse(
//     fs.readFileSync(
//       path.join(__dirname, "../originalData/discordData.json"),
//       "utf-8"
//     )
//   );

//   let collectors: COLLECTOR = {};

//   const content = formattedData.map((item) => {
//     collectors[item.discordName] = {
//       discordId: item.discordId,
//       ethAddress: item.ethAddress,
//     };
//     return {
//       title: item.content,
//       mdDate: item.mdDate,
//       messageId: item.messageId,
//       rawMessage: item.rawMessage,
//       content: item.content,
//       url: item.url,
//       contentType: item.contentType,
//       discordName: item.discordName,
//     };
//   });

//   fs.writeFileSync(
//     path.join(__dirname, "../originalData/contents.json"),
//     JSON.stringify(content)
//   );

//   fs.writeFileSync(
//     path.join(__dirname, "../originalData/collectors.json"),
//     JSON.stringify(collectors)
//   );
// };

// retrieveContent();
