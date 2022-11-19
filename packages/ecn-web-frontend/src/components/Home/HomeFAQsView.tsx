import { Flex, Heading, Accordion, Text } from "@chakra-ui/react";

import { ChakraNextLink } from "../ChakraNextLink";
import { FAQItem } from "../shared/FAQItem";

const fAQData = [
  {
    question: "Ethgifts 使用了哪些 Web3 数字凭证？",
    answer: (
      <Text textAlign="start" as="span" sx={{}}>
        Web3 以区块链技术为基础，出现了区别于 Web2
        时代的凭证范式——使用密码学签名、携带任意信息的防篡改数据对象、每个实例都是唯一的、围绕数据对象本身的来源提供保证、由受信任的机构发行或铸造、但不为任何中心化机构或平台所有。
        <br />
        EthGifts 使用的 web3 数字凭证类型包括 NFT、SBT、POAP 和 Verifiable
        Credential (可验证数字凭证){" "}
      </Text>
    ),
  },

  {
    question: "不同类型的数字凭证有什么区别？",
    answer: (
      <Text textAlign="start" as="span" sx={{}}>
        在凭证的属性上，SBT 与 POAP 都属于
        NFT，三者都是链上公开可验证的数字凭证，区别在于 SBT 具有不可转让性，使得
        token 与账户实现绑定，凸显账户的社会属性；POAP 则必须经 POAP
        平台铸造，包含活动相关的图片、描述和时间。VC
        默认情况下存储在链下，不依赖于特定平台或区块链，当其 id 使用基于区块链的
        did 时，VC 的真实性也能实现在去信任的情况下得到验证。
        <br />
        EthGifts 结合社区参与和贡献的特点对这些 Web3
        数字凭证进行选择和使用。一般情况下，NFT 和 POAP 用于认证和纪念社区成员在
        ECN 所举办的活动的出席和参与情况；SBT 用于认证社区成员的贡献
        (目前包括资讯、翻译和原创文章）；而 VC 则作为链上凭证 SBT 或 NFT
        的补充，为成员提供具有隐私属性、无需消耗 gas 的链下凭证选项。
      </Text>
    ),
  },
  {
    question: "我要怎么获得这些数字凭证？",
    answer: (
      <Text textAlign="start" as="span" sx={{}}>
        在内容贡献方面的 SBT，ECN 长期欢迎志愿者的加入，资讯类的贡献请进入 ECN
        discord 的
        <ChakraNextLink
          display="inline"
          target="_blank"
          textDecoration="underline"
          href="https://discord.com/invite/eJJRBqKd3d"
        >
          #🔥｜e群誌-ejournal频道
        </ChakraNextLink>
        参与资讯分享；翻译和原创内容的投稿可通过各种社交媒体与 ECN 取得联系 (dm
        is open)。而在活动参与方面的 NFT 或 POAP，请关注 EthGifts 上的活动预告和
        <ChakraNextLink
          display="inline"
          target="_blank"
          textDecoration="underline"
          href="https://twitter.com/EthereumCN"
        >
          {" "}
          ECN 的推特
        </ChakraNextLink>
        。<Text />
      </Text>
    ),
  },
  {
    question: "这些数字凭证可以在其他平台展示吗？",
    answer: (
      <Text textAlign="start" display="inline-block" sx={{}}>
        NFT、POAP 和 SBT 均链上可查，而具体而言，参与证明属性的 NFT
        都可以直接在各大兼容 EVM 的平台上(opensea, looksRare等)显示，而 POAP
        可以直接在 POAP 的平台上展示，其他 Web3 社交应用或平台也可通过 POAP
        提供的API 进行展示。
        <br />
        继承了NFT ERC721协议的 SBT 虽然同样具有基本的
        NFT属性，可以在NFT的平台上被自动识别和展示，包括 SBT
        的名字，描述和属性等。但由于 SBT 本身的不可转让性，使得 SBT
        即使能够出现在NFT平台上，却无法使用部分交易平台的功能，比如转售和拍卖。
      </Text>
    ),
  },
];

export const HomeFAQsView = () => {
  return (
    <Flex
      direction="column"
      mt="11.5rem"
      mb="148px"
      // bg="#0C0601"

      color="#FFFFFF"
      // minH={"500px"}
      w="full"
      align="center"
      // bgColor="green"
    >
      <Heading
        color="#010215"
        fontFamily="Noto Sans"
        fontWeight={600}
        fontSize="2.75rem"
        mb="2.75rem"
      >
        FAQ
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
