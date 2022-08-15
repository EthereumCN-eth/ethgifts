import * as ethers from "ethers";
import {
  APPROVER_PRIVATE_KEY,
  ALKEMY_KEY_MAINNET,
  INFURA_KEY_RINKEBY,
} from "./constants";

export const EXPRESS_SBT_CONTRACT_ADDRESS =
  "0x6a453A70F6faC3abEF56E1Cb6741B06A25b9E9fB";

const DOMAIN_DATA = {
  name: "ExpressSBT",
  version: "1",
  chainId: 1,
  verifyingContract: EXPRESS_SBT_CONTRACT_ADDRESS,
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

const ARPPROVER_WALLET = new ethers.Wallet(APPROVER_PRIVATE_KEY);
export const APPROVER_ADDRESS = ARPPROVER_WALLET.address;
export const APPROVER_PUBLIC_KEY = ARPPROVER_WALLET.publicKey;

export const defaultSetting = {
  SBTname: "SBT",
  SBTDescription: "666",
  SBTLevels: [20, 100, 300],
  SBTContractType: 1,
};

// export const typedData = {
//   types: {
//     mintExpress: [
//       { name: "receiver", type: "address" },
//       { name: "metadataURI", type: "string" },
//       { name: "expressAmount", type: "uint256" },
//     ],
//   },

//   domain: {
//     name: "ExpressSBT",
//     version: "1",
//     chainId: 1,
//     verifyingContract: ExpressSBT_ContractAddress,
//   },

//   message: {
//     receiver: "",
//     metadataURI: "",
//     expressAmount: 0,
//   },
// };

export const SBTLevels = [5, 10, 15];
export const CONTRACT_TYPE_ID = 1;
