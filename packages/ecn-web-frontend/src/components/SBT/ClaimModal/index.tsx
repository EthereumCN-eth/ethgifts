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

import { DragExternalVC } from "./DragExternalVC";
import { DragInternalVC } from "./DragInternalVC";
import { responsive } from "./utils";

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
      // scrollBehavior="inside"
      closeOnOverlayClick={false}
    >
      <ModalOverlay
        // bgColor="rgba(255, 255, 255, 0.4)"
        backdropFilter="blur(5px)"
      />
      <ModalContent
        maxWidth={responsive.respW(1338)}
        width={responsive.respW(1338)}
        // h={responsive.respHStr(850)}
        fontFamily="PingFang SC"
        position="relative"
        border="none"
        bgColor="transparent"
        borderRadius={responsive.respHStr(24)}
        // border="rgba(255, 255, 255, 0.4) 1px solid"
        boxShadow="2px 2px 4px rgba(0, 0, 0, 0.25)"
        // p={0}
        // m={0}
      >
        <ModalCloseButton
          color="white"
          position="absolute"
          right={responsive.respWStr(34)}
          top={responsive.respHStr(20 - 7.5)}
          boxSize={responsive.respHStr(15)}
        />
        <ModalBody
          p={0}
          m={0}
          width="100%"
          border="none"
          // h={responsive.respHStr(850)}
          borderTopRadius={responsive.respHStr(24)}
        >
          <Tabs
            p={0}
            m={0}
            width="100%"
            h={responsive.respHStr(850)}
            variant="enclosed"
          >
            <TabList
              border="none"
              color="#DDD9D7"
              display="flex"
              justifyContent="center"
              bgColor="#4F4C49"
              borderTopRadius={responsive.respHStr(24)}
              h={responsive.respHStr(40)}
              lineHeight={responsive.respHStr(40)}
              fontSize="sm"
              fontWeight={500}
              p={0}
              m={0}
            >
              <Tab
                mt={responsive.respHStr(2)}
                borderTopRadius={responsive.respHStr(24)}
                fontSize={responsive.respHStr(14)}
                _selected={{
                  bgColor: "#06070D",
                }}
                verticalAlign="middle"
                bgColor="#726C66"
                minW="29%"
                py={0}
                m={0}
                px={responsive.respWStr(48)}
              >
                使用对应VC申领SBT
              </Tab>
              <Tab
                mt={responsive.respHStr(2)}
                borderTopRadius={responsive.respHStr(24)}
                fontSize={responsive.respHStr(14)}
                _selected={{
                  bgColor: "#06070D",
                }}
                bgColor="#726C66"
                minW="14.9%"
                py={0}
                m={0}
                px={responsive.respWStr(48)}
              >
                使用VC验证工具
              </Tab>
            </TabList>
            <TabPanels
              p={0}
              m={0}
              bgColor="#06070D"
              w="100%"
              h={responsive.respHStr(850 - 40)}
              borderBottomRadius={responsive.respHStr(24)}
            >
              <TabPanel
                p={0}
                m={0}
                h={responsive.respHStr(850 - 40)}
                borderBottomRadius={responsive.respHStr(24)}
              >
                <DragInternalVC viewingSelectedIndex={viewingSelectedIndex} />
              </TabPanel>
              <TabPanel
                p={0}
                m={0}
                h={responsive.respHStr(850 - 40)}
                borderBottomRadius={responsive.respHStr(24)}
              >
                <DragExternalVC />
              </TabPanel>
            </TabPanels>
          </Tabs>
          {/*  */}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
