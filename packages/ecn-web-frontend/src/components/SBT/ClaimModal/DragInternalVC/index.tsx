import { Flex, HStack, IconButton, Tabs, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { AiOutlineLeftCircle, AiOutlineRightCircle } from "react-icons/ai";

import { useAppSelector } from "@/state/reduxHooks";
import { selectors as sbtSelectors } from "@/state/sbt";

import { useInternalDragState } from "./internalDragState";
import { LevelTabList } from "./LevelTabList";
import { LevelTabPanels } from "./LevelTabPanels";

export const DragInternalVC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { loaded, records, sbtLevel } = useAppSelector(sbtSelectors.selectAll);

  const init = useInternalDragState((state) => state.init);
  useEffect(() => {
    if (loaded) {
      // console.log("load init");
      init(
        sbtLevel.map((_, i) => i),
        0
      );
    }
  }, [init, loaded, sbtLevel]);
  const selectedIndex = useInternalDragState((state) => state.selectedIndex);
  const clickLevel = useInternalDragState((state) => state.clickLevel);
  const clickNext = useInternalDragState((state) => state.clickNext);
  const clickPre = useInternalDragState((state) => state.clickPre);
  const leftDisabled = useInternalDragState((state) => state.leftDisabled);
  const rightDisabled = useInternalDragState((state) => state.rightDisabled);

  return (
    <Tabs w="full" h="100%" index={selectedIndex} onChange={clickLevel}>
      <Flex w="full" h="496px" mt="56px">
        <LevelTabPanels />
      </Flex>
      <Text
        fontSize="xl"
        my="36px"
        fontFamily="PingFang SC"
        fontWeight={400}
        color="#fff"
        textAlign="center"
      >
        请拖入对应的线下VC文档到虚线框内，以激活 E群誌 SBT Lv1 的申领。
      </Text>
      <HStack w="full" justify="center">
        <IconButton
          aria-label="left"
          isDisabled={leftDisabled}
          onClick={clickPre}
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
          minW="291px"
          px="20px"
          h="44px"
          bgColor="#FAFAFA"
          borderRadius="62px"
          align="center"
          justify="center"
        >
          {/*  */}
          <Text fontSize="sm" textAlign="center" color="#757575" mr="6px">
            申领 E群誌SBT
          </Text>
          <LevelTabList />
        </Flex>
        <IconButton
          aria-label="left"
          isDisabled={rightDisabled}
          onClick={clickNext}
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
