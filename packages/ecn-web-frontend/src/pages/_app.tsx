import type { AppProps } from "next/app";
import { GlobalStyle } from "../styles/globals";
import { ThemeProvider } from "../styles/theme";
import store, { persistor } from "../state/store";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import dynamic from "next/dynamic";
// import NoSSRWrapper from "src/state/NoSSRWrapper";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";

import { connectorsForWallets, wallet } from "@rainbow-me/rainbowkit";

const NoSSRWrapper = dynamic(() => import("../state/NoSSRWrapper"), {
  ssr: false,
});

const { chains, provider } = configureChains(
  [chain.mainnet, chain.optimism, chain.arbitrum],
  [
    infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURA_API_KEY }),
    publicProvider(),
  ]
);

// const { connectors } = getDefaultWallets({
//   appName: "ECN App",
//   chains,
// });
const connectors = connectorsForWallets([
  {
    groupName: "Recommended",
    wallets: [
      wallet.rainbow({ chains }),
      wallet.metaMask({ chains }),
      wallet.imToken({
        chains,
      }),
      wallet.trust({ chains }),
      wallet.walletConnect({ chains }),

      wallet.coinbase({ chains, appName: "My RainbowKit App" }),
    ],
  },
  // {
  //   // groupName: "Others",
  //   wallets: [],
  // },
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NoSSRWrapper>
      <ReduxProvider store={store}>
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider chains={chains} modalSize="compact">
            <PersistGate persistor={persistor}>
              <ThemeProvider>
                <GlobalStyle />
                <Component {...pageProps} />
              </ThemeProvider>
            </PersistGate>
          </RainbowKitProvider>
        </WagmiConfig>
      </ReduxProvider>
    </NoSSRWrapper>
  );
}

export default MyApp;
