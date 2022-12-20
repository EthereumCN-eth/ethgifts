import { Box, Image } from "@chakra-ui/react";

export function SquareImg({
  artwork,
  itemTexts,
  ind,
}: {
  artwork: string;
  itemTexts: string[];
  ind: number;
}) {
  return (
    <Box w="100%">
      <Box
        w="100%"
        position="relative"
        bgColor="red.100"
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
      </Box>
    </Box>
  );
}
