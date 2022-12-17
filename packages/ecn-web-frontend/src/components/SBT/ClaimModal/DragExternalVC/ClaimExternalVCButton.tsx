import { Button } from "@chakra-ui/react";
import type { BigNumber } from "ethers";
import { useCallback, useEffect, useRef, useState } from "react";

import { responsive } from "../../../../styles/utils";
import { calcLen } from "../hooks/calcLen";

import { useExternalDragState } from "./externalDragState";
import { useExternalClaim } from "./useExternalClaim";
import { useIsExternalClaimed } from "./useIsExternalClaimed";

export const ClaimExternalVCButton = ({
  gradeLines,
}: {
  gradeLines: BigNumber[];
}) => {
  // const parsedVC = useExternalDragState((state) => state.parsedVC);

  const isClaim = useIsExternalClaimed({ gradeLines });

  const fileText = useExternalDragState((state) => state.fileText);

  const [clicked, setClicked] = useState(false);
  const trRef = useRef<number>();
  useEffect(() => {
    if (clicked) {
      if (trRef.current) clearTimeout(trRef.current);
      trRef.current = window.setTimeout(() => {
        setClicked(false);
      }, 2000);
      return () => {
        clearTimeout(trRef.current);
      };
    }
    return () => {};
  }, [clicked]);

  const setClaiming = useExternalDragState((state) => state.setClaiming);
  const isClaiming = useExternalDragState((state) => state.isClaiming);
  const setClaimingStatus = useExternalDragState(
    (state) => state.setClaimingStatus
  );
  const reset = useCallback(() => setClaiming(false), [setClaiming]);
  const { isSignRightStatus, isTxStatus, isVCRightStatus, isWriteStatus } =
    useExternalClaim({
      clicked: isClaiming,
      vcStr: fileText,
      reset,
      onCancel: reset,
    });
  useEffect(() => {
    setClaimingStatus({
      isSignRightStatus,
      isTxStatus,
      isVCRightStatus,
      isWriteStatus,
    });
  }, [
    isSignRightStatus,
    isTxStatus,
    isVCRightStatus,
    isWriteStatus,
    setClaimingStatus,
  ]);
  return (
    <Button
      // w="43%"
      fontSize={`${calcLen(responsive.respW(16))}px`}
      // isLoading={isSwitchNetworkLoading}
      onClick={() => {
        setClicked(true);
        setClaiming(true);
      }}
      disabled={isClaim}
      px="20px"
      mx="0"
      h="fit-content"
      borderRadius="16px"
      variant="whiteOutline"
      py="8px"
    >
      {isClaim ? "对应 SBT 已申领" : "确认信息并申领 SBT"}
    </Button>
  );
};
