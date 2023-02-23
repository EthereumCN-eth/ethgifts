/* eslint-disable react/no-array-index-key */
import { Flex } from "@chakra-ui/react";
import type { BigNumber } from "ethers";
import { constants } from "ethers";
import type { Dispatch, SetStateAction } from "react";
import { useRef, useEffect } from "react";
import { useAccount, useContractRead } from "wagmi";

import erc1155ABI from "@/abis/ERC1155.json";
import { useAppSelector } from "@/state/reduxHooks";
import { selectors as sbtSelectors } from "@/state/sbt";
import { responsive } from "@/styles/utils";

import { SBTCard } from "./SBTCard";
import { SBTCardsLoad } from "./SBTCardsLoad";

export const SBTCards = ({
  condition,
  setCondition,
}: {
  condition: "owned" | "all";
  setCondition: Dispatch<SetStateAction<"owned" | "all">>;
}) => {
  const {
    loaded,
    sbtLevel,
    // status,
    chainId,
    artworks,
    itemTexts,
    contractAddress,
  } = useAppSelector(sbtSelectors.selectAll);
  const { address } = useAccount();
  // console.log("contr", contractAddress, sbtLevel);
  // const numberOfItems = artworks.length;
  const { data: claimed, isSuccess } = useContractRead({
    contractInterface: erc1155ABI,
    addressOrName: contractAddress || constants.AddressZero,
    chainId,
    functionName: "balanceOfBatch",
    args: [sbtLevel.map(() => address) || [], sbtLevel],
    enabled: !!address && sbtLevel && !!sbtLevel.length,
  });
  const claimedArray = claimed
    ? claimed.map((v: BigNumber) => !!v.toNumber())
    : [];

  const inited = useRef(false);
  useEffect(() => {
    if (isSuccess && !inited.current) {
      if (claimedArray.every((v) => !v)) {
        setCondition("all");
      }
      inited.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, setCondition]);
  // console.log("claimed", claimed);

  if (!loaded) return <SBTCardsLoad />;
  return (
    <Flex
      w="full"
      minH={responsive.respWStr(450)}
      // px={responsive.respWStr(63)}
      // justify="space-between"
      wrap="wrap"
    >
      {/*  */}
      {artworks.map((artwork, ind) => {
        // const qualified = expressCount ? expressCount >= sbtLevel[ind] : false;
        if (condition === "owned") {
          if (claimedArray[ind]) {
            return (
              <SBTCard
                numberOfItems={3}
                itemTexts={itemTexts}
                ind={ind}
                artwork={artwork}
                key={`translator-${artwork}-${ind}`}
                sbtLevelNumber={sbtLevel[ind]}
                isClaimed={claimedArray[ind]}
                // qualified={qualified}
              />
            );
          } else {
            return null;
          }
        } else {
          return (
            <SBTCard
              numberOfItems={3}
              itemTexts={itemTexts}
              ind={ind}
              artwork={artwork}
              key={`translator-${artwork}-${ind}`}
              sbtLevelNumber={sbtLevel[ind]}
              isClaimed={claimedArray[ind]}
              // qualified={qualified}
            />
          );
        }
      })}
    </Flex>
  );
};
