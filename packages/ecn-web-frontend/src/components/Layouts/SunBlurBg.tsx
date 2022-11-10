import { Box, Center } from "@chakra-ui/react";

export const SunBlurBg = () => (
  <Center
    // zIndex={1}
    sx={{
      filter: "blur(235px)",
      background: "rgba(255, 255, 255, 0.82)",
    }}
    position="fixed"
    w="full"
    h="full"
    zIndex={-1}
  >
    <Box
      // position="absolute"
      // left="50%"
      // top="50%"
      // borderRadius="50%"
      // transform="translate(-50%, -50%)"
      w={`${Math.min(window.innerHeight, window.innerWidth) * 0.6}px`}
      h={`${Math.min(window.innerHeight, window.innerWidth) * 0.6}px`}
      zIndex={1000}
      bg="#EF862A"
    />
  </Center>
);
