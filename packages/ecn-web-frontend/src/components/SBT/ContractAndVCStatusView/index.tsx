import { Flex, Text, Image, Center } from "@chakra-ui/react";

import { ContractDetail } from "./ContractDetail";
import { VCDetail } from "./VCDetail";

export const ContractAndVCStatusView = () => {
  return (
    <Flex
      align="center"
      direction="column"
      w="44%"
      minH="600px"
      p="6%"
      bg="#DDD9D7"
      fontFamily="PingFang SC"
    >
      <ContractDetail />

      <Image alt="vc_icon" w="56px" h="56px" src="/vcicon.svg" />
      <Center
        mt="14.9px"
        mb="12px"
        minH="100px"
        w="full"
        bg="#FAFAFA"
        borderRadius="16px"
        boxShadow="2px 2px 4px rgba(0, 0, 0, 0.25)"
        p="20px"
      >
        <Text
          letterSpacing="0.01em"
          color="#000000"
          fontSize="sm"
          fontWeight={500}
          lineHeight="180%"
          textAlign="center"
        >
          实时更新，随时可下载的E群誌贡献Verifiable Credential掌握数据实权，
          在更广阔的Web2、Web3世界展现自我
        </Text>
      </Center>

      <VCDetail />
    </Flex>
  );
};
