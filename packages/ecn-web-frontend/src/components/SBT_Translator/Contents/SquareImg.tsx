/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Image } from "@chakra-ui/react";
// import { useAccount } from "wagmi";

// import { useReadClaimedSelectedLevel } from "@/hooks/useReadClaimedLevel";
// import { useAppSelector } from "@/state/reduxHooks";
// import { selectors as sbtSelectors } from "@/state/sbt";

export function SquareImg({
  artwork,
  itemTexts,
  ind,
  sbtLevelNumber,
  isClaimed,
}: {
  artwork: string;
  itemTexts: string[];
  ind: number;
  sbtLevelNumber: number;
  isClaimed: boolean;
}) {
  // const {
  //   sbtLevel,
  //   // status,

  //   chainId,
  //   contractAddress,
  // } = useAppSelector(sbtSelectors.selectAll);
  // const { address } = useAccount();
  // const levelIndex = sbtLevel.findIndex((ele) => ele === sbtLevelNumber);
  // const isClaimed = false;
  return (
    <Box w="100%">
      <Box
        w="100%"
        position="relative"
        // bgColor="red.100"
        sx={{
          "&::after": {
            content: '""',
            display: "block",
            paddingBottom: `100%`,
          },
        }}
      >
        <Image
          position="absolute"
          left="0"
          top="0"
          width="100%"
          h="100%"
          src={artwork}
          alt={itemTexts[ind]}
          objectFit="contain"
        />
        {isClaimed && (
          <Image
            src="/ownstamp.svg"
            alt="you-own-it"
            w="29%"
            // h="60px"
            position="absolute"
            bottom={0}
            right={0}
            transform="translate(-5px, -50%)"
          />
        )}
      </Box>
    </Box>
  );
}
