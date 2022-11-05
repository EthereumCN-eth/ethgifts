import {
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  IconButton,
  Image,
  Text,
} from "@chakra-ui/react";
import { darken } from "polished";
import { AiFillHome } from "react-icons/ai";
import { FaDiscord, FaTwitter } from "react-icons/fa";

export const Footer = () => {
  return (
    <Center
      w="full"
      // minH="729px"
      background="rgba(12, 6, 1, 0.82)"
      pt="160px"
      pb="107px"
    >
      <Flex
        direction="column"
        // minH="729px"
        w="80vw"
        maxW="857px"
        // px={"27%"}
        // bg="grey"
        // bgColor="background: rgba(12, 6, 1, 0.8)"
        align="center"
      >
        <Heading color="#EE862B" mb="56px" fontWeight={400} fontSize="2.75rem">
          ETH Gifts
        </Heading>
        <Text
          fontFamily="PingFang SC"
          fontSize="sm"
          lineHeight={2}
          fontWeight={500}
          color="#DDD9D7"
          maxW="690px"
        >
          EthGifts 是 ECN 在举办社区活动或组织社区协作时发放的 Web3
          数字凭证，这些 Web3 数字凭证的类型包括 NFT、SBT、POAP
          和可验证凭证。EthGifts.com
          是上述数字凭证进行认证、申领和铸造的平台。社区成员可以在上面查看、追踪他们的参与情况、铸造
          NFT 和下载 VC。同时，EthGifts.com 还是展示 ECN
          社区活动的平台，大家可以通过网站陈列的每个 NFT
          了解相对应活动的详情，以及活动的最新动态。
        </Text>
        <Text
          mt="56px"
          mb="12px"
          fontSize="xs"
          fontWeight="400"
          fontFamily="PingFang SC"
          color="#EE862B"
        >
          点击加入成为ECN社区成员！
        </Text>
        <Text mb="24px" fontSize="2.25rem">
          👇
        </Text>
        <Button
          color="#fff"
          _hover={{
            bg: darken(0.1, "#EE862B"),
          }}
          _active={{
            bg: darken(0.2, "#EE862B"),
          }}
          variant="outline"
          fontSize="sm"
          py="10px"
          px="39px"
          h="auto"
          w="auto"
          borderRadius="8px"
          border="none"
          bgColor="#EE862B"
          width="210px"
        >
          加入 ECN’s Discord!
        </Button>
        <HStack
          mt="61px"
          mb="21px"
          w="188px"
          align="center"
          justify="space-between"
        >
          <IconButton
            variant="unstyled"
            aria-label="home"
            icon={<AiFillHome size="25px" color="#F4F4F4" />}
          />
          <IconButton
            variant="unstyled"
            aria-label="home"
            icon={<FaTwitter size="25px" color="#F4F4F4" />}
          />{" "}
          <IconButton
            variant="unstyled"
            aria-label="home"
            icon={<FaDiscord size="25px" color="#F4F4F4" />}
          />{" "}
          <IconButton
            variant="unstyled"
            aria-label="home"
            icon={
              <Image
                alt="mirror"
                src="/mirror.png"
                boxSize="25px"
                fit="contain"
              />
            }
          />
        </HStack>
        <Text color="#F4F4F4" fontSize="1rem">
          Made with ❤️ by ECN team.
        </Text>
      </Flex>
    </Center>
  );
};
