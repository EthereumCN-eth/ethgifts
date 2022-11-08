/* eslint-disable @typescript-eslint/no-unused-vars */
import { Text } from "@chakra-ui/react";
import type { ReactNode } from "react";

export const CommingSoonStatus = ({
  title,
  // nftData,
  children,
}: // desc,
{
  title: string;
  children: ReactNode;
  // desc: string | undefined;
}) => {
  return (
    <>
      <Text my="8.1%" fontFamily="PingFang SC" color="white" fontSize="4xl">
        {title}
      </Text>
      <Text
        fontSize="md"
        fontFamily="PingFang SC"
        color="white"
        letterSpacing="0.02em"
        mb="8.1%"
      >
        {children}
      </Text>
      {/* <Flex  direction="row" align="center" justify="space-between" wrap="wrap">
        <Button mx="auto" my="1.5%" variant="orangeBg" mt="30px" minW="93%">
          申领 SBT
        </Button>
      </Flex> */}
    </>
  );
};
