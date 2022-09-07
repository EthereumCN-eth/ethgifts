import { css } from "@emotion/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Header = () => {
  return (
    <div
      css={css`
        width: 100%;
        display: flex;
      `}
    >
      <div
        css={css`
          margin-left: auto;
          margin-right: 70px;
          margin-top: 59px;
        `}
      >
        <ConnectButton chainStatus="icon" accountStatus="avatar" />
      </div>
    </div>
  );
};
export { Header };
