import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Image,
  LinkBox,
  LinkOverlay,
  Skeleton,
  Spinner,
  Tag,
  TagLabel,
  Text,
  VStack,
} from "@chakra-ui/react";

import type { GiftItemProps } from "./types";

export const GalleryItem = ({
  tags,
  imgSrc,
  imgAlt,
  title,
  desc,
  btnTxt,
}: GiftItemProps) => {
  return (
    <LinkBox>
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
          {tags.map((tagItem) => {
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
          })}
        </HStack>
        <Center width="full" h="62%">
          {imgSrc && (
            <Image fit="contain" h="full" w="full" src={imgSrc} alt={imgAlt} />
          )}
          {!imgSrc && (
            <Box position="relative" w="full" h="full">
              <Skeleton
                startColor="orange.200"
                endColor="orange.400"
                w="full"
                h="full"
              />
              <Center
                top={0}
                left={0}
                position="absolute"
                h="full"
                width="full"
              >
                <Spinner />
              </Center>
            </Box>
          )}
        </Center>

        <VStack
          width="full"
          // flexBasis={126}
          // flex={"1 0 126"}
          h="19%"
          align="center"
          justify="center"
        >
          <LinkOverlay href="/#">
            <Text fontWeight={600} fontSize="1rem" fontFamily="PingFang SC">
              {title}
            </Text>
          </LinkOverlay>
          <Text
            color="#A7A7A7"
            fontWeight={400}
            fontSize="1rem"
            fontFamily="PingFang SC"
          >
            {desc}
          </Text>
        </VStack>

        <Center
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
          >
            {btnTxt}
          </Button>
        </Center>
      </Flex>
    </LinkBox>
  );
};
