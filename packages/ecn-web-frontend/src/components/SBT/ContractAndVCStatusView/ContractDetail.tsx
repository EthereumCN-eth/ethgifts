import { HStack, VStack, Text } from "@chakra-ui/react";

export const ContractDetail = () => {
  return (
    <VStack
      minH="176px"
      w="full"
      bg="#FAFAFA"
      borderRadius="16px"
      boxShadow="2px 2px 4px rgba(0, 0, 0, 0.25)"
      p="20px"
      mb="66px"
    >
      <HStack
        fontWeight={500}
        letterSpacing="0.01em"
        fontFamily="PingFang SC"
        fontSize="sm"
        w="full"
        justify="space-between"
      >
        <Text color="#000000">ExpressCount</Text>
        <Text>--</Text>
      </HStack>
      <Text fontSize="xl" fontWeight={600}>
        Contract Details
      </Text>
      {[
        {
          leftText: "Contract Address",
          rightText: "0x98dfsfjofjosdhg",
        },
        {
          leftText: "Blockchain",
          rightText: "Optimism",
        },
        {
          leftText: "Issuer address",
          rightText: "dd",
        },
      ].map((item) => {
        return (
          <HStack
            fontWeight={500}
            letterSpacing="0.01em"
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
    </VStack>
  );
};
