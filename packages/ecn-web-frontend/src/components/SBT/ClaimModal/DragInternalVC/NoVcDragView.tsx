import { Text, VStack } from "@chakra-ui/react";

export const NoVcDragView = () => {
  return (
    <VStack
      // ref={dragRef}
      bgColor="#FAFAFA"
      borderRadius="16px"
      w="20vw"
      h="20vw"
      p="20px"
      maxWidth="400px"
      maxH="400px"
      cursor="grab"
      sx={{
        "&::before, &::after": {
          borderRadius: "16px",
        },
        transform: "translate(0, 0)",
      }}
    >
      <VStack
        w="100%"
        h="16vw"
        maxH="318px"
        bgColor="#DDD9D7"
        borderRadius="8px"
        position="relative"
        justify="center"
        px="20px"
        pt="30px"
        pb="50px"
      >
        <Text fontWeight={500} fontSize="sm" textAlign="center">
          我们没有你的VC数据。
        </Text>
      </VStack>
    </VStack>
  );
};
