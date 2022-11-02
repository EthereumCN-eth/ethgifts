import {
  Box,
  Flex,
  Image,
  TabPanel,
  TabPanels,
  VStack,
} from "@chakra-ui/react";

import MotionBox from "@/components/motion/Box";
import { useAppSelector } from "@/state/reduxHooks";
import { selectors as sbtSelectors } from "@/state/sbt";

export const LevelTabPanels = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { loaded, records, sbtLevel } = useAppSelector(sbtSelectors.selectAll);
  return (
    <TabPanels w="100%" h="100%">
      <TabPanel w="100%" h="100%">
        <Flex w="100%" h="100%" align="center" justify="center">
          <VStack
            bgColor="#FAFAFA"
            borderRadius="16px"
            w="20vw"
            h="20vw"
            maxWidth="400px"
            maxH="400px"
          >
            {/*  */}
          </VStack>
          <Box w="3vw" />
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
              //   animation={`${toDragkeyframe} 4s linear infinite`}
            />
          </MotionBox>
          <Box w="3vw" />
          <VStack
            w="24vw"
            h="24vw"
            maxWidth="460px"
            maxH="460px"
            borderRadius="16px"
            bgColor="transparent"
            border="1px dashed #FFFFFF"
          >
            {/*  */}
          </VStack>
        </Flex>
      </TabPanel>

      <TabPanel>
        <p>two!</p>
      </TabPanel>
      <TabPanel>
        <p>three!</p>
      </TabPanel>
    </TabPanels>
  );
};
