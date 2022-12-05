import type { BigNumber } from "ethers";
import { constants } from "ethers";
import { useMemo, useRef } from "react";
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
  return useContractRead({
    //   abi: wagmigotchiABI,
    contractInterface: SBT1.abi,
    addressOrName: contractAddress || constants.AddressZero,
    chainId,
    functionName: "mintedLevels",
    args: [connectedAddress || constants.AddressZero],
  });
};

export const useReadClaimedSelectedLevel = ({
  chainId,
  contractAddress,
  connectedAddress,
  currentLevelNumber,
}: {
  chainId: number | undefined;
  contractAddress: string | undefined;
  connectedAddress: string | undefined;
  currentLevelNumber: number;
}) => {
  const { data: claimed, isSuccess } = useContractRead({
    contractInterface: SBT1.abi,
    addressOrName: contractAddress || constants.AddressZero,
    chainId,
    functionName: "mintedLevels",
    args: [connectedAddress || constants.AddressZero],
    enabled: !!connectedAddress && !!contractAddress && !!chainId,
  });
  const claimedArray = useMemo(() => {
    if (claimed) return claimed.map((v: BigNumber) => v.toNumber());
    return [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [claimed?.length, connectedAddress, contractAddress, chainId]);

  const isClaimed = useRef<boolean>(false);
  if (isSuccess)
    isClaimed.current = claimed
      ? claimedArray.includes(currentLevelNumber)
      : false;
  return isClaimed.current;
};
