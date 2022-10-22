import {
  Box,
  Center,
  Flex,
  HStack,
  Skeleton,
  SkeletonText,
  VStack,
} from "@chakra-ui/react";

export const GalleryShellItem = () => {
  return (
    <Flex
      w={["50vw", "40vw", "22vw"]}
      minH={[
        `${(50 / 498) * 660}vw`,
        `${(40 / 498) * 660}vw`,
        `${(22 / 498) * 660}vw`,
      ]}
      direction="column"
      align="flex-start"
    >
      <HStack w="full" h="12%" align="flex-start" />
      <Center width="100%" h="400px" my="48px">
        <Box position="relative" w="72%" h="full">
          <Skeleton
            startColor="orange.200"
            endColor="orange.400"
            w="full"
            h="full"
          />
          <Center top={0} left={0} position="absolute" h="full" width="full">
            {/* <Spinner /> */}
          </Center>
        </Box>
      </Center>

      <VStack
        width="full"
        // flexBasis={126}
        // flex={"1 0 126"}
        h="125px"
        align="center"
        justify="center"
      >
        <SkeletonText
          noOfLines={3}
          startColor="orange.200"
          endColor="orange.400"
          w="80%"
        />
      </VStack>
    </Flex>
  );
};
