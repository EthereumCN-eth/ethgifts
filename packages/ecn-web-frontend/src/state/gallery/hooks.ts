import { useContractRead } from "wagmi";

export const useNFTRead = (
  contractReadObj: Parameters<typeof useContractRead>[0]
) => {
  return useContractRead(contractReadObj);
};
