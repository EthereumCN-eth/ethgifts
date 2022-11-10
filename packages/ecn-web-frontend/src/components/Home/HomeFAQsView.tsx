import { Flex, Heading, Accordion, Text } from "@chakra-ui/react";

import { ChakraNextLink } from "../ChakraNextLink";
import { FAQItem } from "../shared/FAQItem";

const fAQData = [
  {
    question: "什么是 web3 数字凭证？EthGifts 使用了哪些 web3 数字凭证？？",
    answer: (
      <Text textAlign="start" as="span">
        {`凭证 (credential)
        是对一个人拥有特定属性、资格、能力或权利要求的验证。凭证在每个人的社会生活中发挥着举足轻重的作用，我们使用凭证来证明自己的身份、获得权限、展示声誉和社会地位等。Web3
        以区块链技术为基础，出现了区别于 Web2
        时代的凭证范式——使用密码学签名、携带任意信息的防篡改数据对象、每个实例都是唯一的、围绕数据对象本身的来源提供保证、由受信任的机构发行或铸造、但不为任何中心化机构或平台所有。`}
        <Text>
          EthGifts 使用的 web3 数字凭证类型包括 NFT、SBT、POAP 和 Verifiable{" "}
          <ChakraNextLink
            target="_blank"
            textDecoration="underline"
            href="https://docs.ethgifts.com/faq#1.-shen-me-shi-web3-shu-zi-ping-zheng-ethgifts-shi-yong-le-na-xie-web3-shu-zi-ping-zheng"
          >
            更多↗
          </ChakraNextLink>
        </Text>
      </Text>
    ),
  },

  {
    question: "什么是SBT (Soul Bound Token)？",
    answer: (
      <Text textAlign="start" as="span">
        {`灵魂绑定通证 (Soulbound Token, SBT)
        是使用区块链技术代表一个人身份的不可转让的
        NFT。(NFT，即非同质化代币，是唯一的数字标识符，它不能被复制、替代或细分，记录在区块链上，用于证明真实性和所有权)
        它可以代表一个人的工作记录、教育资格、证书、成员身份、活动参与、艺术品的哈希值等，旨在呈现人在区块链上丰富的社会属性，激活区块链上
        DeFi 以外的创新，并解决女巫攻击等问题。它们绑定在被称为“灵魂 (soul)
        ”的区块链账户或钱包里。`}
        <br />
        {`在具体实现上，目前还没有社区广泛认可的规范，在
        EthGifts 上发行的 SBT
        具有三个基本特性：不可转发、所有数据公开可查和通过签名验证铸造。`}
        <ChakraNextLink
          target="_blank"
          textDecoration="underline"
          href="https://docs.ethgifts.com/faq#2.-shen-me-shi-sbt"
        >
          更多↗
        </ChakraNextLink>
      </Text>
    ),
  },
  {
    question: "什么是Verifiable Credential？",
    answer: (
      <Text textAlign="start" as="span">
        {`Verifiable Credential (可验证凭证，简称 VC)，是防篡改的 W3C
        标准凭证，可以通过密码学验证来实现自我主权身份，保护个人数据。它们可以代表任何物理世界对应的凭证，还可以代表物理世界以外的新型凭证。VC
        的文档格式通常为JSON，是具有语义和结构化的数据模型，其将凭证持有人置于身份生态系统的中心，让个人控制其身份属性。VC
        区别于 NFT 和 SBT 的一个重要特点是，VC
        默认情况下是存储在链下的，这就允许用户根据需要有选择地只与互联网上的相关方分享凭证数据，赋予了用户对个人数据的自主权和隐私权。`}
        <br />
        {`EthGifts
        发行的 VC
        都基于以太坊，即使用以太坊区块链这一分布式账本作为去中心化数据登记中心，任何人都可以对
        VC 上的密码学签名进行验证。`}
        <ChakraNextLink
          target="_blank"
          textDecoration="underline"
          href="https://docs.ethgifts.com/faq#3.-shen-me-shi-verifiable-credential"
        >
          更多↗
        </ChakraNextLink>
      </Text>
    ),
  },
  {
    question: "如何实现 SBT 与 VC 一一对应？",
    answer: (
      <Text textAlign="start" display="inline-block">
        {`为了满足社区成员对其数字凭证的不同需求 (隐私、是否支付
        gas、是否跨平台使用等)，ECN
        希望设计出链上链下具有等效性的数字凭证提供给用户。`}
        <br />
        {`由于 VC
        的标识符兼容以太坊账户，即以太坊的公钥
        (公钥密码学在区块链网络中被用来验证用户身份和证明数字资产的所有权)，也就是说，VC
        的签名验证可以在以太坊上进行。`}
        <br />
        {`ECN
        团队构思出链下签名、链上验证的发行方法，实现 SBT 与 VC 的一一对应。`}
        <ChakraNextLink
          display="inline"
          target="_blank"
          textDecoration="underline"
          href="https://docs.ethgifts.com/faq#4.-ru-he-shi-xian-sbt-yu-vc-yi-yi-dui-ying"
        >
          更多↗
        </ChakraNextLink>
      </Text>
    ),
  },
];

export const HomeFAQsView = () => {
  return (
    <Flex
      direction="column"
      mt="11.5rem"
      mb="-300px"
      // bg="#0C0601"

      color="#FFFFFF"
      // minH={"500px"}
      w="full"
      align="center"
      // bgColor="green"
    >
      <Heading
        color="#010215"
        fontFamily="PingFang SC"
        fontWeight={600}
        fontSize="2.75rem"
        mb="2.75rem"
      >
        FAQs
      </Heading>

      <Accordion
        color="#000000"
        width="47%"
        // minW={}
        defaultIndex={[]}
        allowMultiple
        mb={3}
        borderColor="transparent"
      >
        {fAQData.map((faqItem) => {
          return <FAQItem key={faqItem.question} {...faqItem} />;
        })}
      </Accordion>
    </Flex>
  );
};
