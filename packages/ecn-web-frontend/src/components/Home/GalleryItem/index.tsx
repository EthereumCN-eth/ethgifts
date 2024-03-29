import { Box, Flex, LinkBox } from "@chakra-ui/react";

import type { GalleryItemType } from "@/state/gallery/types";

import { BottomView } from "./BottomView";
import { MiddleImgView } from "./MiddleImgView";
import { UpperView } from "./UpperView";

export const GalleryItem = ({
  homeTags,
  imgSrc,
  imgAlt,
  title,
  desc,
  linkTo,
  isOwnIt = false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  typeName,
  status,
  tagText,
}: GalleryItemType & {
  linkTo: string;
  isOwnIt?: boolean;
  tagText: "nft" | "poap" | "sbt";
}) => {
  // const isOngoing = status === "ongoing";
  // const router = useRouter();
  return (
    <LinkBox key={title}>
      <Flex
        w="370px"
        // maxW="70vw"
        transform={["scale(0.9)", "scale(1)"]}
        h="550px"
        direction="column"
        align="flex-start"
        // bg="red"
        py="20px"
        px="25px"
        borderRadius="8px"
        background="rgba(255, 255, 255, 0.1)"
        _hover={{
          boxShadow: "0px 6px 6px rgba(0, 0, 0, 0.25)",
        }}
        // zIndex="100"
      >
        <UpperView title={title} linkTo={linkTo} typeName={tagText} />

        {/*  */}
        <Box h="50px" />
        <MiddleImgView imgAlt={imgAlt} imgSrc={imgSrc} isOwnIt={isOwnIt} />

        <Box h="63px" />

        <BottomView status={status} desc={desc} homeTags={homeTags} />
      </Flex>
    </LinkBox>
  );
};
