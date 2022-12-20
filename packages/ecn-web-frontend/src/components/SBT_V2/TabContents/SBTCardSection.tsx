import { Flex, TabPanel } from "@chakra-ui/react";

import { useAppSelector } from "@/state/reduxHooks";
import { selectors as sbtSelectors } from "@/state/sbt";
import { responsive } from "@/styles/utils";

import { SBTCard } from "./SBTCard";

export const SBTCardSection = () => {
  const {
    loaded,
    // sbtLevel,
    // status,
    artworks,
    itemTexts,
    // contractAddress,
  } = useAppSelector(sbtSelectors.selectAll);

  const numberOfItems = artworks.length;

  if (numberOfItems === 0 || !loaded || !itemTexts) return null;

  return (
    <TabPanel w="full" h="full">
      <Flex
        w="full"
        h="full"
        px={responsive.respWStr(63)}
        justify="space-between"
      >
        {/*  */}
        {artworks.map((artwork, ind) => {
          return (
            <SBTCard
              numberOfItems={numberOfItems}
              itemTexts={itemTexts}
              ind={ind}
              artwork={artwork}
            />
          );
        })}
      </Flex>
    </TabPanel>
  );
};
