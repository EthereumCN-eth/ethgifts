import * as ethers from "ethers";
import * as config from "./config";

// export const getCurrentNonce = async (address: string) => {
//   const express = new ethers.Contract(
//     config.ExpressSBT_ContractAddress,
//     config.ExpressSBT_ABI,
//     config.provider()
//   );

//   const nonce = await express.callStatic.nonces(address);

//   return nonce;
// };

// export const calculateSBTLevel = (
//   contribution_Amount: number
// ): number | undefined => {
//   const levels = config.defaultSetting.SBTLevels;
//   for (let i = levels.length - 1; i > 0; i++) {
//     if (contribution_Amount > levels[i]) {
//       return i;
//     }
//   }
// };
