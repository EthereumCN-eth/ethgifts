import { Center, keyframes, Text, VStack } from "@chakra-ui/react";

// import { calcLen } from "../hooks/calcLen";
import { StepLine } from "@/components/SBT/ClaimModal/DragInternalVC/StepLine";
import { calcLen } from "@/components/SBT/ClaimModal/hooks/calcLen";
import { responsive } from "@/styles/utils";

import { resLen } from "./resLen";
import { useVCDropClaim } from "./useVCDropClaim";
// import { useDropToClaim } from "../hooks/useDropToClaim";

// import { useInternalDragState } from "./internalDragState";
// import { StepLine } from "./StepLine";

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
export const VCProgressView = ({
  dropped,
  claimed,
  vcStr,
  onCancel,
  onProcess,
  onSuccess,
  reset,
}: {
  dropped: boolean;
  claimed: boolean;
  vcStr: string | undefined;
  onCancel?: (() => void) | undefined;
  onProcess?: (() => void) | undefined;
  onSuccess?: (() => void) | undefined;
  reset?: (() => void) | undefined;
}) => {
  const { isSignRightStatus, isTxStatus, isVCRightStatus, isWriteStatus } =
    useVCDropClaim({ dropped, vcStr, onCancel, onProcess, reset, onSuccess });
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
      w={`${resLen(295)}px`}
      h={`${resLen(421)}px`}
      p={`${calcLen(responsive.respW(20))}px`}
      zIndex={20}
      transform="translate(-50%, -50%)"
    >
      <Center flex={15} minH="20%">
        <Text
          color="black"
          fontWeight={500}
          fontSize={`${calcLen(responsive.respW(20))}px`}
        >{`Claiming SBT `}</Text>
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
