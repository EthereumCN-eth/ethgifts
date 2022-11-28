import { Button, useDisclosure } from "@chakra-ui/react";
import { useNetwork, useSwitchNetwork } from "wagmi";

import { ClaimModal } from "../ClaimModal";

export const ClaimButton = ({
  selectedIndex,
  chainId,
}: {
  selectedIndex: number;
  chainId: number;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { chain } = useNetwork();
  const isOnSBTChain = chain?.id === chainId;

  const { isLoading: isSwitchNetworkLoading, switchNetworkAsync } =
    useSwitchNetwork();
  const switchToNFTNetwork = () => {
    switchNetworkAsync?.(chainId).then(() => {
      onOpen();
    });
  };

  if (!isOnSBTChain) {
    return (
      <Button
        isLoading={isSwitchNetworkLoading}
        onClick={switchToNFTNetwork}
        disabled={isSwitchNetworkLoading}
        mx="0"
        my="1.5%"
        variant="orangeBg"
        mt="30px"
        minW={["100%", "100%", "100%", "100%", "47%"]}
      >
        申领 SBT
      </Button>
    );
  }
  return (
    <>
      <Button
        onClick={onOpen}
        mx="0"
        my="1.5%"
        variant="orangeBg"
        mt="30px"
        minW={["100%", "100%", "100%", "100%", "47%"]}
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
