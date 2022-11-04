import { useEffect } from "react";
import { useAccount } from "wagmi";

import { useReadClaimedLevel } from "../../../../../hooks/useReadClaimedLevel";
import { useInternalDragState } from "../internalDragState";
import { useAppSelector } from "@/state/reduxHooks";
import { selectors as sbtSelectors } from "@/state/sbt";

export const useInitInternalDragState = ({
  viewingSelectedIndex,
}: {
  viewingSelectedIndex: number;
}) => {
  const { address } = useAccount();
  const sbtReduxState = useAppSelector(sbtSelectors.selectAll);
  const { loaded, sbtLevel, chainId, contractAddress } = sbtReduxState;
  const { data: claimedSbtArrayByLevel, isSuccess } = useReadClaimedLevel({
    chainId,
    connectedAddress: address,
    contractAddress,
  });

  const isLoadedClaimedLevels = !!claimedSbtArrayByLevel;

  const syncClaimLevels = useInternalDragState(
    (state) => state.syncClaimLevels
  );

  // sync onChain claim into zustand store
  useEffect(() => {
    if (isLoadedClaimedLevels) {
      syncClaimLevels(
        claimedSbtArrayByLevel?.map((level: unknown) => Number(level) - 1)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadedClaimedLevels, claimedSbtArrayByLevel?.length, syncClaimLevels]);

  const init = useInternalDragState((state) => state.init);
  const reset = useInternalDragState((state) => state.reset);

  useEffect(() => {
    if (loaded && isSuccess) {
      const claimedSbtArrayByLevelNumber =
        claimedSbtArrayByLevel?.map((level: unknown) => Number(level) - 1) ||
        [];
      // console.log("load init");
      init(
        sbtLevel.map((_, i) => i),
        viewingSelectedIndex,
        sbtReduxState,
        claimedSbtArrayByLevelNumber
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [init, loaded, isSuccess, viewingSelectedIndex]);

  // const state = useInternalDragState((state) => state);
  // console.log("state", state);

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);
};
