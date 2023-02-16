import { Flex } from "@chakra-ui/react";

import { useAppSelector } from "@/state/reduxHooks";
import { selectors as sbtSelectors } from "@/state/sbt";
import { responsive } from "@/styles/utils";

import { SBTCard } from "./SBTCard";
import { SBTCardsLoad } from "./SBTCardsLoad";

export const SBTCards = () => {
  const {
    loaded,
    sbtLevel,
    // status,
    artworks,
    itemTexts,
    // contractAddress,
  } = useAppSelector(sbtSelectors.selectAll);

  // const numberOfItems = artworks.length;

  if (!loaded) return <SBTCardsLoad />;
  return (
    <Flex
      w="full"
      minH={responsive.respWStr(450)}
      // px={responsive.respWStr(63)}
      justify="space-between"
      wrap="wrap"
    >
      {/*  */}
      {artworks.map((artwork, ind) => {
        // const qualified = expressCount ? expressCount >= sbtLevel[ind] : false;
        return (
          <SBTCard
            numberOfItems={3}
            itemTexts={itemTexts}
            ind={ind}
            artwork={artwork}
            key={artwork}
            sbtLevelNumber={sbtLevel[ind]}
            // qualified={qualified}
          />
        );
      })}
    </Flex>
  );
};
