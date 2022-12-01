import { Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useAccount } from "wagmi";

import { useInternalDragState } from "../internalDragState";
import { useReadClaimedLevel } from "@/hooks/useReadClaimedLevel";
import { useAppSelector } from "@/state/reduxHooks";
import { selectors as sbtSelectors } from "@/state/sbt";

import { hintText } from "./hintText";

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

  // const zuststate = useInternalDragState((state) => state);
  // console.log("zuststate", zuststate);

  const setClaimingHint = useInternalDragState(
    (state) => state.setClaimingHint
  );
  const selectedIndex = useInternalDragState((state) => state.selectedIndex);
  const isSelectedClaimed = useInternalDragState((state) =>
    state.computed.selectedClaimed(state)
  );
  // const state = useInternalDragState((state) => state);
  // console.log("state", state);

  useEffect(() => {
    const claimingHint = isSelectedClaimed ? (
      hintText.success({ selectedIndex })
    ) : (
      <Text>
        {`请拖入对应的线下VC文档到虚线框内，以激活 E群誌 SBT Lv${
          selectedIndex + 1
        } 的申领。`}
      </Text>
    );
    setClaimingHint({
      claimingHint,
    });
  }, [selectedIndex, setClaimingHint, isSelectedClaimed]);

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);
};
