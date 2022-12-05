import { Center, keyframes, Text, VStack } from "@chakra-ui/react";

import { StepLine } from "../DragInternalVC/StepLine";
import { calcLen } from "../hooks/calcLen";
import { responsive } from "../utils";

import { useExternalDragState } from "./externalDragState";

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
export const VCExternalStepProgressView = ({
  isClaiming,
  claimed,
}: {
  isClaiming: boolean;
  claimed: boolean;
}) => {
  const { isSignRightStatus, isTxStatus, isVCRightStatus, isWriteStatus } =
    useExternalDragState((state) => state.claimingStatus);
  return (
    <VStack
      opacity={isClaiming && !claimed ? 1 : 0}
      animation={isClaiming ? `1s ease-in  ${fadein}` : ""}
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
        >
          Claiming SBT
        </Text>
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
