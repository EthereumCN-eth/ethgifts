import { Image } from "@chakra-ui/react";

import MotionBox from "@/components/motion/Box";

export const DragIndicator = () => {
  return (
    <MotionBox
      animate={{ x: "20%" }}
      transition={{
        repeat: Infinity,
        duration: 1,
        repeatType: "reverse",
      }}
    >
      <Image
        src="/dragicon.svg"
        h="3.8vw"
        w="3.8vw"
        transform="translateX(-20%)"
      />
    </MotionBox>
  );
};
