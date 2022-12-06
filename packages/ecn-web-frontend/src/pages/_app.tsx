import {
  RainbowKitProvider,
  connectorsForWallets,
  wallet,
} from "@rainbow-me/rainbowkit";
import { QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

// import { publicProvider } from "wagmi/providers/public";
import { apiQueryClient } from "../services/queryClient";
import store, { persistor } from "../state/store";
// import NoSSRWrapper from "src/state/NoSSRWrapper";
import { AddressOrNetworkChange } from "@/components/AddressOrNetworkChange";
import { Chakra } from "@/components/Chakra";
import "@fontsource/red-rose";
import "@fontsource/megrim";
import "@fontsource/noto-sans/600.css";
import { useHeaderStore } from "@/components/Layouts/Header/headerState";
import { NextSeoData } from "@/components/NextSeoDefault";
import {
  NEXT_PUBLIC_ARBIT_ALCHEMY_HTTPS,
  NEXT_PUBLIC_ARBIT_ALCHEMY_WEBSOCKETS,
  NEXT_PUBLIC_MAIN_ALCHEMY_API_KEY,
  NEXT_PUBLIC_GOERLI_ALCHEMY_HTTPS,
  NEXT_PUBLIC_GOERLI_ALCHEMY_WEBSOCKETS,
  NEXT_PUBLIC_OPTIMISM_ALCHEMY_HTTPS,
  NEXT_PUBLIC_OPTIMISM_ALCHEMY_WEBSOCKETS,
  NEXT_PUBLIC_MAIN_ALCHEMY_HTTPS,
  NEXT_PUBLIC_MAIN_ALCHEMY_WEBSOCKETS,
} from "@/constants";
import { ECNRainbowKitAuthenticationProvider } from "@/services/auth";
import "@rainbow-me/rainbowkit/styles.css";
import "@/components/shared/ZoomImageWrapper/styles.css";
import { useGoogleAnalyticsPageViewTrack } from "@/services/googleAnalytics/hooks";

const { chains, provider } = configureChains(
  [chain.mainnet, chain.arbitrum, chain.optimism, chain.goerli],
  [
    alchemyProvider({ apiKey: NEXT_PUBLIC_MAIN_ALCHEMY_API_KEY }),
    jsonRpcProvider({
      rpc: (rpcchain) => {
        if (rpcchain.id === chain.arbitrum.id) {
          return {
            http: NEXT_PUBLIC_ARBIT_ALCHEMY_HTTPS,
            webSocket: NEXT_PUBLIC_ARBIT_ALCHEMY_WEBSOCKETS,
          };
        } else if (rpcchain.id === chain.goerli.id) {
          // console.log(
          //   NEXT_PUBLIC_GOERLI_ALCHEMY_HTTPS,
          //   "NEXT_PUBLIC_GOERLI_ALCHEMY_HTTPS"
          // );
          return {
            http: NEXT_PUBLIC_GOERLI_ALCHEMY_HTTPS,
            webSocket: NEXT_PUBLIC_GOERLI_ALCHEMY_WEBSOCKETS,
          };
        } else if (rpcchain.id === chain.optimism.id) {
          return {
            http: NEXT_PUBLIC_OPTIMISM_ALCHEMY_HTTPS,
            webSocket: NEXT_PUBLIC_OPTIMISM_ALCHEMY_WEBSOCKETS,
          };
        } else if (rpcchain.id === chain.mainnet.id) {
          return {
            http: NEXT_PUBLIC_MAIN_ALCHEMY_HTTPS,
            webSocket: NEXT_PUBLIC_MAIN_ALCHEMY_WEBSOCKETS,
          };
        }
        return null;
      },
    }),
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
  const rainbowTheme = useHeaderStore((state) => state.rainbowTheme);
  useGoogleAnalyticsPageViewTrack();
  return (
    <>
      <NextSeoData />
      <ReduxProvider store={store}>
        <WagmiConfig client={wagmiClient}>
          <PersistGate persistor={persistor}>
            <ECNRainbowKitAuthenticationProvider>
              <RainbowKitProvider chains={chains} theme={rainbowTheme}>
                <Chakra>
                  <AddressOrNetworkChange />
                  <QueryClientProvider client={apiQueryClient}>
                    <Component {...pageProps} />
                  </QueryClientProvider>
                </Chakra>
              </RainbowKitProvider>
            </ECNRainbowKitAuthenticationProvider>
          </PersistGate>
        </WagmiConfig>
      </ReduxProvider>
    </>
  );
}

export default MyApp;
