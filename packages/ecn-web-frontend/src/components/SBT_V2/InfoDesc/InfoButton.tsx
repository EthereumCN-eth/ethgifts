import { Button } from "@chakra-ui/react";
import { css } from "@emotion/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useNetwork } from "wagmi";

import { fontSize } from "../styles";
import { selectors as globalSelectors } from "@/state/global";
import { useAppSelector } from "@/state/reduxHooks";
import { selectors as sbtSelectors } from "@/state/sbt";
import { responsive } from "@/styles/utils";

export const InfoButton = () => {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const authStatus = useAppSelector((state) =>
    globalSelectors.selectAuthStatus(state, { address, chainId: chain?.id })
  );

  const {
    // loaded,
    // sbtLevel,
    // status,
    // artworks,
    // itemTexts,
    // detailTags,
    expressCount,
    // contractAddress,
  } = useAppSelector(sbtSelectors.selectAll);
  // const expressCount = 1;

  if (authStatus === "unauthenticated") {
    return (
      <ConnectButton.Custom>
        {({ openConnectModal }) => {
          return (
            <Button
              variant="orangeBg"
              // variant="assist"
              w={responsive.respWStr(140)}
              h={responsive.respWStr(40)}
              px={responsive.respWStr(42)}
              py={responsive.respWStr(20)}
              css={css`
                font-family: "PingFang SC";
                font-style: normal;
                font-weight: 500;
                font-size: ${fontSize.res_xs};
                line-height: ${responsive.respWStr(20)};
                /* color: #ee862b; */
              `}
              onClick={openConnectModal}
            >
              连接钱包
            </Button>
          );
        }}
      </ConnectButton.Custom>
    );
  }
  if (!expressCount) {
    return (
      <Button
        onClick={() => {
          window
            .open("https://discord.com/invite/eJJRBqKd3d", "_blank")
            ?.focus();
        }}
        variant="orangeBg"
        // variant="assist"
        w={responsive.respWStr(140)}
        h={responsive.respWStr(40)}
        px={responsive.respWStr(42)}
        py={responsive.respWStr(20)}
        css={css`
          font-family: "PingFang SC";
          font-style: normal;
          font-weight: 500;
          font-size: ${fontSize.res_xs};
          line-height: ${responsive.respWStr(20)};
          /* color: #ee862b; */
        `}
      >
        加入Discord
      </Button>
    );
  }
  return (
    <Button
      onClick={() => {
        window.open("https://discord.com/invite/eJJRBqKd3d", "_blank")?.focus();
      }}
      // variant="assist"
      variant="orangeBg"
      w={responsive.respWStr(140)}
      h={responsive.respWStr(40)}
      px={responsive.respWStr(42)}
      py={responsive.respWStr(20)}
      css={css`
        font-family: "PingFang SC";
        font-style: normal;
        font-weight: 500;
        font-size: ${fontSize.res_xs};
        line-height: ${responsive.respWStr(20)};
        /* color: #ee862b; */
      `}
    >
      分享 Express
    </Button>
  );
};
