import {
  createAuthenticationAdapter,
  RainbowKitAuthenticationProvider,
} from "@rainbow-me/rainbowkit";
import type React from "react";
import { useCallback, useMemo } from "react";
import { SiweMessage } from "siwe";
import { useAccount, useNetwork } from "wagmi";

import type { TsetAuthPayload } from "../state/global";
import {
  actions as globalActions,
  selectors as globalSelectors,
} from "../state/global";
import { ecnApiClient } from "@/apis";
import { useAppSelector, useAppDispatch } from "@/state/reduxHooks";

const WRONG_NONCE = "wrong-nonce";

export const useAuthAdapter = ({
  setAuthInfo,
  connectedChainId,
  connectedAddress,
}: {
  setAuthInfo: (payload: TsetAuthPayload) => void;
  connectedAddress: string | undefined;
  connectedChainId: number | undefined;
}) => {
  const autAdapter = useMemo(() => {
    // console.log("window.location.host", window.location.host);

    return createAuthenticationAdapter({
      getNonce: async () => {
        const { success, nonce } = await ecnApiClient.authNonce({
          data: {},
        });
        if (!success) throw Error("cannot get nonce");
        return nonce || WRONG_NONCE;
      },
      createMessage: ({ nonce, address, chainId }) => {
        // currentChainId = chainId;
        // currentAddress = address;
        return new SiweMessage({
          domain: window.location.host,
          address,
          statement: "Sign in with Ethereum to the ecn app.",
          uri: window.location.origin,
          version: "1",
          chainId,
          nonce,
        });
      },
      getMessageBody: ({ message }) => {
        return message.prepareMessage();
      },
      verify: async ({ message, signature }) => {
        setAuthInfo({
          address: connectedAddress,
          chainId: connectedChainId,
          accessToken: null,
          auth_status: "loading",
        });
        const { success, access_token: accessToken } =
          await ecnApiClient.authVerify({
            data: {
              message: message.prepareMessage(),
              signature,
            },
          });
        // console.log("accessToken", accessToken);
        if (accessToken) {
          setAuthInfo({
            address: connectedAddress,
            chainId: connectedChainId,
            accessToken,
            auth_status: "authenticated",
          });
        } else {
          setAuthInfo({
            address: connectedAddress,
            chainId: connectedChainId,
            accessToken: null,
            auth_status: "unauthenticated",
          });
        }
        return Boolean(success);
      },
      signOut: async () => {
        setAuthInfo({
          address: connectedAddress,
          chainId: connectedChainId,
          accessToken: null,
          auth_status: "unauthenticated",
        });
      },
    });
  }, [connectedAddress, connectedChainId, setAuthInfo]);
  return {
    autAdapter,
  };
};

export const ECNRainbowKitAuthenticationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { address: connectedAddress } = useAccount();
  const { chain } = useNetwork();
  const connectedChainId = chain?.id;
  const authStatus = useAppSelector((state) =>
    globalSelectors.selectAuthStatus(state, {
      address: connectedAddress,
      chainId: connectedChainId,
    })
  );
  const dispatch = useAppDispatch();
  const setAuthInfo = useCallback(
    ({ accessToken, auth_status, address, chainId }: TsetAuthPayload) => {
      dispatch(
        globalActions.setAuth({ accessToken, auth_status, address, chainId })
      );
    },
    [dispatch]
  );
  const { autAdapter } = useAuthAdapter({
    setAuthInfo,
    connectedChainId,
    connectedAddress,
  });
  // console.log("authstatus", authStatus);
  return (
    <RainbowKitAuthenticationProvider adapter={autAdapter} status={authStatus}>
      {children}
    </RainbowKitAuthenticationProvider>
  );
};
