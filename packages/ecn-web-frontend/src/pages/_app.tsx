import {
  RainbowKitProvider,
  lightTheme,
  connectorsForWallets,
  wallet,
} from "@rainbow-me/rainbowkit";
import { DefaultSeo } from "next-seo";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import Head from "next/head";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { infuraProvider } from "wagmi/providers/infura";

import defaultSEOConfig from "../../next-seo.config";
import store, { persistor } from "../state/store";
// import NoSSRWrapper from "src/state/NoSSRWrapper";
import { Chakra } from "@/components/Chakra";
import "@fontsource/red-rose";
import { Layout } from "@/components/Layouts/Layout";
import { ECNRainbowKitAuthenticationProvider } from "@/services/auth";

const NoSSRWrapper = dynamic(() => import("../components/NoSSRWrapper"), {
  ssr: false,
});

const { chains, provider } = configureChains(
  [chain.mainnet, chain.optimism, chain.arbitrum],
  [
    infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURA_API_KEY }),
    // publicProvider(),
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
      // wallet.walletConnect({ chains }),

      wallet.coinbase({ chains, appName: "ETHGifts" }),
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
          <ECNRainbowKitAuthenticationProvider>
            <RainbowKitProvider
              chains={chains}
              theme={lightTheme({
                accentColor: "white",
                accentColorForeground: "black",
                borderRadius: "large",
                fontStack: "system",
              })}
            >
              <PersistGate persistor={persistor}>
                <Chakra>
                  <Head>
                    <meta
                      name="viewport"
                      content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
                    />
                  </Head>
                  <DefaultSeo {...defaultSEOConfig} />
                  <Layout>
                    <Component {...pageProps} />
                  </Layout>
                </Chakra>
              </PersistGate>
            </RainbowKitProvider>
          </ECNRainbowKitAuthenticationProvider>
        </WagmiConfig>
      </ReduxProvider>
    </NoSSRWrapper>
  );
}

export default MyApp;
