import * as ethers from "ethers";
import {
  APPROVER_PRIVATE_KEY,
  DB_CONTRACT_TYPE_ID,
  DOMAIN_EXPRESS_SBT_CHAINID,
  DOMAIN_EXPRESS_SBT_CONTRACT,
  DOMAIN_EXPRESS_SBT_NAME,
  DOMAIN_EXPRESS_SBT_VERSION,
} from "./constants";

const DOMAIN_DATA = {
  name: DOMAIN_EXPRESS_SBT_NAME,
  version: DOMAIN_EXPRESS_SBT_VERSION,
  chainId: Number(DOMAIN_EXPRESS_SBT_CHAINID),
  verifyingContract: DOMAIN_EXPRESS_SBT_CONTRACT,
};

export const generateTicketData = ({
  messageData,
}: {
  messageData: {
    receiver: string;
    metadataURI: string;
    expressAmount: number;
  };
}) => {
  return {
    types: {
      EIP712Domain: [
        { name: "name", type: "string" },
        { name: "version", type: "string" },
        { name: "chainId", type: "uint256" },
        { name: "verifyingContract", type: "address" },
      ],
      mintExpress: [
        { name: "receiver", type: "address" },
        { name: "metadataURI", type: "string" },
        { name: "expressAmount", type: "uint256" },
      ],
    },
    primaryType: "mintExpress",
    domain: DOMAIN_DATA,
    message: messageData,
  };
};

const ARPPROVER_WALLET = new ethers.Wallet(APPROVER_PRIVATE_KEY);
export const APPROVER_ADDRESS = ARPPROVER_WALLET.address;
export const APPROVER_PUBLIC_KEY = ARPPROVER_WALLET.publicKey;

export const defaultSetting = {
  SBTname: "SBT",
  SBTDescription: "666",
  SBTLevels: [20, 100, 300],
  SBTContractType: 1,
};

export const CONTRACT_TYPE_ID_DB = Number(DB_CONTRACT_TYPE_ID);

export interface METADATA {
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
