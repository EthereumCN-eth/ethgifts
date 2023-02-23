import { Divider, HStack, Text, VStack } from "@chakra-ui/react";
import {
  AiFillCheckCircle,
  AiFillExclamationCircle,
  AiFillPauseCircle,
} from "react-icons/ai";

import { responsive } from "../../../../styles/utils";
import { calcLen } from "../hooks/calcLen";

import { ProcessingSpinner } from "./ProcessingSpinner";

export const StepLine = ({
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
