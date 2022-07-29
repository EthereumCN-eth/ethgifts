import { ethers, providers } from "ethers";
import { ARWEAVE_KEY, APPROVER_PRIVATE_KEY } from "./constants";

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
  return new providers.AlchemyProvider("homestead", ARWEAVE_KEY);
};

export const Approver = (): ethers.Wallet => {
  const approver = new ethers.Wallet(APPROVER_PRIVATE_KEY, alchemyProvider());

  return approver;
};

export const defaultSetting = {
  SBTname: "SBT",
  SBTDescription: "666",
  SBTLevels: [20, 100, 300],
  SBTContractType: 1,
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
