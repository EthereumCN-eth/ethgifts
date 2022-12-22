import { Box } from "@chakra-ui/react";

import { VCView } from "./VCView";

export const VCDroppedView = ({ dropped }: { dropped: boolean }) => {
  return (
    <Box zIndex={10} position="absolute" opacity={dropped ? 1 : 0}>
      <VCView />
    </Box>
  );
};
