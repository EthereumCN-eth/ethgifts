import { Flex, HStack, IconButton, Tabs, Text } from "@chakra-ui/react";
import { AiOutlineLeftCircle, AiOutlineRightCircle } from "react-icons/ai";

import { useAppSelector } from "@/state/reduxHooks";
import { selectors as sbtSelectors } from "@/state/sbt";

import { LevelTabList } from "./LevelTabList";

export const DragInternalVC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { loaded, records, sbtLevel } = useAppSelector(sbtSelectors.selectAll);
  return (
    <Tabs w="full" h="100%">
      <Flex w="full" h="496px" mt="56px" bgColor="green">
        {/*  */}
      </Flex>
      <Text
        fontSize="xl"
        my="36px"
        fontFamily="PingFang SC"
        fontWeight={400}
        color="#757575"
        textAlign="center"
      >
        请拖入对应的线下VC文档到虚线框内，以激活 E群誌 SBT Lv1 的申领。
      </Text>
      <HStack w="full" justify="center">
        <IconButton
          aria-label="left"
          //   onClick={clickPrev}
          display="flex"
          alignItems="center"
          justifyContent="center"
          w="25px"
          h="25px"
          variant="unstyled"
          icon={<AiOutlineLeftCircle size="25px" />}
          color="#FFFFFF"
        />
        <Flex
          direction="row"
          w="291px"
          h="44px"
          bgColor="#FAFAFA"
          borderRadius="62px"
          align="center"
          justify="center"
        >
          {/*  */}
          <Text fontSize="sm" color="申领 E群誌SBT" mr="6px">
            申领 E群誌SBT
          </Text>
          <LevelTabList />
        </Flex>
        <IconButton
          aria-label="left"
          //   onClick={clickPrev}
          display="flex"
          alignItems="center"
          justifyContent="center"
          w="25px"
          h="25px"
          variant="unstyled"
          icon={<AiOutlineRightCircle size="25px" />}
          color="#FFFFFF"
        />
      </HStack>
      <Text
        textAlign="center"
        color="#FFFFFF"
        fontSize="sm"
        fontWeight={500}
        mt="24px"
        mb="56px"
      >
        SBT申领状态：未申领
      </Text>
    </Tabs>
  );
};
