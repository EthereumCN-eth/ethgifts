import {
  Center,
  Flex,
  HStack,
  Image,
  LinkBox,
  LinkOverlay,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";

import { TextTag } from "../shared/TextTag";
import type { GalleryItemType } from "@/state/gallery/types";

import { GalleryOwnerShipStamp } from "./GalleryOwnerShipStamp";

export const GalleryItem = ({
  homeTags,
  imgSrc,
  imgAlt,
  title,
  desc,
  linkTo,
  isOwnIt = false,
}: GalleryItemType & {
  linkTo: string;
  isOwnIt?: boolean;
}) => {
  // const isOngoing = status === "ongoing";
  // const router = useRouter();
  return (
    <LinkBox key={title}>
      <Flex
        w="370px"
        maxW="70vw"
        minH="530px"
        direction="column"
        align="flex-start"
        // bg="red"
        pt="20px"
        px="15px"
        borderRadius="8px"
        background="rgba(255, 255, 255, 0.1)"
        _hover={{
          boxShadow: "0px 6px 6px rgba(0, 0, 0, 0.25)",
        }}
      >
        <HStack w="full" h="4.3%" align="flex-start">
          {homeTags.map((tagItem) => {
            if (!tagItem) return null;
            return (
              <TextTag
                key={tagItem.label}
                variant={tagItem.variant}
                text={tagItem.label}
              />
            );
          })}
        </HStack>
        <Center w="full" h="340px" mt="20px" mb="10px" position="relative">
          <Image
            // loading="lazy"
            maxW="70vw"
            loading="lazy"
            fit="contain"
            h="100%"
            w="100%"
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
          {isOwnIt && <GalleryOwnerShipStamp />}
        </Center>

        <Center w="full">
          <NextLink href={linkTo} passHref>
            <LinkOverlay>
              <Text
                display="block"
                mt="38px"
                color="#FFFFFF"
                textAlign="center"
                fontWeight={600}
                fontSize="1rem"
                fontFamily="PingFang SC"
                letterSpacing="0.02em"
              >
                {title}
              </Text>
            </LinkOverlay>
          </NextLink>
        </Center>
        <Center w="full">
          <Text
            display="block"
            mt="8px"
            color="#DDD9D7"
            fontWeight={500}
            fontSize="sm"
            fontFamily="PingFang SC"
            letterSpacing="0.01em"
          >
            {desc}
          </Text>
        </Center>
      </Flex>
    </LinkBox>
  );
};
