import { css } from "@emotion/react";
import type { NextPage } from "next";


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
import { HomeScrollFixedView } from "./HomeScrollFixedView";
import { HomeGalleryView } from "./HomeGalleryView";
import { Accordion } from "@chakra-ui/react";
import { FAQItem } from "./FAQItem";
import { FaDiscord, FaTwitter } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";

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
    btnTxt: "查看SBT及相关活动",
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
    btnTxt: "查看SBT及相关活动",
  },
  {
    tags: [
      { label: "SBT", variant: "whiteText" },
      { label: "Ongoing", variant: "whiteBg" },
    ],
    imgSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbeAP4FQZQG70tz-sOuJLlv7A75OvNkjPKEQ&usqp=CAU",
    imgAlt: "toy",
    title: "E群志初级SBT",
    desc: "2022年9月",
    btnTxt: "查看SBT及相关活动",
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
    btnTxt: "查看SBT及相关活动",
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
    btnTxt: "查看SBT及相关活动",
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
    btnTxt: "查看SBT及相关活动",
  },
];

export const Home: NextPage = () => {
  // const containerRef = useRef(null);

  return (
    <div
      css={(theme) => css`
        width: 100%;
        min-height: 300vh;
        position: relative;
        /* background-color: "white"; */
      `}
    >
      <HomeScrollFixedView />

      <HomeGalleryView />
      <HomeFAQsView />
      <Center w="full" minH="729px" bg="black" pt="166px" pb="107px">
        <Flex
          direction={"column"}
          minH="729px"
          w={"80vw"}
          maxW="857px"
          // px={"27%"}
          // bg="grey"
          align={"center"}
        >
          <Heading color="#fff" mb="53px" fontWeight={400} fontSize={"4rem"}>
            ETH Gifts
          </Heading>
          <Text
            fontFamily={"PingFang SC"}
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
            fontSize={"sm"}
            fontWeight="300"
            fontFamily={"PingFang SC"}
            color="#FFFFFF"
          >
            点击加入成为ECN社区成员！
          </Text>
          <Text mb="55px" fontSize={"2.25rem"}>
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
            variant={"outline"}
            fontSize="2rem"
            py={"14.5px"}
            px="36px"
            h="auto"
            w="auto"
          >{`加入 ECN’s Discord!`}</Button>
          <HStack my="54px" gap={"20px"}>
            <IconButton
              variant={"unstyled"}
              aria-label="home"
              icon={<AiFillHome size={"25px"} color="#F4F4F4" />}
            />
            <IconButton
              variant={"unstyled"}
              aria-label="home"
              icon={<FaTwitter size={"25px"} color="#F4F4F4" />}
            />{" "}
            <IconButton
              variant={"unstyled"}
              aria-label="home"
              icon={<FaDiscord size={"25px"} color="#F4F4F4" />}
            />{" "}
            <IconButton
              variant={"unstyled"}
              aria-label="home"
              icon={<Image alt="mirror" src="/mirror.png" boxSize={"25px"} fit="contain" />}
            />
          </HStack>
          <Text color="#F4F4F4" fontSize={"1rem"}>
            Made with ❤️ by ECN team.
          </Text>
        </Flex>
      </Center>
    </div>
  );
};

const HomeFAQsView = () => {
  return (
    <Flex
      direction={"column"}
      mt={"7.5rem"}
      mb={"22rem"}
      // bg="#0C0601"
      color="#FFFFFF"
      // minH={"500px"}
      w={"full"}
      align="center"
    >
      <Heading color="#000000" py={"120px"} fontWeight={400} fontSize={"4rem"}>
        FAQs
      </Heading>

      <Accordion
        color="#000000"
        width={"80%"}
        defaultIndex={[0]}
        allowMultiple
        mb={4}
        borderColor="transparent"
      >
        {fAQData.map((faqItem) => {
          return <FAQItem key={faqItem.question} {...faqItem} />;
        })}
      </Accordion>
    </Flex>
  );
};

const fAQData = [
  {
    question: "EthGift的web3数字凭证都有什么形式？",
    answer: `EthGift过去主要发放POAP和NFT作为参与凭证，现在则主要是以推广SBT (Soul
          Bound Token) 和VC (Verifiable Credential)为主，结合blablabla`,
  },
  {
    question: "SBT (Soul Bound Token)是什么？",
    answer: `SBT (Soul Bound Token) 是公开可见、不可转移，且可能可由发行方撤回的NFT。`,
  },
  {
    question: "Verifiable Credential是什么？",
    answer: `一个Verifiable Credential是一组防篡改的声明和元数据，它们通过加密的方法证明是谁发行的。EthGift使用以太坊作为可验证的数据登记。`,
  },
];
