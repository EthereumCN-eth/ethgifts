import type { StackProps } from "@chakra-ui/react";
import { HStack, Text, Box } from "@chakra-ui/react";
import { AiFillFile } from "react-icons/ai";

export const JSONBottomLabel = ({
  hasVcJson,
  stackProps,
}: {
  hasVcJson: boolean;
  stackProps?: StackProps;
}) => {
  return (
    <>
      <Box h="10px" />
      <HStack
        justify="center"
        position="absolute"
        bottom="0"
        // mt="5px"
        h="25px"
        width="full"
        bgColor={hasVcJson ? "#EE862B" : "#757575"} // borderBottomRadius="16px"
        {...stackProps}
      >
        <AiFillFile size="12px" color="#fff" />
        <Text fontSize="sm" color="#fff" fontWeight={500}>
          JSON
        </Text>
      </HStack>
    </>
  );
};
