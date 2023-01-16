import * as ethers from "ethers";
import { APPROVER_PRIVATE_KEY, DB_CONTRACT_TYPE_ID } from "./constants";
import { EIP712DOMAIN } from "./types";

export const generateTicketData = (
  eip712Domain: EIP712DOMAIN,
  {
    messageData,
  }: {
    messageData: {
      receiver: string;
      metadataURI: string;
      expressAmount: number;
    };
  }
) => {
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
    domain: eip712Domain,
    message: messageData,
  };
};

const ARPPROVER_WALLET = new ethers.Wallet(APPROVER_PRIVATE_KEY);
export const APPROVER_ADDRESS = ARPPROVER_WALLET.address;
export const APPROVER_PUBLIC_KEY = ARPPROVER_WALLET.publicKey;

export const CONTRACT_TYPE_ID_DB = Number(DB_CONTRACT_TYPE_ID);
