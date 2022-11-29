import { Flex, HStack, IconButton, Tabs, Text } from "@chakra-ui/react";
import { AiOutlineLeftCircle, AiOutlineRightCircle } from "react-icons/ai";

import { responsive } from "../utils";

import { useClaimSBTFromVC } from "./hooks/useClaimSBTFromVC";
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

  useClaimSBTFromVC();

  return (
    <Tabs w="full" h="100%" index={selectedIndex} onChange={clickLevel}>
      <Flex
        w="full"
        h={responsive.respHStr(56 + 496)}
        pt={responsive.respHStr(56)}
      >
        <LevelTabPanels />
      </Flex>
      <Flex
        direction="row"
        align="center"
        justify="center"
        fontSize={responsive.respWStr(20)}
        my={responsive.respHStr(36)}
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
          w={responsive.respW(25)}
          h={responsive.respW(25)}
          variant="unstyled"
          minW="18px"
          minH="18px"
          icon={<AiOutlineLeftCircle size={responsive.respW(25)} />}
          color="#FFFFFF"
        />
        <Flex
          direction="row"
          minW={responsive.respW(291)}
          px={responsive.respW(20)}
          h={responsive.respH(44)}
          bgColor="#FAFAFA"
          borderRadius={responsive.respH(62)}
          align="center"
          justify="center"
        >
          {/*  */}
          <Text
            fontSize={responsive.respWStr(14)}
            textAlign="center"
            color="#757575"
            mr="6px"
          >
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
          w={responsive.respW(25)}
          h={responsive.respW(25)}
          minW="18px"
          minH="18px"
          variant="unstyled"
          icon={<AiOutlineRightCircle size={responsive.respW(25)} />}
          color="#FFFFFF"
        />
      </HStack>
      <Text
        textAlign="center"
        color="#FFFFFF"
        fontSize={responsive.respWStr(14)}
        fontWeight={500}
        mt={responsive.respH(24)}
        mb={responsive.respH(56)}
      >
        {`SBT申领状态：${claimText}`}
      </Text>
    </Tabs>
  );
};
