import {
  RainbowKitProvider,
  connectorsForWallets,
  wallet,
} from "@rainbow-me/rainbowkit";
import { DefaultSeo } from "next-seo";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { publicProvider } from "wagmi/providers/public";

import defaultSEOConfig from "../../next-seo.config";
import store, { persistor } from "../state/store";
// import NoSSRWrapper from "src/state/NoSSRWrapper";
import { AddressChangeLogout } from "@/components/AddressChangeLogout";
import { Chakra } from "@/components/Chakra";
import "@fontsource/red-rose";
import { useHeaderStore } from "@/components/Layouts/headerState";
import {
  NEXT_PUBLIC_ARBIT_ALCHEMY_HTTPS,
  NEXT_PUBLIC_ARBIT_ALCHEMY_WEBSOCKETS,
  NEXT_PUBLIC_MAIN_ALCHEMY_API_KEY,
} from "@/constants";
import { ECNRainbowKitAuthenticationProvider } from "@/services/auth";
import "@rainbow-me/rainbowkit/styles.css";

const { chains, provider } = configureChains(
  [chain.mainnet, chain.arbitrum],
  [
    alchemyProvider({ apiKey: NEXT_PUBLIC_MAIN_ALCHEMY_API_KEY }),
    jsonRpcProvider({
      rpc: (rpcchain) => {
        if (rpcchain.id !== chain.arbitrum.id) return null;
        return {
          http: NEXT_PUBLIC_ARBIT_ALCHEMY_HTTPS,
          webSocket: NEXT_PUBLIC_ARBIT_ALCHEMY_WEBSOCKETS,
        };
      },
    }),
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
  const rainbowTheme = useHeaderStore((state) => state.rainbowTheme);
  return (
    <ReduxProvider store={store}>
      <WagmiConfig client={wagmiClient}>
        <PersistGate persistor={persistor}>
          <ECNRainbowKitAuthenticationProvider>
            <RainbowKitProvider chains={chains} theme={rainbowTheme}>
              <Chakra>
                <Head>
                  <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
                  />
                </Head>
                <DefaultSeo {...defaultSEOConfig} />
                <AddressChangeLogout />

                <Component {...pageProps} />
              </Chakra>
            </RainbowKitProvider>
          </ECNRainbowKitAuthenticationProvider>
        </PersistGate>
      </WagmiConfig>
    </ReduxProvider>
  );
}

export default MyApp;
