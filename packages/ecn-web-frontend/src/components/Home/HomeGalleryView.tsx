import { Box, Flex, Grid, GridItem, Heading } from "@chakra-ui/react";

import type { GalleryItemType } from "@/state/gallery/types";

import { GalleryNFTItem } from "./GalleryNFTItem";
import { GalleryPoapItem } from "./GalleryPoapItem";
import { GallerySBTItem } from "./GallerySBTItem";
import { GalleryShellItem } from "./GalleryShellItem";

export const HomeGalleryView = ({
  items,
  loading,
  shellNumber,
}: {
  items: GalleryItemType[];
  shellNumber: number;
  loading: boolean;
}) => {
  const shellItems = new Array(shellNumber).fill(null).map((_, i) => ({
    key: i,
  }));
  return (
    <Flex
      zIndex={100}
      direction="column"
      my={30}
      background="rgba(12, 6, 1, 0.82)"
      color="#FFFFFF"
      minH="500px"
      w="full"
      align="center"
      position="relative"
    >
      <Box position="absolute" top="-500px" id="ecn-gallery" />
      <Heading
        pt="100px"
        pb="76px"
        fontFamily="Noto Sans"
        fontWeight={600}
        color="#EE862B"
        fontSize="2.75rem"
      >
        ETHGifts Gallery
      </Heading>
      <Grid
        templateColumns={[
          "repeat(1, 1fr)",
          "repeat(1, 1fr)",
          "repeat(2, 1fr)",
          "repeat(2, 1fr)",
          "repeat(3, 1fr)",
        ]}
        rowGap="20px"
        // px="10%"
        columnGap="20px"
        pb="6.5vw"
      >
        {loading &&
          shellItems.map((sitem) => {
            return <GalleryShellItem key={sitem.key} />;
          })}
        {!loading &&
          items.map((item) => {
            return (
              <GridItem key={item.key}>
                {item.typeName === "nft" && <GalleryNFTItem {...item} />}
                {item.typeName === "sbt" && <GallerySBTItem {...item} />}
                {item.typeName === "poap" && <GalleryPoapItem {...item} />}
              </GridItem>
            );
          })}
      </Grid>
    </Flex>
  );
};
