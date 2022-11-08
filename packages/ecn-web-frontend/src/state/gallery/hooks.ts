import { useContractRead } from "wagmi";

export const useNFTRead = (
  contractReadObj: Parameters<typeof useContractRead>[0]
) => {
  // console.log("contractReadObj", contractReadObj);
  return useContractRead(contractReadObj);
};
