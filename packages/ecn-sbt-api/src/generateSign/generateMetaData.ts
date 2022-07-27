import Arweave from "arweave";
import * as config from "./config";
import { ARWEAVE_KEY } from "./constants";

interface METADATA {
  name: string;
  description: string;
  issuer: string;
  expressCounter: number;
  subject: string;
  contributions: {
    [expressId: number]: {
      content: string;
      contentURI: string;
      verifiedDate: number;
    };
  };
}

const generateMetaData = (
  contributor: string,
  contributions: {
    [expressId: number]: {
      content: string;
      contentURI: string;
      verifiedDate: number;
    };
  },
  expressCounter: number
): METADATA => {
  const metaData: METADATA = {
    name: config.defaultSetting.SBTname,
    description: config.defaultSetting.SBTDescription,
    issuer: config.Approver().address,
    expressCounter: expressCounter,
    subject: contributor,
    contributions: contributions,
  };

  return metaData;
};

export const storageMetaData = async (
  subject: string,
  contributions: {
    [expressId: number]: {
      content: string;
      contentURI: string;
      verifiedDate: number;
    };
  },
  expressCounter: number
): Promise<string> => {
  // generate metadata
  const metadata = generateMetaData(subject, contributions, expressCounter);

  const arweave = Arweave.init({
    host: "arweave.net",
    port: 443,
    protocol: "https",
    timeout: 20000, // Network request timeouts in milliseconds
    logging: false, // Disable network request logging
  });

  const key = JSON.parse(ARWEAVE_KEY);

  const dataforTX = JSON.stringify(metadata);
  const transaction = await arweave.createTransaction(
    {
      data: dataforTX,
    },
    key
  );

  await arweave.transactions.sign(transaction, key);
  // await arweave.transactions.post(transaction);

  // let uploader = await arweave.transactions.getUploader(transaction);

  // while (!uploader.isComplete) {
  //   await uploader.uploadChunk();
  //   console.log(
  //     `${uploader.pctComplete}% complete, ${uploader.uploadedChunks}/${uploader.totalChunks}`
  //   );
  // }

  console.log("transaction id", transaction.id);
  //   console.log("transaction data", Buffer.from(transaction.data).toString());
  const status = await arweave.transactions.getStatus(transaction.id);

  console.log(status);

  return transaction.id;
};
