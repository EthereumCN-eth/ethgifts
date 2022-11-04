import { useEffect, useRef } from "react";
import { useAccount } from "wagmi";

import { useReadClaimedLevel } from "../../../../hooks/useReadClaimedLevel";
import { useRect } from "../../../../hooks/useRect";
import { useAppSelector } from "@/state/reduxHooks";
import { selectors as sbtSelectors } from "@/state/sbt";

import { useInternalDragState } from "./internalDragState";

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

export const useComputeDropAreaTransformValue = ({
  dropped,
}: {
  dropped: boolean;
}) => {
  const [rect, mref] = useRect<HTMLDivElement>();
  const offSet = useRef(0);
  const setDropTargetX = useInternalDragState((state) => state.setDropTargetX);
  useEffect(() => {
    if (rect && rect.x !== 0) {
      setDropTargetX(rect.x);
      offSet.current = rect.x - window.innerWidth / 2 + rect.width / 2;
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rect?.x, rect?.width]); // console.log("dropTargetX", dropTargetX);

  const droppedStyle = dropped
    ? {
        transform: `translate(-${offSet.current}px,0)`,
      }
    : {};
  return {
    ref: mref,
    droppedStyle,
  };
};
