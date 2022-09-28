import {
  Box,
  Flex,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from "@chakra-ui/react";
import { AiFillDownCircle, AiFillUpCircle } from "react-icons/ai";

export const FAQItem = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => (
  <AccordionItem mb={4}>
    {({ isExpanded }) => (
      <>
        <Flex
          as="h2"
          p={0}
          m={0}
          border="1px solid #7A7A7A"
          borderRadius={4}
          h="7.8rem"
          align="center"
        >
          <AccordionButton h="100%" textAlign="center">
            <Box
              flex="1"
              textAlign="center"
              fontSize="2rem"
              fontFamily="PingFang SC"
            >
              {question}
            </Box>
            {/* <AccordionIcon /> */}
            {isExpanded ? (
              <AiFillUpCircle size="2.3rem" />
            ) : (
              <AiFillDownCircle size="2.3rem" />
            )}
          </AccordionButton>
        </Flex>
        <AccordionPanel
          minH="6.4rem"
          bg="#F2F2F2"
          borderRadius={4}
          px="16%"
          py={10}
          textAlign="center"
          display="flex"
          alignItems="center"
          justifyContent="center"
          fontFamily="PingFang SC"
          fontSize="1rem"
          lineHeight="taller"
        >
          {answer}
        </AccordionPanel>
      </>
    )}
  </AccordionItem>
);
