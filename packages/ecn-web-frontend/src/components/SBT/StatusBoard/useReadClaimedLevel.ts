import { constants } from "ethers";
import { useContractRead } from "wagmi";

import SBT1 from "@/abis/SBT1.json";

export const useReadClaimedLevel = ({
  chainId,
  contractAddress,
  connectedAddress,
}: {
  chainId: number;
  contractAddress: string;
  connectedAddress: string | undefined;
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, isError, isLoading } = useContractRead({
    //   abi: wagmigotchiABI,
    contractInterface: SBT1.abi,
    addressOrName: contractAddress || constants.AddressZero,
    chainId,
    functionName: "mintedLevels",
    args: [connectedAddress || constants.AddressZero],
  });

  return data;
};
