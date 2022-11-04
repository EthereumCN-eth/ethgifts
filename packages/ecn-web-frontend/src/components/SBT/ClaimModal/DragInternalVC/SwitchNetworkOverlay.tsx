import { Button, Center } from "@chakra-ui/react";
import { useNetwork, useSwitchNetwork } from "wagmi";

import { chainIdToName } from "@/utils/chainIdToName";

import { useInternalDragState } from "./internalDragState";

export const SwitchNetworkOverlay = () => {
  const chainId = useInternalDragState((state) =>
    state.computed.selectChainId(state)
  );
  const { chain } = useNetwork();
  const isToShow = chain?.id !== chainId;
  const { isLoading, pendingChainId, switchNetwork } = useSwitchNetwork();
  return (
    <Center
      zIndex={100}
      position="absolute"
      top={0}
      left={0}
      right={0}
      bottom={0}
      bg="rgba(221, 217, 215, 0.8)"
      borderRadius="16px"
      display={isToShow ? "flex" : "none"}
    >
      <Button
        onClick={() => switchNetwork?.(chainId)}
        disabled={!switchNetwork || chainId === chain?.id}
        color="#FFFFFF"
        variant="orangeBg"
        fontSize={["sm", "sm", "md", "lg", "xl"]}
        fontWeight={600}
        textAlign="center"
      >
        {isLoading && pendingChainId === chainId
          ? "Switching..."
          : `Switch to ${chainIdToName(chainId)}`}
      </Button>
      {/* <Box>{error && error.message}</Box> */}
    </Center>
  );
};
