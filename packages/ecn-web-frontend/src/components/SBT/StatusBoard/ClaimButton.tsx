import { Button, useDisclosure } from "@chakra-ui/react";

import { ClaimModal } from "../ClaimModal";

export const ClaimButton = ({ selectedIndex }: { selectedIndex: number }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        onClick={onOpen}
        mx="auto"
        my="1.5%"
        variant="orangeBg"
        mt="30px"
        minW="47%"
      >
        申领 SBT
      </Button>
      <ClaimModal
        viewingSelectedIndex={selectedIndex}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};