import { Box, Flex, HStack, Text } from "@chakra-ui/react";
import { css } from "@emotion/react";
import type { Dispatch, SetStateAction } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BsCheckCircle } from "react-icons/bs";

import { DragIndicator } from "@/components/SBT/ClaimModal/DragInternalVC/DragIndicator";
import { useAppSelector } from "@/state/reduxHooks";
import { selectors as sbtSelectors } from "@/state/sbt";
import { responsive } from "@/styles/utils";

// import { ClaimHint } from "./ClaimHint";
// import { CongrasConfetti } from "./SizedConfetti";
import { VCDropAreaView } from "./VCDropAreaView";
import { VCToDragView } from "./VCToDragView";

export const ClaimPanel = ({
  levelIndex,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isClaimed,
  claimed,
  setClaimed,
}: {
  levelIndex: number;
  isClaimed: boolean;
  claimed: boolean;
  setClaimed: Dispatch<SetStateAction<boolean>>;
}) => {
  const { artworks } = useAppSelector(sbtSelectors.selectAll);
  const [dropped, setDropped] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  const [hintStatus, setHintStatus] = useState<
    "process" | "success" | "fail" | "null"
  >("null");
  const onCancelTimerRef = useRef<number>();
  const onResetTimerRef = useRef<number>();
  const onSuccessTimerRef = useRef<number>();
  const onCancel = useCallback(() => {
    onCancelTimerRef.current = window.setTimeout(() => {
      setDropped(false);
    }, 3000);

    setHintStatus("fail");
  }, []);

  const onSuccess = useCallback(() => {
    onSuccessTimerRef.current = window.setTimeout(() => {
      setDropped(false);
      setClaimed(true);
    }, 3000);

    setHintStatus("success");
  }, [setClaimed]);
  // const onSuccess = useCallback(() => {
  //   onCancelTimerRef.current = window.setTimeout(() => {
  //     setDropped(false);
  //   }, 3000);

  //   setHintStatus("fail");
  // }, []);

  // const onCancel = useCallback(() => {
  //   onSuccessTimerRef.current = window.setTimeout(() => {
  //     setDropped(false);
  //     setClaimed(true);
  //   }, 3000);

  //   setHintStatus("success");
  // }, [setClaimed]);

  // cleanup
  useEffect(() => {
    return () => {
      clearTimeout(onCancelTimerRef.current);
      clearTimeout(onResetTimerRef.current);
      clearTimeout(onSuccessTimerRef.current);
    };
  }, []);
  const onProcess = useCallback(() => {
    setHintStatus("process");
  }, []);
  const reset = useCallback(() => {
    // setDropped(false);
    onResetTimerRef.current = window.setTimeout(() => {
      setDropped(false);
    }, 3000);
    setHintStatus("null");
  }, []);

  const artwork = artworks[levelIndex];

  return (
    <>
      {!claimed && (
        <Text
          css={css`
            font-family: "PingFang SC";
            font-style: normal;
            font-weight: 600;
            font-size: ${responsive.respWStr(32)};
            line-height: ${responsive.respWStr(45)};
            /* identical to box height */

            text-align: center;

            /* 浅橙主题色 */

            color: #ddd9d7;
          `}
        >
          {" "}
          使用等效VC铸造对应的SBT
        </Text>
      )}
      {claimed && (
        <HStack>
          <BsCheckCircle color="#EE862B" size={responsive.respWStr(48)} />
          <Text
            css={css`
              font-family: "PingFang SC";
              font-style: normal;
              font-weight: 600;
              font-size: ${responsive.respWStr(32)};
              line-height: ${responsive.respWStr(45)};
              /* identical to box height */

              text-align: center;

              /* 浅橙主题色 */

              color: #ddd9d7;
            `}
          >
            {" "}
            {`你已申领 E 群誌 SBT Lv${levelIndex + 1}`}
          </Text>
        </HStack>
      )}
      <Flex
        w="100%"
        h={responsive.respHStr(570)}
        align="center"
        justify="center"
        position="relative"
        // bgColor="gray.100"
      >
        <DndProvider backend={HTML5Backend}>
          {/*  */}
          <VCToDragView dropped={dropped} levelIndex={levelIndex} />
          <Box w="3vw" />
          <DragIndicator hidden={claimed || dropped} />

          <Box w="3vw" />

          <VCDropAreaView
            levelIndex={levelIndex}
            claimed={claimed}
            setDropped={setDropped}
            dropped={dropped}
            onCancel={onCancel}
            onProcess={onProcess}
            onSuccess={onSuccess}
            reset={reset}
            artwork={artwork}
            hintStatus={hintStatus}
          />
          {/*  */}
        </DndProvider>
        {/*  */}
      </Flex>
      {/* {hintStatus === "fail" && <ClaimHint.Fail />}
      {hintStatus === "process" && <ClaimHint.Processing />}
      {hintStatus === "success" && <ClaimHint.Success />}
      {hintStatus !== "success" && claimed && (
        <ClaimHint.Success text="已申领" />
      )} */}
    </>
  );
};
