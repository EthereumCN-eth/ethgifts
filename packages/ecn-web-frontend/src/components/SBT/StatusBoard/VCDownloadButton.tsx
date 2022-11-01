import { Button, useDisclosure } from "@chakra-ui/react";
import { AiOutlineDownload } from "react-icons/ai";

import { DownloadModal } from "./DownloadModal";

export const VCDownloadButton = ({
  expressCount,
  itemTexts,
  selectedIndex,
  sbtLevel,
}: {
  expressCount: number | null;
  itemTexts: string[] | null;
  selectedIndex: number;
  sbtLevel: number[];
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  if (!expressCount || !itemTexts || !sbtLevel.length) return null;
  const hasVc = expressCount >= sbtLevel[selectedIndex];

  return (
    <>
      <Button
        my="1.5%"
        mx="auto"
        variant="whiteOutline"
        colorScheme="whiteOutline"
        minW="47%"
        mt="30px"
        leftIcon={<AiOutlineDownload color="white" />}
        disabled={!hasVc}
        onClick={onOpen}
      >
        {/* {`E群志 SBT Lv2 对应的VC`} */}
        {`${itemTexts[selectedIndex]} 对应的VC`}
      </Button>
      <DownloadModal
        currentLevel={sbtLevel[selectedIndex]}
        expressCount={expressCount}
        onClose={onClose}
        isOpen={isOpen}
      />
    </>
  );
};
