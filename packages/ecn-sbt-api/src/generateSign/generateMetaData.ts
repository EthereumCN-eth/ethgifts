import Arweave from "arweave";
import * as config from "./config";
import { ARWEAVE_KEY, PINATA_API_KEY, PINATA_API_SECRET } from "./constants";
import { bundleAndSignData, createData } from "arbundles";
import { ArweaveSigner } from "arbundles/src/signing";
import pinataSDK from "@pinata/sdk";

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
): config.METADATA => {
  const metaData: config.METADATA = {
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

  try {
    const metadataURI = matchSBTLevel(expressAmount)
      ? await storeMetaDataWithArweave(metadata)
      : await storeMetaDataWithIPFS(metadata);

    return {
      success: true,
      data: metadataURI,
      error: "",
    };
  } catch (error) {
    return {
      success: false,
      data: "",
      error: `${error}`,
    };
  }
};

const storeMetaDataWithIPFS = async (metadata: config.METADATA) => {
  const pinata = pinataSDK(PINATA_API_KEY, PINATA_API_SECRET);

  const options = {
    pinataMetadata: {
      name: "expressSBTOwner",
    },
  };
  try {
    const result = await pinata.pinJSONToIPFS(metadata, options);
    return `ipfs://${result.IpfsHash}`;
  } catch (error) {
    throw `${error}`;
  }
};

const storeMetaDataWithArweave = async (metadata: config.METADATA) => {
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
      return `https://arweave.net/${bundle.getIds()[0]}`;
    } else {
      throw new Error("fail to bundle metadata to arweave");
    }
  } catch (error) {
    throw `${error}`;
  }
};

const matchSBTLevel = (expressAmount: Number) => {
  let sbtLevels = config.defaultSetting.SBTLevels;

  for (let i = 0; i < sbtLevels.length; i++) {
    if (expressAmount === sbtLevels[i]) {
      return true;
    }
  }

  return false;
};
