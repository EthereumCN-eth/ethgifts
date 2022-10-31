import { Flex, Heading, Accordion } from "@chakra-ui/react";

import { FAQItem } from "../shared/FAQItem";

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

export const HomeFAQsView = () => {
  return (
    <Flex
      direction="column"
      mt="11.5rem"
      mb="146px"
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
