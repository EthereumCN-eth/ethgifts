import { css, keyframes } from "@emotion/react";

const ripple2 = keyframes`
  0% {
    /* opacity: 0; */
    transform: translate(-50%, -50%) scale(0.8);
  }
  20% {
    transform: translate(-50%, -50%) scale(1);
  }
  40% {
    transform: translate(-50%, -50%) scale(1);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.8);
  }
`;
const ripple = keyframes`
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.1);
  }
  50% {
    opacity: 0.6;
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(1);
  }

`;

export const LiveAnimate = () => {
  return (
    <div
      css={css`
        width: 18px;
        height: 18px;
        position: relative;
        background: transparent;
      `}
    >
      <div
        css={css`
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background-color: #ee862b;
          top: 50%;
          left: 50%;
          opacity: 0;
          animation: ${ripple} 1.6s ease-out infinite;
        `}
      />
      <div
        css={css`
          position: absolute;
          width: 7.2px;
          height: 7.2px;
          background-color: #ee862b;
          border-radius: 50%;
          top: 50%;
          left: 50%;
          animation: ${ripple2} 1.6s linear infinite alternate;
        `}
      />
    </div>
  );
};
