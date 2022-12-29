import { Box } from "@chakra-ui/react";

import { VCView } from "./VCView";

export const VCDroppedView = ({
  dropped,
  vcStr,
  levelIndex,
}: {
  dropped: boolean;
  vcStr: string | undefined;
  levelIndex: number;
}) => {
  return (
    <Box zIndex={10} position="absolute" opacity={dropped ? 1 : 0}>
      <VCView levelIndex={levelIndex} vcStr={vcStr} />
    </Box>
  );
};
