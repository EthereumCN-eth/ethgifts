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
  const isDisabled = !expressCount || !itemTexts || !sbtLevel.length;
  const hasVc = expressCount && expressCount >= sbtLevel[selectedIndex];
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const expressCountNum = expressCount || 0;

  return (
    <>
      <Button
        my="1.5%"
        mx="0"
        variant="whiteOutline"
        colorScheme="whiteOutline"
        minW={["100%", "100%", "100%", "100%", "47%"]}
        mt="30px"
        leftIcon={<AiOutlineDownload color="white" />}
        disabled={isDisabled || !hasVc}
        onClick={onOpen}
      >
        {/* {`E群志 SBT Lv2 对应的VC`} */}
        {`${
          itemTexts && itemTexts[selectedIndex]
            ? itemTexts[selectedIndex]
            : "E群志 SBT"
        } 对应的VC`}
      </Button>
      <DownloadModal
        currentLevelCount={sbtLevel[selectedIndex]}
        selectedIndex={selectedIndex}
        // expressCount={expressCountNum}
        onClose={onClose}
        isOpen={isOpen}
      />
    </>
  );
};
