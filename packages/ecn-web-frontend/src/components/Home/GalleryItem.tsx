import {
  Button,
  Center,
  Flex,
  HStack,
  Image,
  LinkBox,
  LinkOverlay,
  Skeleton,
  Tag,
  TagLabel,
  Text,
  VStack,
} from "@chakra-ui/react";
import NextLink from "next/link";

import type { GalleryItemType } from "@/state/gallery/types";

export const GalleryItem = ({
  homeTags,
  imgSrc,
  imgAlt,
  title,
  desc,
  btnTxt,
  id,
  typeName,
}: GalleryItemType) => {
  return (
    <LinkBox key={title}>
      <Flex
        w={["50vw", "30vw", "22vw"]}
        h={[
          `${(50 / 440) * 682}vw`,
          `${(33 / 440) * 682}vw`,
          `${(26 / 440) * 682}vw`,
        ]}
        direction="column"
        align="flex-start"
      >
        <HStack w="full" h="12%" align="flex-start">
          {homeTags.map((tagItem) => {
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
          <Image
            // loading="lazy"
            loading="lazy"
            fit="contain"
            h="full"
            w="full"
            src={imgSrc}
            alt={imgAlt}
            fallbackStrategy="beforeLoadOrError"
            fallback={
              <Skeleton
                startColor="orange.200"
                endColor="orange.400"
                w="full"
                h="full"
              />
            }
          />
        </Center>

        <VStack
          width="full"
          // flexBasis={126}
          // flex={"1 0 126"}
          minH="19%"
          align="center"
          justify="center"
          mt="10px"
        >
          <NextLink href={`/${typeName}/${id}`} passHref>
            <LinkOverlay>
              <Text
                textAlign="center"
                fontWeight={600}
                fontSize="1rem"
                fontFamily="PingFang SC"
              >
                {title}
              </Text>
            </LinkOverlay>
          </NextLink>
          <Text
            mt="5px"
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
          minH="5%"

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
            minW="80%"
            display={["none", "none", "none", "none", "block"]}
          >
            {btnTxt}
          </Button>
        </Center>
      </Flex>
    </LinkBox>
  );
};
