import type { BigNumber } from "ethers";

import { useReadClaimedSelectedLevel } from "@/hooks/useReadClaimedLevel";

import { useExternalDragState } from "./externalDragState";

export const useIsExternalClaimed = ({
  gradeLines,
}: {
  gradeLines: BigNumber[];
}) => {
  const parsedVC = useExternalDragState((state) => state.parsedVC);

  const expressAmount = parsedVC?.expressAmount || 0;
  const chainId = parsedVC?.chainId;
  const connectedAddress = parsedVC?.receiver;
  const contractAddress = parsedVC?.verifyingContract;

  const toMintLevelIndex = gradeLines
    .map((bn) => bn.toNumber())
    .reduce((acc, val) => {
      if (expressAmount > val) {
        return acc + 1;
      }
      return acc;
    }, 0);

  return useReadClaimedSelectedLevel({
    chainId,
    connectedAddress,
    contractAddress,
    currentLevelNumber: toMintLevelIndex,
  });
};
