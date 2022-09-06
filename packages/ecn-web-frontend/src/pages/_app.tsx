import type { AppProps } from "next/app";
import { GlobalStyle } from "../styles/globals";
import { ThemeProvider } from "../styles/theme";
import store, { persistor } from "../state/store";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import dynamic from "next/dynamic";
import NoSSRWrapper from "src/state/NoSSRWrapper";
// const NoSSRWrapper = dynamic(() => import("../state/NoSSRWrapper"), {
//   ssr: false,
// });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NoSSRWrapper>
      <ReduxProvider store={store}>
        <PersistGate persistor={persistor}>
          <ThemeProvider>
            <GlobalStyle />
            <Component {...pageProps} />
          </ThemeProvider>
        </PersistGate>
      </ReduxProvider>
    </NoSSRWrapper>
  );
}

export default MyApp;
