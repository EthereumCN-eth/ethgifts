import { Divider, HStack, Text, VStack } from "@chakra-ui/react";
import {
  AiFillCheckCircle,
  AiFillExclamationCircle,
  AiFillQuestionCircle,
} from "react-icons/ai";

import { responsive } from "../utils";
import MotionBox from "@/components/motion/Box";

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
          <AiFillQuestionCircle color="black" size={responsive.respWStr(20)} />
        )}

        {statusIcon === "loading" && <ProcessingSpinner />}
      </HStack>
      <Divider />
    </VStack>
  );
};
export const VCStepProgressView = () => {
  const selectedIndex = useInternalDragState((state) => state.selectedIndex);
  return (
    <MotionBox
      // visibility={hidden ? "hidden" : "visible"}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 1,
      }}
    >
      <VStack
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
    </MotionBox>
  );
};
