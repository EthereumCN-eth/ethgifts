import { HStack, VStack, Text } from "@chakra-ui/react";

import { useAppSelector } from "@/state/reduxHooks";
import { selectors as sbtSelectors } from "@/state/sbt";

const chainIdToName = (id: number) => {
  return {
    1: "mainnet",
    10: "optimism",
    5: "goerli",
    42161: "arbitrum",
  }[id];
};
const shortenName = (address: string) =>
  address && [address.slice(0, 4), address.slice(38)].join("...");

export const ContractDetail = () => {
  const { loaded, contractAddress, chainId, issuerAddress } = useAppSelector(
    sbtSelectors.selectAll
  );
  const issuerAddText = loaded ? shortenName(issuerAddress) : "--";
  const contractAddText = loaded ? shortenName(contractAddress) : "--";
  const chainName = loaded ? chainIdToName(chainId) : "--";

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
          rightText: contractAddText,
        },
        {
          leftText: "Blockchain",
          rightText: chainName,
        },
        {
          leftText: "Issuer address",
          rightText: issuerAddText,
        },
      ].map((item) => {
        return (
          <HStack
            key={item.leftText}
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
