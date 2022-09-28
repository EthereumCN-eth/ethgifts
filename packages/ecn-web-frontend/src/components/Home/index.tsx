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
import { AiFillHome } from "react-icons/ai";
import { FaDiscord, FaTwitter } from "react-icons/fa";

import { HomeFAQsView } from "./HomeFAQsView";
import { HomeGalleryView } from "./HomeGalleryView";
import { HomeScrollFixedView } from "./HomeScrollFixedView";

const BTNTXT = "查看SBT及相关活动";
// translateY(calc(${15}vh + ${scrollY}px))
export const dummyGalleryItems = [
  {
    tags: [
      { label: "SBT", variant: "whiteText" },
      { label: "Ongoing", variant: "whiteBg" },
    ],
    imgSrc:
      "https://scene7.zumiez.com/is/image/zumiez/product_main_medium/Toy-Machine-Monster-Sticker-_322489-front-US.jpg",
    imgAlt: "toy",
    title: "E群志初级SBT1",
    desc: "2022年9月",
    btnTxt: BTNTXT,
  },
  {
    tags: [
      { label: "SBT", variant: "whiteText" },
      { label: "Ongoing", variant: "whiteBg" },
    ],
    imgSrc:
      "https://media.titus.de/media/image/b3/fc/65/toy-machine-skateboard-decks-sect-eye-bloodshot-black-vorderansicht-0100322_600x600.jpg",
    imgAlt: "toy",
    title: "E群志初级SBT2",
    desc: "2022年9月",
    btnTxt: BTNTXT,
  },
  {
    tags: [
      { label: "SBT", variant: "whiteText" },
      { label: "Ongoing", variant: "whiteBg" },
    ],
    imgSrc:
      "https://i.etsystatic.com/10170765/r/il/eefcf6/1436657484/il_fullxfull.1436657484_ourm.jpg",
    imgAlt: "toy",
    title: "E群志初级SBT",
    desc: "2022年9月",
    btnTxt: BTNTXT,
  },
  {
    tags: [
      { label: "SBT", variant: "whiteText" },
      { label: "Ongoing", variant: "whiteBg" },
    ],
    imgSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbeAP4FQZQG70tz-sOuJLlv7A75OvNkjPKEQ&usqp=CAU",
    imgAlt: "toy",
    title: "E群志初级SBT3",
    desc: "2022年9月",
    btnTxt: BTNTXT,
  },
  {
    tags: [
      { label: "SBT", variant: "whiteText" },
      { label: "Ongoing", variant: "whiteBg" },
    ],
    imgSrc:
      "https://i.etsystatic.com/10170765/r/il/eefcf6/1436657484/il_fullxfull.1436657484_ourm.jpg",
    imgAlt: "toy",
    title: "E群志初级SBT4",
    desc: "2022年9月",
    btnTxt: BTNTXT,
  },
  {
    tags: [
      { label: "SBT", variant: "whiteText" },
      { label: "Ongoing", variant: "whiteBg" },
    ],
    imgSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbeAP4FQZQG70tz-sOuJLlv7A75OvNkjPKEQ&usqp=CAU",
    imgAlt: "toy",
    title: "E群志初级SBT6",
    desc: "2022年9月",
    btnTxt: BTNTXT,
  },
];

export const Home: NextPage = () => {
  // const containerRef = useRef(null);

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

      <HomeGalleryView items={dummyGalleryItems} />
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
