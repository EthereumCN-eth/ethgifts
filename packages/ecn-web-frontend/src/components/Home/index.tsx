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
import { darken } from "polished";
import { useEffect } from "react";
import { AiFillHome } from "react-icons/ai";
import { FaDiscord, FaTwitter } from "react-icons/fa";
import { useAccount } from "wagmi";

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
  const { address } = useAccount();
  const items = useAppSelector(gallerySelectors.selectGalleryItems);
  const shellNumber = useAppSelector(gallerySelectors.selectShellItemNumber);
  const loading = useAppSelector(gallerySelectors.selectLoading);
  const appDispatch = useAppDispatch();

  useEffect(() => {
    appDispatch(gallerySagaActions.fetchGalleryItems({ address }));
  }, [address, appDispatch]);

  return (
    <div
      css={css`
        width: 100%;
        min-height: 250vh;
        position: relative;
        /* background-color: "white"; */
      `}
    >
      <HomeScrollFixedView />

      <HomeGalleryView
        items={items}
        shellNumber={shellNumber}
        loading={loading}
      />
      <HomeFAQsView />
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
          <Heading
            color="#EE862B"
            mb="56px"
            fontWeight={400}
            fontSize="2.75rem"
          >
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
            Ethgift 是展示、认证和申领 ECN 社区成员的参与和贡献的XXX。过去，ECN
            曾举办过不少线下 meetup 和线上 AMA 活动，都有给积极参与者发放过 NFT
            和 POAP，如今上线 ECN 的首款 SBT (Soul Bound
            Token)，其不可转让性、XXX等将与社区贡献凭证的特性更加契合。随着社区活动的日渐丰富，ECN
            将推出更多有利于社区建设的
            SBT，让每个成员的不同类型参与和贡献都能得到恰当的认可和展示。
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
    </div>
  );
};
