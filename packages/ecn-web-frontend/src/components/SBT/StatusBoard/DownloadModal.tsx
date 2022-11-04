import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
} from "@chakra-ui/react";
import { saveAs } from "file-saver";
import { useMemo } from "react";
import { AiOutlineDownload } from "react-icons/ai";

import type { VCType } from "../../../state/sbt/types";
import { JSONBottomLabel } from "../JSONBottomLabel";
import { useAppSelector } from "@/state/reduxHooks";
import { selectors as sbtSelectors } from "@/state/sbt";

export const DownloadModal = ({
  isOpen,
  onClose,
  // expressCount,
  currentLevelCount,
  selectedIndex,
}: {
  onClose: () => void;
  isOpen: boolean;
  // expressCount: number;
  currentLevelCount: number;
  selectedIndex: number;
}) => {
  const { loaded, records } = useAppSelector(sbtSelectors.selectAll);
  const vc = useMemo(() => {
    if (loaded) {
      const recordsArr = records
        ?.map((record) => JSON.parse(record.signedVC) as VCType)
        .filter(
          (vcItem) =>
            vcItem?.credentialSubject?.ethContractMessage?.expressAmount ===
            currentLevelCount
        );
      return recordsArr && recordsArr[0] ? recordsArr[0] : null;
    }
    return null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLevelCount, loaded]);

  const onDownloadVcCallback = () => {
    const file = new Blob([JSON.stringify(vc, null, 2)], {
      type: "text/json;charset=utf-8",
    });
    saveAs(file, `ecn_express_lv${selectedIndex + 1}.json`);
    // const url = URL.createObjectURL(file);
    // window.open(url, "_blank download")?.focus();
  };
  // console.log("DownloadModal");
  return (
    <Modal
      onClose={onClose}
      // finalFocusRef={btnRef}
      isOpen={isOpen}
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <ModalContent maxWidth="46.8vw" width="900px">
        <ModalHeader
          mt="50px"
          fontWeight={400}
          color="#000000"
          fontSize="xl"
          fontFamily="PingFang SC"
          textAlign="center"
        >
          你的Verifiable Credential json 数据如下
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody marginX="auto" width="100%">
          <VStack w="100%" h="55vh">
            <Box
              w="100%"
              h="calc(55vh - 20px)"
              overflow="auto"
              bgColor="#DDD9D7"
              borderTopRadius="8px"
              p="10px"
              pb="40px"
            >
              {/* <Box bgColor="#DDD9D7" w="10%" h="calc(55vh - 50px)"> */}
              <pre
                style={{
                  width: "100%",
                  whiteSpace: "pre-wrap",
                  fontSize: "xs",
                  // height: "90%",
                  color: "#8E8D8C",
                }}
              >
                {vc && JSON.stringify(vc, null, 2)}
              </pre>
              {/* </Box> */}
            </Box>
            <Box
              transform="translateY(-3px)"
              w="full"
              h="20px"
              // bgColor="red"
              position="relative"
              sx={{
                "& div": {
                  borderBottomRadius: "8px",
                },
              }}
            >
              <JSONBottomLabel hasVcJson />
            </Box>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button
            w="100%"
            fontSize="sm"
            fontWeight={500}
            // mt="12px"
            variant="blcakOutline"
            leftIcon={<AiOutlineDownload color="white" />}
            onClick={onDownloadVcCallback}
          >
            下载
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
