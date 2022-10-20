import { Box, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { css } from "@emotion/react";

const data = [
  { text: "工作量凭证", imageSrc: "/pow.png" },
  { text: "技能凭证", imageSrc: "/pos.png" },
  { text: "参与凭证", imageSrc: "/pop.png" },
  { text: "成员资格凭证", imageSrc: "/pom.png" },
];

export const DesktopCards = ({
  hBarOpacity,
  vBarOpacity,
}: {
  hBarOpacity: number;
  vBarOpacity: number;
}) => {
  return (
    <>
      <Box
        bg="#E1E1E1"
        w="120vw"
        minH="1px"
        css={css`
          opacity: ${hBarOpacity};
        `}
      />
      <HStack
        spacing={0}
        //   borderY={"black solid 1px"}
        w="120vw"
        minH="68vh"
        align="center"
        gap={0}
        css={css`
          opacity: ${vBarOpacity};
          background: rgba(255, 255, 255, 0.6);
        `}
      >
        <VStack m={0} flex={1} minH="68vh" borderLeft="#E1E1E1 solid 1px" />
        {data.map((i) => {
          return (
            <VStack
              key={i.text}
              m={0}
              flex={1}
              minH="68vh"
              borderLeft="#E1E1E1 solid 1px"
              align="center"
              position="relative"
              // justify={"center"}
            >
              <Text
                textAlign="center"
                // mb={24}
                flex="0 0 auto"
                position="absolute"
                top="25%"
                fontSize={["sm", "md", "xl", "3xl"]}
                color="black"
              >
                {i.text}
              </Text>
              <Box w="5.2vw" h="5.2vw" position="absolute" bottom="25%">
                <Image src={i.imageSrc} alt={i.imageSrc} fit="contain" />
              </Box>
            </VStack>
          );
        })}

        <VStack m={0} flex={1} minH="68vh" borderLeft="#E1E1E1 solid 1px" />
      </HStack>
      <Box
        bg="#E1E1E1"
        w="120vw"
        minH="1px"
        css={css`
          opacity: ${hBarOpacity};
        `}
      />
    </>
  );
};
