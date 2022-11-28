import { Text, VStack } from "@chakra-ui/react";

import { responsive } from "../utils";

export const NoVcDragView = () => {
  return (
    <VStack
      // ref={dragRef}
      bgColor="#FAFAFA"
      borderRadius={responsive.respH(16)}
      w={responsive.respW(424)}
      h={responsive.respH(353)}
      p={responsive.respW(20)}
      // maxWidth="400px"
      // maxH="400px"
      cursor="grab"
      sx={{
        "&::before, &::after": {
          borderRadius: responsive.respH(16),
        },
        transform: "translate(0, 0)",
      }}
    >
      <VStack
        w="100%"
        h={responsive.respH(265)}
        // maxH="318px"
        bgColor="#DDD9D7"
        borderRadius="8px"
        position="relative"
        justify="center"
        px={responsive.respW(20)}
        pt={responsive.respH(30)}
        pb={responsive.respH(50)}
      >
        <Text fontWeight={500} fontSize="sm" textAlign="center">
          我们没有你的VC数据。
        </Text>
      </VStack>
    </VStack>
  );
};
