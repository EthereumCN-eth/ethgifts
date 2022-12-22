import { VStack } from "@chakra-ui/react";

import { resLen } from "./resLen";

export const VCView = () => {
  return (
    <VStack
      transition="transform 1s cubic-bezier(0.77, 0, 0.175, 1)"
      bgColor="green.100"
      w={`${resLen(295)}px`}
      h={`${resLen(421)}px`}
    >
      {/*  */}
    </VStack>
  );
};
