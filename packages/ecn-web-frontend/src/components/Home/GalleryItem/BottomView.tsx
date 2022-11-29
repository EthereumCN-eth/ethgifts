import { Center, Flex, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { useMemo } from "react";

import { LiveAnimate } from "@/components/LiveAnimate";
import type { Tag } from "@/state/gallery/types";

const certicons = {
  技能证明: {
    text: "技能证明",
    src: "/posicon.png",
  },
  知识证明: {
    text: "知识证明",
    src: "/pokicon.png",
  },
  工作量证明: {
    text: "工作量证明",
    src: "/powicon.png",
  },
  参与证明: {
    text: "参与证明",
    src: "/popicon.png",
  },
};

const certkeys = Object.keys(certicons);

export const BottomView = ({
  status,
  desc,
  homeTags,
}: {
  status: string | null;
  desc: string;
  homeTags: Tag[];
}) => {
  const certItem = useMemo(() => {
    const ind = homeTags.reduce((acc, tag) => {
      if (acc !== -1) return acc;
      return certkeys.indexOf(tag.label);
    }, -1);
    // console.log("hom", homeTags);
    // console.log(ind);
    return ind !== -1
      ? certicons[certkeys[ind] as keyof typeof certicons]
      : null;
  }, [homeTags]);
  // console.log("render");

  return (
    <Flex direction="row" w="full" h="56px" justify="space-between" align="end">
      <VStack align="start">
        <HStack>
          {!!status && <LiveAnimate />}

          <Text
            fontSize="0.75rem"
            fontWeight={600}
            fontFamily="PingFang SC"
            textTransform="uppercase"
            letterSpacing="0.06em"
            color="#fff"
          >
            {status || "EXPIRED"}
          </Text>
        </HStack>
        <Text
          fontSize="0.825rem"
          fontWeight={400}
          fontFamily="PingFang SC"
          // textTransform="uppercase"
          letterSpacing="0.01em"
          color="#DDD9D7"
        >
          {desc}
        </Text>
      </VStack>
      <VStack>
        <Center h="25px" w="40px" position="relative">
          <Image
            style={{
              fill: "white",
            }}
            src={certItem?.src}
            fit="contain"
            h="100%"
            w="100%"
          />
        </Center>

        <Text
          color="#DDD9D7"
          letterSpacing="0.01em"
          fontSize="0.825rem"
          fontWeight={400}
          fontFamily="PingFang SC"
        >
          {certItem?.text}
        </Text>
      </VStack>
    </Flex>
  );
};
