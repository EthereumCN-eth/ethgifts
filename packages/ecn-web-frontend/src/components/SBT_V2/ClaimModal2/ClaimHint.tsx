import { HStack, Text } from "@chakra-ui/react";
import { css } from "@emotion/react";
import { AiFillCheckCircle, AiFillExclamationCircle } from "react-icons/ai";

import { ProcessingSpinner } from "@/components/SBT/ClaimModal/DragInternalVC/ProcessingSpinner";
import { responsive } from "@/styles/utils";

export const ClaimHint = {
  Processing: () => (
    <HStack w="fit-content" justify="center" direction="row-reverse">
      <Text
        css={css`
          font-size: ${responsive.respWStr(16)};
          color: black;
          font-weight: bold;
        `}
      >
        加载中
      </Text>
      {/* <Box w="3px" h="full" /> */}

      <ProcessingSpinner size={responsive.respWStr(18)} color="black" />
      {/* <Spinner ml="5px" size="sm" color="white" /> */}
    </HStack>
  ),
  Fail: () => (
    <HStack w="full" justify="center" direction="row-reverse">
      <Text
        css={css`
          font-size: ${responsive.respWStr(16)};
          color: black;
          font-weight: bold;
        `}
      >
        铸造失败
      </Text>
      {/* <Box w="3px" /> */}
      <AiFillExclamationCircle
        height={responsive.respWStr(18)}
        width={responsive.respWStr(18)}
        size={responsive.respWStr(18)}
        color="red"
      />
    </HStack>
  ),
  Success: ({ text = "铸造成功" }: { text?: string }) => {
    return (
      <HStack w="full" justify="center" direction="row-reverse">
        <Text
          css={css`
            font-size: ${responsive.respWStr(16)};
            color: black;
            font-weight: bold;
          `}
        >
          {text}
        </Text>
        {/* <Box w="3px" /> */}
        <AiFillCheckCircle
          height={responsive.respWStr(18)}
          width={responsive.respWStr(18)}
          size={responsive.respWStr(18)}
          color="green"
        />
      </HStack>
    );
  },
};
