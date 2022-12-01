import {
  Center,
  Divider,
  HStack,
  keyframes,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  AiFillCheckCircle,
  AiFillExclamationCircle,
  AiFillPauseCircle,
} from "react-icons/ai";

import { responsive } from "../utils";

import { useDropToClaim } from "./hooks/useDropToClaim";
import { useInternalDragState } from "./internalDragState";
import { ProcessingSpinner } from "./ProcessingSpinner";

const StepLine = ({
  statusIcon,
  text,
}: {
  statusIcon: "error" | "success" | "loading" | "idle";
  text: string;
}) => {
  return (
    <VStack w="80%">
      <HStack w="full" justify="space-between">
        <Text fontSize={responsive.respWStr(16)}>{text} </Text>
        {statusIcon === "error" && (
          <AiFillExclamationCircle color="red" size={responsive.respWStr(20)} />
        )}
        {statusIcon === "success" && (
          <AiFillCheckCircle color="green" size={responsive.respWStr(20)} />
        )}
        {statusIcon === "idle" && (
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
export const VCStepProgressView = ({ index }: { index: number }) => {
  const selectedIndex = useInternalDragState((state) => state.selectedIndex);
  const dropped = useInternalDragState((state) =>
    state.computed.selectedDropped(state)
  );

  const { isSignRightStatus, isTxStatus, isVCRightStatus, isWriteStatus } =
    useDropToClaim({ index });
  return (
    <VStack
      opacity={dropped ? 1 : 0}
      animation={dropped ? `1s ease-in  ${fadein}` : ""}
      // transition="all 1.8s cubic-bezier(0.77, 0, 0.175, 1)"
      position="absolute"
      top="50%"
      left="50%"
      bgColor="#FAFAFA"
      borderRadius={responsive.respWStr(16)}
      w={responsive.respWStr(424)}
      h={responsive.respWStr(333)}
      p={responsive.respWStr(20)}
      zIndex={20}
      transform="translate(-50%, -50%)"
    >
      <Center flex={2} minH="20%">
        <Text
          color="black"
          fontWeight={500}
          fontSize={responsive.respWStr(20)}
        >{`Claiming SBT ${selectedIndex + 1} `}</Text>
      </Center>
      <VStack w="full" flex={8} justify="center">
        <StepLine text="Verifying VC Signature" statusIcon={isVCRightStatus} />
        <StepLine
          text="Verifying Contract Signature"
          statusIcon={isSignRightStatus}
        />
        <StepLine text="idle wallet Confirmation" statusIcon={isWriteStatus} />
        <StepLine text="Claim Status" statusIcon={isTxStatus} />
      </VStack>
      {/*  */}
    </VStack>
  );
};
