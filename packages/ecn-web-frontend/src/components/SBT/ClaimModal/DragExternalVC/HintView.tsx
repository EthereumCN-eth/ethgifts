import { HStack, Text } from "@chakra-ui/react";
import { AiFillCheckCircle, AiFillExclamationCircle } from "react-icons/ai";

import { ProcessingSpinner } from "../DragInternalVC/ProcessingSpinner";
import { calcLen } from "../hooks/calcLen";
import { responsive } from "../utils";

export const HintView = ({
  isError,
  isLoading,
  isSuccess,
}: {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
}) => {
  return (
    <>
      {isLoading && (
        <HStack>
          <ProcessingSpinner size={responsive.respWStr(14)} color="white" />
          <Text
            textAlign="center"
            color="white"
            fontSize={`${calcLen(responsive.respW(14))}px`}
          >
            VC 文件加载中
          </Text>
        </HStack>
      )}

      {isError && (
        <HStack>
          <AiFillExclamationCircle size={responsive.respWStr(14)} color="red" />
          <Text
            textAlign="center"
            color="white"
            fontSize={`${calcLen(responsive.respW(14))}px`}
          >
            VC 文件载入错误
          </Text>
        </HStack>
      )}
      {isSuccess && (
        <HStack>
          <AiFillCheckCircle size={responsive.respWStr(14)} color="green" />
          <Text
            textAlign="center"
            color="white"
            fontSize={`${calcLen(responsive.respW(14))}px`}
          >
            VC 文件加载成功
          </Text>
        </HStack>
      )}
    </>
  );
};
