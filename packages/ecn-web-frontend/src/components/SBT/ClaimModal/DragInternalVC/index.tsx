import { Flex, HStack, IconButton, Tabs, Text } from "@chakra-ui/react";
import { AiOutlineLeftCircle, AiOutlineRightCircle } from "react-icons/ai";

import { useInitInternalDragState } from "./hooks/useInitInternalDragState";
import { useInternalDragState } from "./internalDragState";
import { LevelTabList } from "./LevelTabList";
import { LevelTabPanels } from "./LevelTabPanels";

export const DragInternalVC = ({
  viewingSelectedIndex,
}: {
  viewingSelectedIndex: number;
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  useInitInternalDragState({ viewingSelectedIndex });
  const selectedIndex = useInternalDragState((state) => state.selectedIndex);
  const clickLevel = useInternalDragState((state) => state.clickLevel);
  const clickNext = useInternalDragState((state) => state.clickNext);
  const clickPre = useInternalDragState((state) => state.clickPre);
  const leftDisabled = useInternalDragState((state) => state.leftDisabled);
  const rightDisabled = useInternalDragState((state) => state.rightDisabled);

  const isClaimed = useInternalDragState((state) =>
    state.computed.selectedClaimed(state)
  );

  const claimText = isClaimed ? "已申领" : "未申领";

  const claimingHint = useInternalDragState((state) => state.claimingHint);

  return (
    <Tabs w="full" h="100%" index={selectedIndex} onChange={clickLevel}>
      <Flex w="full" h="45%" mt="56px">
        <LevelTabPanels />
      </Flex>
      <Flex
        direction="row"
        align="center"
        justify="center"
        fontSize="xl"
        my="36px"
        fontFamily="PingFang SC"
        fontWeight={400}
        color="#fff"
        textAlign="center"
      >
        {claimingHint}
      </Flex>
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
        {`SBT申领状态：${claimText}`}
      </Text>
    </Tabs>
  );
};
