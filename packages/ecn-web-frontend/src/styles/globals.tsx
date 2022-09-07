import { Global, css } from "@emotion/react";

const breakpoints = [576, 768, 992, 1500];
const mq = breakpoints.map((bp) => `@media (max-width: ${bp}px)`);

const GlobalStyle = () => {
  return (
    <Global
      styles={css`
        body {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          box-sizing: inherit;
          font: inherit;
        }

        /* Remove excess padding and border in Firefox 4+ */
        &::-moz-focus-inner {
          border: 0;
          padding: 0;
        }

        button {
          background: transparent;
          /* inherit font & color from ancestor */
          color: inherit;
          font: inherit;
          border: none;

          /* Corrects font smoothing for webkit */
          -webkit-font-smoothing: inherit;
          -moz-osx-font-smoothing: inherit;

          -webkit-appearance: none;
        }

        /* @font-face {
          font-family: "FTG";
          src: url("/FrederickatheGreat-Regular.ttf");
          font-style: normal;
          font-display: swap;
        }
        @font-face {
          font-family: "Meta";
          src: url("/Metamorphous-Regular.ttf");
          font-style: normal;
          font-display: swap;
        }
        @font-face {
          font-family: "Neuton";
          src: url("/Neuton-Bold.ttf");
          font-style: normal;
          font-display: swap;
        } */
        /* @font-face {
          font-family: "Cabin";
          src: url("/Cabin-Regular.ttf");
          font-style: normal;
          font-display: swap;
        }
        @font-face {
          font-family: "Goldman";
          src: url("/Goldman-Regular.ttf");
          font-style: normal;
          font-display: swap;
        }
        @font-face {
          font-family: "KH";
          src: url("/Khyay-Regular.ttf");
          font-style: normal;
          font-display: swap;
        }
        @font-face {
          font-family: "Poppins";
          src: url("/Poppins-Regular.ttf");
          font-style: normal;
          font-display: swap;
        }
        @font-face {
          font-family: "Poppins-Bold";
          src: url("/Poppins-Bold.ttf");
          font-style: normal;
          font-display: swap;
        }
        @font-face {
          font-family: "PTSansCaption";
          src: url("/PTSansCaption-Regular.ttf");
          font-style: normal;
          font-display: swap;
        } */
      `}
    />
  );
};

export { GlobalStyle };
