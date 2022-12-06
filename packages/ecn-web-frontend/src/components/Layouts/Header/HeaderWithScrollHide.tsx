import { Box } from "@chakra-ui/react";

import { Header } from "./Header";
import { useHeaderStore } from "./headerState";
import { useScrollDirection } from "./useScrollDirection";

export const HeaderWithScrollHide = () => {
  const dir = useScrollDirection();
  const name = useHeaderStore((state) => state.name);
  //   const { basebgColor } = useHeaderStore((state) => state.headerValues);
  const upbgColor =
    name === "black" ? "rgba(0, 0, 0, 0.82)" : "rgba(255, 255, 255, 0.8)";
  const downbgColor = "transparent";
  return (
    <>
      <Box
        w="full"
        transition="all 0.5s cubic-bezier(0.77, 0, 0.175, 1)"
        position="sticky"
        // top="0"
        top={dir === "down" ? "-120px" : "0"}
        bgColor={dir === "up" ? upbgColor : downbgColor}
        zIndex={1000}
      >
        <Header />
      </Box>
      {/* <Box w="full" position="relative">
        <Box w="full" h="120px" bgColor="red" />
      </Box> */}
    </>
  );
};
