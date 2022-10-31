import { VStack, Text, Button } from "@chakra-ui/react";

import { VCCard } from "./VCCard";

export const VCDetail = () => {
  return (
    <VStack
      mt="12px"
      mb="12px"
      minH="369px"
      w="full"
      bg="#FAFAFA"
      borderRadius="16px"
      boxShadow="2px 2px 4px rgba(0, 0, 0, 0.25)"
      px="40px"
      py="30px"
    >
      <Text color="#000" fontWeight={600} fontSize="lg" mb="22px">
        我们没有你的VC数据
      </Text>
      <VCCard />

      <Button
        w="100%"
        fontSize="sm"
        fontWeight={500}
        mt="12px"
        variant="blcakOutline"
      >
        加入Discord做贡献
      </Button>
    </VStack>
  );
};
