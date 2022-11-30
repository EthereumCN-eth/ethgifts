import { Divider, HStack, keyframes, Text, VStack } from "@chakra-ui/react";
import {
  AiFillCheckCircle,
  AiFillExclamationCircle,
  AiFillPauseCircle,
} from "react-icons/ai";

import { responsive } from "../utils";

import { useInternalDragState } from "./internalDragState";
import { ProcessingSpinner } from "./ProcessingSpinner";

const StepLine = ({
  statusIcon,
  text,
}: {
  statusIcon: "fail" | "success" | "loading" | "await";
  text: string;
}) => {
  return (
    <VStack w="80%">
      <HStack w="full" justify="space-between">
        <Text fontSize={responsive.respWStr(16)}>{text} </Text>
        {statusIcon === "fail" && (
          <AiFillExclamationCircle color="red" size={responsive.respWStr(20)} />
        )}
        {statusIcon === "success" && (
          <AiFillCheckCircle color="green" size={responsive.respWStr(20)} />
        )}
        {statusIcon === "await" && (
          <AiFillPauseCircle color="black" size={responsive.respWStr(20)} />
        )}

        {statusIcon === "loading" && <ProcessingSpinner />}
      </HStack>
      <Divider />
    </VStack>
  );
};

const fadein = keyframes`
  0% {
    opacity: 0;
  }
  /* 50% {
    opacity: 0;
  } */
  100% {
    opacity: 1;
  }
`;
export const VCStepProgressView = () => {
  const selectedIndex = useInternalDragState((state) => state.selectedIndex);
  const dropped = useInternalDragState((state) =>
    state.computed.selectedDropped(state)
  );
  return (
    <VStack
      // opacity={dropped ? 1 : 0}
      animation={dropped ? `1s ease-in  ${fadein}` : ""}
      // transition="all 1.8s cubic-bezier(0.77, 0, 0.175, 1)"
      position="absolute"
      top="50%"
      left="50%"
      bgColor="#FAFAFA"
      borderRadius={responsive.respW(16)}
      w={responsive.respW(424)}
      h={responsive.respW(333)}
      p={responsive.respW(20)}
      zIndex={20}
      transform="translate(-50%, -50%)"
    >
      <Text
        color="black"
        fontWeight={500}
        fontSize={responsive.respWStr(20)}
      >{`Claiming SBT ${selectedIndex + 1} `}</Text>

      <VStack w="full" flex={1} justify="center">
        <StepLine text="Verifying VC Signature" statusIcon="loading" />
        <StepLine text="Verifying Contract Signature" statusIcon="await" />
        <StepLine text="Await wallet Confirmation" statusIcon="success" />
        <StepLine text="Claim Status" statusIcon="fail" />
      </VStack>
      {/*  */}
    </VStack>
  );
};
