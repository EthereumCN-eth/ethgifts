import { HStack, VStack, Text, Box } from "@chakra-ui/react";
import { AiFillFile } from "react-icons/ai";

export const VCCard = () => {
  return (
    <VStack
      minH="197px"
      w="full"
      bgColor="#DDD9D7"
      borderRadius="8px"
      p="20px"
      position="relative"
      zIndex={1}
      overflow="hidden"
    >
      {[
        {
          leftText: "Type",
          rightText: "--",
        },
        {
          leftText: "Credential Subject ID",
          rightText: "--",
        },
        {
          leftText: "Express Count",
          rightText: "--",
        },
        {
          leftText: "Matadata URI",
          rightText: "--",
        },
        {
          leftText: "Issuer ID",
          rightText: "--",
        },
        {
          leftText: "Issuance Date",
          rightText: "--",
        },
      ].map((item) => {
        return (
          <HStack
            key={item.leftText}
            fontWeight={500}
            letterSpacing="0.06em"
            fontFamily="PingFang SC"
            fontSize="sm"
            w="full"
            justify="space-between"
          >
            <Text color="#8E8D8C">{item.leftText}</Text>
            <Text color="#000000">{item.rightText}</Text>
          </HStack>
        );
      })}
      <Box marginTop="30px" />
      <HStack
        justify="center"
        position="absolute"
        bottom="0"
        h="25px"
        width="full"
        bgColor="#757575" // borderBottomRadius="16px"
      >
        <AiFillFile size="12px" color="#fff" />
        <Text fontSize="sm" color="#fff" fontWeight={500}>
          JSON
        </Text>
      </HStack>
    </VStack>
  );
};
