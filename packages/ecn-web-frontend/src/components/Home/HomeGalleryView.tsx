import { Flex, Grid, GridItem, Heading } from "@chakra-ui/react";

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
      bg="#0C0601"
      color="#FFFFFF"
      minH="500px"
      w="full"
      align="center"
    >
      <Heading py="120px" fontWeight={400} fontSize="4rem">
        EthGift Gallery
      </Heading>
      <Grid
        templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)"]}
        rowGap="6.5vw"
        columnGap="5.6vw"
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
