import type { AccordionPanelProps } from "@chakra-ui/react";
import {
  Box,
  Flex,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from "@chakra-ui/react";
import type { ReactNode } from "react";
import { AiFillDownCircle, AiFillUpCircle } from "react-icons/ai";

export const FAQItem = ({
  question,
  answer,
  accordionPanelProps,
}: {
  question: string;
  answer: ReactNode;
  accordionPanelProps?: AccordionPanelProps;
}) => (
  <AccordionItem mb={3}>
    {({ isExpanded }) => (
      <>
        <Flex
          as="h2"
          p={0}
          m={0}
          background="rgba(255, 255, 255, 0.6)"
          boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
          borderRadius="16px"
          // border="1px solid #7A7A7A"
          // borderRadius={4}
          h="4.87rem"
          align="center"
        >
          <AccordionButton h="100%" textAlign="center">
            <Box
              flex="1"
              textAlign="center"
              fontSize="1rem"
              fontWeight={600}
              fontFamily="PingFang SC"
              letterSpacing="0.02em"
              color={isExpanded ? "#EE862B" : "#010215"}
            >
              {question}
            </Box>
            {/* <AccordionIcon /> */}
            {isExpanded ? (
              <AiFillUpCircle size="1.1rem" color="#EE862B" />
            ) : (
              <AiFillDownCircle size="1.1rem" />
            )}
          </AccordionButton>
        </Flex>
        <AccordionPanel
          minH="6.4rem"
          my="6px"
          bg="#DDD9D7"
          opacity={0.6}
          px="16%"
          py="2.25rem"
          textAlign="center"
          display="flex"
          alignItems="center"
          justifyContent="center"
          fontFamily="PingFang SC"
          fontSize="sm"
          fontWeight={500}
          lineHeight="taller"
          letterSpacing="0.01em"
          color="#000000"
          boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
          borderRadius="16px"
          {...accordionPanelProps}
        >
          {answer}
        </AccordionPanel>
      </>
    )}
  </AccordionItem>
);
