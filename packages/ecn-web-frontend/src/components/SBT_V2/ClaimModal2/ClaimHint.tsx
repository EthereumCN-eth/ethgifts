import { Box, HStack, Text } from "@chakra-ui/react";
import { css } from "@emotion/react";
import { AiFillCheckCircle, AiFillExclamationCircle } from "react-icons/ai";

import { ProcessingSpinner } from "@/components/SBT/ClaimModal/DragInternalVC/ProcessingSpinner";
import { responsive } from "@/styles/utils";

export const ClaimHint = {
  Processing: () => (
    <HStack w="full" justify="center">
      <ProcessingSpinner size={responsive.respWStr(22)} color="white" />
      <Box w="7px" />
      <Text
        css={css`
          font-size: ${responsive.respWStr(16)};
          color: #ddd9d7;
        `}
      >
        加载中
      </Text>
      {/* <Spinner ml="5px" size="sm" color="white" /> */}
    </HStack>
  ),
  Fail: () => (
    <HStack>
      <AiFillExclamationCircle size={responsive.respWStr(22)} color="red" />
      <Box w="7px" />
      <Text
        css={css`
          font-size: ${responsive.respWStr(16)};
          color: #ddd9d7;
        `}
      >
        铸造失败
      </Text>
    </HStack>
  ),
  Success: () => {
    return (
      <HStack>
        <AiFillCheckCircle size={responsive.respWStr(22)} color="green" />
        <Box w="7px" />
        <Text
          css={css`
            font-size: ${responsive.respWStr(16)};
            color: #ddd9d7;
          `}
        >
          铸造成功
        </Text>
      </HStack>
    );
  },
};
