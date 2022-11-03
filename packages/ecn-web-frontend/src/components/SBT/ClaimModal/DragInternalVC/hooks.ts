import { useEffect } from "react";
import { useAccount } from "wagmi";

import { useReadClaimedLevel } from "../../StatusBoard/useReadClaimedLevel";
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

  const init = useInternalDragState((state) => state.init);
  const reset = useInternalDragState((state) => state.reset);

  useEffect(() => {
    if (loaded && isSuccess) {
      // console.log("load init");
      init(
        sbtLevel.map((_, i) => i),
        viewingSelectedIndex,
        sbtReduxState,
        claimedSbtArrayByLevel?.map((level: unknown) => Number(level) - 1) || []
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
