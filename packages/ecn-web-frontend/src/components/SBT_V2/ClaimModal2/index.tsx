import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import { css } from "@emotion/react";
import { useState } from "react";

import { useAppSelector } from "@/state/reduxHooks";
import { selectors as sbtSelectors } from "@/state/sbt";
import { responsive } from "@/styles/utils";

import { ClaimPanel } from "./ClaimPanel";
import { CongrasConfetti } from "./SizedConfetti";

export const ClaimModal = ({
  isOpen,
  onClose,
  levelIndex,
  isClaimed,
}: //   expressCount,
//   currentLevel,
{
  onClose: () => void;
  isOpen: boolean;
  levelIndex: number;
  isClaimed: boolean;
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { loaded, records, sbtLevel } = useAppSelector(sbtSelectors.selectAll);
  const [claimed, setClaimed] = useState(isClaimed);

  return (
    <Modal
      onClose={onClose}
      // finalFocusRef={btnRef}
      isOpen={isOpen}
      // scrollBehavior="inside"
      closeOnOverlayClick={false}
    >
      <ModalOverlay
        bgColor="rgba(255, 255, 255, 0.4)"
        backdropFilter="blur(5px)"
      />
      <ModalContent
        maxWidth={responsive.respWStr(1338)}
        width={responsive.respWStr(1338)}
        // h={responsive.respHStr(850)}
        fontFamily="PingFang SC"
        position="relative"
        border="none"
        h={responsive.respHStr(801)}
        // bgColor="transparent"
        css={css`
          background: #000000;
        `}
        borderRadius="15px"
        // border="rgba(255, 255, 255, 0.4) 1px solid"
        boxShadow="2px 2px 4px rgba(0, 0, 0, 0.25)"
        // p={0}
        // m={0}
      >
        <ModalCloseButton
          color="white"
          position="absolute"
          right="18px"
          top="18px"
          boxSize="13px"
          size="13px"
        />
        <ModalBody
          p={0}
          m={0}
          width="100%"
          h="full"
          // bgColor="green.100"
          border="none"
          // h={responsive.respHStr(850)}
          borderRadius="15px"
        >
          <Flex pt={responsive.respHStr(75)} align="center" direction="column">
            <ClaimPanel
              claimed={claimed}
              setClaimed={setClaimed}
              isClaimed={isClaimed}
              levelIndex={levelIndex}
            />
          </Flex>
        </ModalBody>
      </ModalContent>

      <CongrasConfetti claimed={claimed} initClaimed={isClaimed} />
    </Modal>
  );
};
