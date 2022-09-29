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
      w={["50vw", "30vw", "22vw"]}
      h={[
        `${(50 / 440) * 682}vw`,
        `${(30 / 440) * 682}vw`,
        `${(22 / 440) * 682}vw`,
      ]}
      direction="column"
      align="flex-start"
    >
      <HStack w="full" h="12%" align="flex-start">
        {/* {tags.map((tagItem) => {
              return (
                <Tag
                  key={tagItem.label}
                  maxW="8rem"
                  h="37%"
                  variant={tagItem.variant}
                  borderRadius="none"
                >
                  <TagLabel>{tagItem.label}</TagLabel>
                </Tag>
              );
            })} */}
      </HStack>
      <Center width="full" h="62%">
        <Box position="relative" w="full" h="full">
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
        h="19%"
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

      {/* <Center
          width="full"
          // flexBasis={43}
          h="5%"
          // flex={"1 0 43"}
        >
          <Button
            borderRadius="8px"
            variant="outline"
            _hover={{
              color: "#000",
              bg: "#F2F2F2",
            }}
            _active={{
              color: "#000",
              bg: "gray.300",
            }}
            display={["none", "none", "none", "block"]}
          />
        </Center> */}
    </Flex>
  );
};
