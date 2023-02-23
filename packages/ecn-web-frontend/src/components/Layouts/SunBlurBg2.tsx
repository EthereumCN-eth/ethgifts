import { Center, Image } from "@chakra-ui/react";

export const SunBlurBg = () => (
  <Center
    // zIndex={1}
    sx={
      {
        // filter: "blur(235px)",
        // background: "rgba(255, 255, 255, 0.82)",
      }
    }
    position="fixed"
    w="full"
    h="full"
    zIndex={-1}
  >
    <Image fit="cover" alt="bg" src="/sunbg.png" w="full" h="full" />
  </Center>
);
