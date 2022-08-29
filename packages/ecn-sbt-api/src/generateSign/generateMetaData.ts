import Arweave from "arweave";
import * as config from "./config";
import { ARWEAVE_KEY } from "./constants";
import { bundleAndSignData, createData } from "arbundles";
import { ArweaveSigner } from "arbundles/src/signing";

interface METADATA {
  name: string;
  description: string;
  issuer: string;
  expressAmount: number;
  subject: string;
  contributions: {
    [index: string]: {
      expressId: string;
      content: string;
      contentURI: string;
      verifiedDate: string;
    };
  };
}

const generateMetaData = (
  contributor: string,
  contributions: {
    [index: string]: {
      expressId: string;
      content: string;
      contentURI: string;
      verifiedDate: string;
    };
  },
  expressAmount: number
): METADATA => {
  const metaData: METADATA = {
    name: config.defaultSetting.SBTname,
    description: config.defaultSetting.SBTDescription,
    issuer: config.APPROVER_ADDRESS,
    expressAmount: expressAmount,
    subject: contributor,
    contributions: contributions,
  };

  return metaData;
};

export const storeMetaData = async (
  subject: string,
  contributions: {
    [index: string]: {
      expressId: string;
      content: string;
      contentURI: string;
      verifiedDate: string;
    };
  },
  expressAmount: number
) => {
  // generate metadata
  const metadata = generateMetaData(subject, contributions, expressAmount);

  const arweave = Arweave.init({
    host: "arweave.net",
    port: 443,
    protocol: "https",
    timeout: 20000, // Network request timeouts in milliseconds
    logging: false, // Disable network request logging
  });

  const key = JSON.parse(ARWEAVE_KEY);
  const signer = new ArweaveSigner(key);
  const dataItems = [
    createData(JSON.stringify(metadata, null, 2), signer, {
      tags: [
        { name: "Bundle-Format", value: "json" },
        { name: "Bundle-Version", value: "1.0.0" },
        { name: "Content-Type", value: "application/json" },
      ],
    }),
  ];
  try {
    const bundle = await bundleAndSignData(dataItems, signer);

    const tx = await bundle.toTransaction({}, arweave, key);
    await arweave.transactions.sign(tx, key);
    // console.log(`posting...`);
    // console.log(await arweave.transactions.post(tx));

    if (await bundle.verify()) {
      return {
        success: true,
        data: `https://arweave.net/${bundle.getIds()[0]}`,
        error: "",
      };
    } else {
      return {
        success: false,
        data: "",
        error: "fail to upload to arweave",
      };
    }
  } catch (error) {
    return {
      success: false,
      data: "",
      error: "fail to connect to arweave",
    };
  }
};
