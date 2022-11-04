import { useEffect } from "react";

import { useInternalDragState } from "../internalDragState";
import type { ParseVCForPayloadDataType } from "@/utils/vc";

export function useClaimSBTFromVC({
  verifyPayload,
}: {
  verifyPayload: ParseVCForPayloadDataType;
}) {
  const setClaimingHint = useInternalDragState(
    (state) => state.setClaimingHint
  );
  const payloadreceived = !!verifyPayload;
  useEffect(() => {
    setClaimingHint({ claimingHint: "dropped" });
  }, [payloadreceived, setClaimingHint]);
}
