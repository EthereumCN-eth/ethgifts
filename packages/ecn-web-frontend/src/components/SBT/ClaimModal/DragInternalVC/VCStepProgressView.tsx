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

import { calcLen } from "../hooks/calcLen";
import { useDropToClaim } from "../hooks/useDropToClaim";
import { responsive } from "../utils";

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
        <Text fontSize={`${calcLen(responsive.respW(16))}px`}>{text} </Text>
        {statusIcon === "error" && (
          <AiFillExclamationCircle
            color="red"
            size={`${calcLen(responsive.respW(20))}px`}
          />
        )}
        {statusIcon === "success" && (
          <AiFillCheckCircle
            color="green"
            size={`${calcLen(responsive.respW(20))}px`}
          />
        )}
        {statusIcon === "idle" && (
          <AiFillPauseCircle
            color="black"
            size={`${calcLen(responsive.respW(20))}px`}
          />
        )}

        {statusIcon === "loading" && (
          <ProcessingSpinner size={`${calcLen(responsive.respW(20))}px`} />
        )}
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
  const claimed = useInternalDragState((state) =>
    state.computed.selectedClaimed(state)
  );

  const { isSignRightStatus, isTxStatus, isVCRightStatus, isWriteStatus } =
    useDropToClaim({ index });
  return (
    <VStack
      opacity={dropped && !claimed ? 1 : 0}
      animation={dropped ? `1s ease-in  ${fadein}` : ""}
      // transition="all 1.8s cubic-bezier(0.77, 0, 0.175, 1)"
      position="absolute"
      top="50%"
      left="50%"
      bgColor="#FAFAFA"
      borderRadius={responsive.respWStr(16)}
      w={`${calcLen(responsive.respW(424))}px`}
      minH={`${calcLen(responsive.respW(333))}px`}
      p={`${calcLen(responsive.respW(20))}px`}
      zIndex={20}
      transform="translate(-50%, -50%)"
    >
      <Center flex={15} minH="20%">
        <Text
          color="black"
          fontWeight={500}
          fontSize={`${calcLen(responsive.respW(20))}px`}
        >{`Claiming SBT ${selectedIndex + 1} `}</Text>
      </Center>
      <VStack w="full" flex={85} justify="center">
        <StepLine text="Verifying VC Signature" statusIcon={isVCRightStatus} />
        <StepLine
          text="Verifying Contract Signature"
          statusIcon={isSignRightStatus}
        />
        <StepLine text="await wallet Confirmation" statusIcon={isWriteStatus} />
        <StepLine text="Claim Status" statusIcon={isTxStatus} />
      </VStack>
      {/*  */}
    </VStack>
  );
};
