import "@rainbow-me/rainbowkit/styles.css";
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
import { css } from "@emotion/react";
import type { NextPage } from "next";
import { useEffect } from "react";
import { AiFillHome } from "react-icons/ai";
import { FaDiscord, FaTwitter } from "react-icons/fa";

import {
  selectors as gallerySelectors,
  sagaActions as gallerySagaActions,
} from "@/state/gallery";
import { useAppDispatch, useAppSelector } from "@/state/reduxHooks";

import { HomeFAQsView } from "./HomeFAQsView";
import { HomeGalleryView } from "./HomeGalleryView";
import { HomeScrollFixedView } from "./HomeScrollFixedView";

// translateY(calc(${15}vh + ${scrollY}px))

export const Home: NextPage = () => {
  // const containerRef = useRef(null);
  const items = useAppSelector(gallerySelectors.selectGalleryItems);
  const appDispatch = useAppDispatch();

  useEffect(() => {
    appDispatch(gallerySagaActions.fetchGalleryItems());
  }, [appDispatch]);

  return (
    <div
      css={css`
        width: 100%;
        min-height: 300vh;
        position: relative;
        /* background-color: "white"; */
      `}
    >
      <HomeScrollFixedView />

      <HomeGalleryView items={items} />
      <HomeFAQsView />
      <Center w="full" minH="729px" bg="black" pt="166px" pb="107px">
        <Flex
          direction="column"
          minH="729px"
          w="80vw"
          maxW="857px"
          // px={"27%"}
          // bg="grey"
          align="center"
        >
          <Heading color="#fff" mb="53px" fontWeight={400} fontSize="4rem">
            ETH Gifts
          </Heading>
          <Text
            fontFamily="PingFang SC"
            fontSize="1.25rem"
            lineHeight={2}
            color="#B5B5B5"
          >
            Ethgift 是展示、认证和申领 ECN 社区成员的参与和贡献的XXX。过去，ECN
            曾举办过不少线下 meetup 和线上 AMA 活动，都有给积极参与者发放过 NFT
            和 POAP，如今上线 ECN 的首款 SBT (Soul Bound
            Token)，其不可转让性、XXX等将与社区贡献凭证的特性更加契合。随着社区活动的日渐丰富，ECN
            将推出更多有利于社区建设的
            SBT，让每个成员的不同类型参与和贡献都能得到恰当的认可和展示。
          </Text>
          <Text
            mt="50px"
            mb="12px"
            fontSize="sm"
            fontWeight="300"
            fontFamily="PingFang SC"
            color="#FFFFFF"
          >
            点击加入成为ECN社区成员！
          </Text>
          <Text mb="55px" fontSize="2.25rem">
            👇
          </Text>
          <Button
            color="#fff"
            _hover={{
              color: "#000",
              bg: "#F2F2F2",
            }}
            _active={{
              color: "#000",
              bg: "gray.300",
            }}
            variant="outline"
            fontSize="2rem"
            py="14.5px"
            px="36px"
            h="auto"
            w="auto"
          >
            加入 ECN’s Discord!
          </Button>
          <HStack my="54px" gap="20px">
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
    </div>
  );
};
