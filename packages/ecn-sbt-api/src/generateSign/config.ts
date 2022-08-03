import * as ethers from "ethers";
import {
  APPROVER_PRIVATE_KEY,
  ALKEMY_KEY_MAINNET,
  INFURA_KEY_RINKEBY,
} from "./constants";

export const ExpressSBT_ContractAddress = "";

const onTest = true;

export const provider = () => {
  if (onTest) {
    return new ethers.providers.InfuraProvider("homestead", INFURA_KEY_RINKEBY);
  } else {
    return new ethers.providers.AlchemyProvider(
      "homestead",
      ALKEMY_KEY_MAINNET
    );
  }
};

export const Approver = (): ethers.Wallet => {
  return new ethers.Wallet(APPROVER_PRIVATE_KEY, provider());
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
