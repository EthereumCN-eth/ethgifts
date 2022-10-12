import { useContractRead } from "wagmi";

export const useNFTAndSBTRead = (
  contractReadObj: Parameters<typeof useContractRead>[0]
) => {
  return useContractRead(contractReadObj);
};
