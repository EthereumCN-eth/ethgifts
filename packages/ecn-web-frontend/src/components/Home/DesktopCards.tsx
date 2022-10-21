import { Box, HStack, Image, Text, VStack, keyframes } from "@chakra-ui/react";
import { css } from "@emotion/react";

const textAnimation = keyframes`
  0%   {opacity:0}
  50%  {opacity:0}
  100% {opacity:1}
`;
const data = [
  {
    text: "工作量凭证",
    imageSrc: "/powin.png",
    imgOutSrc: "/powout.png",
    descLines: [
      "可查看领取进度；",
      "贡献内容上链；",
      "经验证铸造；",
      "可下载对应的链下Verifiable Credential。",
    ],
    bgColor: "#CEDFF9",
  },
  {
    text: "技能凭证",
    imageSrc: "/posin.png",
    imgOutSrc: "/posout.png",
    descLines: [
      "翻译内容上链；",
      "经认证铸造；",
      "可下载对应的链下Verifiable Credential。",
    ],
    bgColor: "#FEECC0",
  },
  {
    text: "参与凭证",
    imageSrc: "/popin.png",
    imgOutSrc: "/popout.png",
    descLines: ["具有不可转让性；", "展示你的社区活跃程度。"],
    bgColor: "#CCE5D2",
  },
  {
    text: "成员资格凭证",
    imageSrc: "/pomin.png",
    imgOutSrc: "/pomout.png",
    descLines: ["每款新推出的NFT都将带上ECN的标识，以证明社区成员资格。"],

    bgColor: "#F2CDC8",
  },
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
        position="relative"
        alignItems="center"
      />

      <HStack
        spacing={0}
        //   borderY={"black solid 1px"}
        w="100vw"
        px={`${100 / data.length / 2}vw`}
        minH="68vh"
        align="center"
        gap={0}
        css={css`
          opacity: ${vBarOpacity};
          background: rgba(255, 255, 255);
          filter: drop-shadow(18px 25px 15px rgba(0, 0, 0, 0.25));
        `}
        _hover={{
          // "& > div:not(:hover)": {
          //   w: "6.25%",
          // },

          "& > div:not(:hover)": {
            w: "16%",
            "& .ecn-in-icon-shell": {
              // top: "14.4%",
              opacity: 0,
            },
          },
          "& > div:hover": {
            w: "52%",
            "& .ecn-in-icon": {
              top: "14.4%",
            },

            "& .ecn-card-title": {
              top: "81.4%",
            },
            "& .ecn-card-desc": {
              opacity: 1,
              animation: `${textAnimation} 1.5s cubic-bezier(0.77, 0, 0.175, 1)`,
              transition: "all 1s cubic-bezier(0.77, 0, 0.175, 1)",
            },
          },
        }}
      >
        {data.map((i, index) => {
          return (
            <VStack
              key={i.text}
              m={0}
              bg={i.bgColor}
              // flex={1}
              w="20vw"
              minH="68vh"
              borderLeft="#E1E1E1 solid 1px"
              borderRight={
                index === data.length - 1 ? "#E1E1E1 solid 1px" : "none"
              }
              align="center"
              position="relative"
              transition="all 1s cubic-bezier(0.77, 0, 0.175, 1)"
              // justify={"center"}
            >
              <Text
                className="ecn-card-title"
                textAlign="center"
                // mb={24}
                flex="0 0 auto"
                position="absolute"
                top="66.2%"
                fontSize={["sm", "md", "xl", "xl"]}
                color="#010215"
                fontWeight={600}
                fontFamily="PingFang SC"
                transition="all 1s cubic-bezier(0.77, 0, 0.175, 1)"
              >
                {i.text}
              </Text>
              <Box
                color="#010215"
                position="absolute"
                top="54.9%"
                fontWeight={500}
                // transition="all 3s cubic-bezier(0.77, 0, 0.175, 1)"
                textAlign="center"
                fontSize={["xxs", "xs", "sm", "sm"]}
                w="80%"
                className="ecn-card-desc"
                opacity={0}
              >
                {i.descLines.map((line) => {
                  return <Text key={line}>{line}</Text>;
                })}
              </Box>
              <Box
                className="ecn-in-icon ecn-in-icon-shell"
                w="47%"
                h="auto"
                position="absolute"
                top="29.7%"
                transition="all 1s cubic-bezier(0.77, 0, 0.175, 1)"
              >
                <Image
                  src={i.imgOutSrc}
                  alt={`${i.text}-shell`}
                  fit="contain"
                />
              </Box>
              <Box
                className="ecn-in-icon"
                w="47%"
                h="auto"
                position="absolute"
                top="28.6%"
                transition="all 1s cubic-bezier(0.77, 0, 0.175, 1)"
              >
                <Image src={i.imageSrc} alt={i.text} fit="contain" />
              </Box>
            </VStack>
          );
        })}
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
