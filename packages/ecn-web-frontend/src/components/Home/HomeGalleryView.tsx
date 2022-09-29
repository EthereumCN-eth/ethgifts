import { Flex, Grid, GridItem, Heading } from "@chakra-ui/react";

import { GalleryItem } from "./GalleryItem";
import { GalleryShellItem } from "./GalleryShellItem";
import type { GiftItemProps } from "./types";

export const HomeGalleryView = ({
  items,
  loading,
  shellNumber,
}: {
  items: GiftItemProps[];
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
                <GalleryItem {...item} />
              </GridItem>
            );
          })}
      </Grid>
    </Flex>
  );
};
