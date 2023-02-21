import { Box, Center, Image } from "@chakra-ui/react";
import { useAccount } from "wagmi";

import { useReadClaimedSelectedLevel } from "@/hooks/useReadClaimedLevel";
import { useAppSelector } from "@/state/reduxHooks";
import { selectors as sbtSelectors } from "@/state/sbt";

export function SquareImg({
  artwork,
  itemTexts,
  ind,
  sbtLevelNumber,
}: {
  artwork: string;
  itemTexts: string[];
  ind: number;
  sbtLevelNumber: number;
}) {
  const {
    sbtLevel,
    // status,

    chainId,
    contractAddress,
  } = useAppSelector(sbtSelectors.selectAll);
  const { address } = useAccount();
  const levelIndex = sbtLevel.findIndex((ele) => ele === sbtLevelNumber);
  const isClaimed = useReadClaimedSelectedLevel({
    chainId,
    connectedAddress: address,
    contractAddress,
    currentLevelNumber: levelIndex + 1,
  });
  return (
    <Center w="100%">
      <Box
        w="90%"
        position="relative"
        // bgColor="#FEEEDF"
        // borderRadius={"50%"}
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
          // css={css`
          //   transform: scale(0.9);
          // `}
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
            transform="translate(5px, 50%)"
          />
        )}
      </Box>
    </Center>
  );
}
