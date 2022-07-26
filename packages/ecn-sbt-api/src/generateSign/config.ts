import { ethers, providers } from "ethers";
import * as dotenv from "dotenv";
dotenv.config();

export const ExpressSBT_ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "nonces",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export const ExpressSBT_ContractAddress = "";

export const alchemyProvider = () => {
  return new providers.AlchemyProvider("homestead", process.env.ALCHEMY_KEY);
};

export const Approver = (): ethers.Wallet => {
  const private_key =
    process.env.APPROVER_PRIVATE_KEY !== undefined
      ? process.env.APPROVER_PRIVATE_KEY
      : "";
  const approver = new ethers.Wallet(private_key, alchemyProvider());

  return approver;
};

export const defaultSetting = {
  SBTname: "SBT",
  SBTDescription: "666",
  SBTLevels: [20, 100, 300],
};

export const typedData = {
  types: {
    mintExpress: [
      { name: "receiver", type: "address" },
      { name: "metadataURI", type: "string" },
      { name: "expressCounters", type: "uint256" },
      { name: "nonces", type: "uint256" },
    ],
  },

  domain: {
    name: "ExpressSBT",
    version: "1",
    chainId: 0,
    verifyingContract: "",
  },

  message: {
    receiver: "",
    metadataURI: "",
    expressCounters: 0,
    nonces: 0,
  },
};
