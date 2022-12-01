import { Center, Image, Text, VStack } from "@chakra-ui/react";

import { calcLen } from "../hooks/calcLen";
import { responsive } from "../utils";

export const NoVcDragView = () => {
  return (
    <VStack
      // ref={dragRef}
      bgColor="#FAFAFA"
      borderRadius={responsive.respWStr(16)}
      w={`${calcLen(responsive.respW(424))}px`}
      h={`${calcLen(responsive.respW(333))}px`}
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
        h={`${calcLen(responsive.respW(265))}px`}
        // maxH="318px"
        bgColor="#DDD9D7"
        borderRadius="8px"
        position="relative"
        justify="center"
        align="center"
        px={`${calcLen(responsive.respW(20))}px`}
        pt={`${calcLen(responsive.respW(20))}px`}
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
          w={`${calcLen(responsive.respW(31.5))}px`}
          h={`${calcLen(responsive.respW(12.6))}px`}
          objectFit="contain"
        />
      </Center>
    </VStack>
  );
};
