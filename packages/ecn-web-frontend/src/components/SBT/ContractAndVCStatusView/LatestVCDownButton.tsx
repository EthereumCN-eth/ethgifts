import { Button, useDisclosure } from "@chakra-ui/react";
import { AiOutlineDownload } from "react-icons/ai";

import { LatestDownModal } from "./LatestDownModal";

export const LatestVCDownButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        onClick={onOpen}
        w="100%"
        fontSize="sm"
        fontWeight={500}
        mt="12px"
        variant="blcakOutline"
        leftIcon={<AiOutlineDownload color="white" />}
      >
        下载VC
      </Button>
      <LatestDownModal
        // currentLevelCount={sbtLevel[selectedIndex]}
        //     selectedIndex={selectedIndex}
        // expressCount={expressCountNum}
        onClose={onClose}
        isOpen={isOpen}
      />
    </>
  );
};
