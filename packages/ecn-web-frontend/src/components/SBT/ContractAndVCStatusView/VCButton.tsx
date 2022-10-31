import { Button } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { AiOutlineDownload } from "react-icons/ai";

import { useIsAuth } from "@/state/global/hooks";
import { useAppSelector } from "@/state/reduxHooks";
import { selectors as sbtSelectors } from "@/state/sbt";

export const VCButton = () => {
  const isAuth = useIsAuth();
  const { loaded, records } = useAppSelector(sbtSelectors.selectAll);
  if (!isAuth) {
    return (
      <ConnectButton.Custom>
        {({ openConnectModal }) => (
          <Button
            w="100%"
            fontSize="sm"
            fontWeight={500}
            mt="12px"
            variant="blcakOutline"
            onClick={openConnectModal}
          >
            加入Discord做贡献
          </Button>
        )}
      </ConnectButton.Custom>
    );
  }

  if (isAuth && loaded && !records) {
    return (
      <Button
        w="100%"
        fontSize="sm"
        fontWeight={500}
        mt="12px"
        variant="blcakOutline"
        onClick={() => {}}
      >
        加入Discord做贡献
      </Button>
    );
  }

  return (
    <Button
      w="100%"
      fontSize="sm"
      fontWeight={500}
      mt="12px"
      variant="blcakOutline"
      leftIcon={<AiOutlineDownload color="white" />}
    >
      下载VC
    </Button>
  );
};
