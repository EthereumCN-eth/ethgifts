import { Center, Image, Text, VStack } from "@chakra-ui/react";

import { responsive } from "../utils";

export const NoVcDragView = () => {
  return (
    <VStack
      // ref={dragRef}
      bgColor="#FAFAFA"
      borderRadius={responsive.respWStr(16)}
      w={responsive.respWStr(424)}
      h={responsive.respWStr(333)}
      p={responsive.respWStr(20)}
      // maxWidth="400px"
      // maxH="400px"
      cursor="grab"
      sx={{
        "&::before, &::after": {
          borderRadius: responsive.respWStr(16),
        },
        transform: "translate(0, 0)",
      }}
    >
      <VStack
        w="100%"
        h={responsive.respWStr(265)}
        // maxH="318px"
        bgColor="#DDD9D7"
        borderRadius="8px"
        position="relative"
        justify="center"
        align="center"
        px={responsive.respWStr(20)}
        pt={responsive.respWStr(20)}
        // mb="17px"
      >
        <Text
          fontWeight={500}
          fontSize={responsive.respWStr(14)}
          textAlign="center"
        >
          我们没有你的VC数据。
        </Text>
      </VStack>
      <Center flex="1">
        <Image
          src="/holdicon.svg"
          w={responsive.respW(31.5)}
          h={responsive.respW(12.6)}
          objectFit="contain"
        />
      </Center>
    </VStack>
  );
};
