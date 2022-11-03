import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";

import { useAppSelector } from "@/state/reduxHooks";
import { selectors as sbtSelectors } from "@/state/sbt";

import { DragInternalVC } from "./DragInternalVC";

export const ClaimModal = ({
  isOpen,
  onClose,
  viewingSelectedIndex,
}: //   expressCount,
//   currentLevel,
{
  onClose: () => void;
  isOpen: boolean;
  viewingSelectedIndex: number;
  //   expressCount: number;
  //   currentLevel: number;
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { loaded, records, sbtLevel } = useAppSelector(sbtSelectors.selectAll);

  return (
    <Modal
      onClose={onClose}
      // finalFocusRef={btnRef}
      isOpen={isOpen}
      scrollBehavior="inside"
      closeOnOverlayClick={false}
    >
      <ModalOverlay
      // bgColor="rgba(255, 255, 255, 0.4)"
      // backdropFilter="blur(30px)"
      />
      <ModalContent
        maxWidth="69vw"
        width="1300px"
        // h="74vh"
        fontFamily="PingFang SC"
        position="relative"
        borderRadius="24px"
        border="rgba(255, 255, 255, 0.4) 1px solid"
        boxShadow="2px 2px 4px rgba(0, 0, 0, 0.25)"
      >
        <ModalCloseButton
          color="white"
          position="absolute"
          transform="translateY(-2px)"
        />
        <ModalBody p={0} m={0} width="100%" borderRadius="24px">
          <Tabs w="100%" variant="enclosed">
            <TabList
              border="none"
              color="#DDD9D7"
              display="flex"
              justifyContent="center"
              bgColor="#4F4C49"
              borderTopRadius="24px"
              h="45px"
              fontSize="sm"
              fontWeight={500}
            >
              <Tab
                mt="2px"
                borderTopRadius="24px"
                _selected={{
                  bgColor: "#06070D",
                }}
                bgColor="#726C66"
                minW="29%"
              >
                使用对应VC申领SBT
              </Tab>
              <Tab
                mt="2px"
                borderTopRadius="24px"
                _selected={{
                  bgColor: "#06070D",
                }}
                bgColor="#726C66"
                minW="14.9%"
              >
                使用VC验证工具
              </Tab>
            </TabList>
            <TabPanels
              bgColor="#06070D"
              w="100%"
              minH="calc(74vh - 24px)"
              borderBottomRadius="24px"
            >
              <TabPanel>
                <DragInternalVC viewingSelectedIndex={viewingSelectedIndex} />
              </TabPanel>
              <TabPanel>
                <p>two!</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
          {/*  */}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
