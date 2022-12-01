import { useCallback, useMemo } from "react";

import { useInternalDragState } from "../internalDragState";

import { hintText } from "./hintText";

export const useClaimingHintSetter = () => {
  const setClaimingHint = useInternalDragState(
    (state) => state.setClaimingHint
  );
  const selectedIndex = useInternalDragState((state) => state.selectedIndex);

  const setClaimingProcessing = useCallback(() => {
    setClaimingHint({ claimingHint: hintText.processing({ selectedIndex }) });
  }, [selectedIndex, setClaimingHint]);
  const setClaimingCancelling = useCallback(() => {
    setClaimingHint({ claimingHint: hintText.cancelling({ selectedIndex }) });
  }, [selectedIndex, setClaimingHint]);

  return useMemo(
    () => ({
      setClaimingProcessing,
      setClaimingCancelling,
    }),
    [setClaimingCancelling, setClaimingProcessing]
  );
};
