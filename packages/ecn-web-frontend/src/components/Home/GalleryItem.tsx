import {
  Button,
  Center,
  Flex,
  HStack,
  Image,
  LinkBox,
  LinkOverlay,
  Skeleton,
  Text,
  VStack,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";

import { TextTag } from "../shared/TextTag";
import type { GalleryItemType } from "@/state/gallery/types";

export const GalleryItem = ({
  homeTags,
  imgSrc,
  imgAlt,
  title,
  desc,
  btnTxt,
  linkTo,
  status,
}: GalleryItemType & {
  linkTo: string;
}) => {
  const isOngoing = status === "ongoing";
  const router = useRouter();
  return (
    <LinkBox key={title}>
      <Flex
        w={["50vw", "40vw", "22vw"]}
        minH={[
          `${(50 / 498) * 660}vw`,
          `${(40 / 498) * 660}vw`,
          `${(22 / 498) * 660}vw`,
        ]}
        direction="column"
        align="flex-start"
        // bg="red"
        pt="20px"
        px="10px"
        pb="26px"
        // background="rgba(255, 255, 255, 0.01)"
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
                tagRestProps={{
                  maxW: "8rem",
                  h: "100%",
                }}
                variant={tagItem.variant}
                text={tagItem.label}
              />
            );
          })}
        </HStack>
        <Center width="100%" h="360px" my="10px">
          <Image
            // loading="lazy"
            loading="lazy"
            fit="contain"
            h="full"
            w="72%"
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
          minH="65px"
          align="center"
          justify="center"
          mt="10px"
        >
          <NextLink href={linkTo} passHref>
            <LinkOverlay>
              <Text
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
          <Text
            mt="8px"
            color="#DDD9D7"
            fontWeight={500}
            fontSize="sm"
            fontFamily="PingFang SC"
            letterSpacing="0.01em"
          >
            {desc}
          </Text>
        </VStack>

        <Center
          width="full"
          minH="40px"
          mt="24px"
          // flex={"1 0 43"}
        >
          <Button
            borderRadius="8px"
            variant="outline"
            fontSize="sm"
            bgColor={isOngoing ? "#FFFFFF" : "transparent"}
            color={isOngoing ? "#000000" : "white"}
            _hover={{
              color: "#000",
              bg: "#F2F2F2",
            }}
            _active={{
              color: "#000",
              bg: "gray.300",
            }}
            minW="48%"
            display={["none", "none", "none", "none", "block"]}
            onClick={() => {
              router.push(linkTo);
            }}
          >
            {btnTxt}
          </Button>
        </Center>
      </Flex>
    </LinkBox>
  );
};
