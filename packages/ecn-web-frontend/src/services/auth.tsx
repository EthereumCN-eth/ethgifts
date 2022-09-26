import {
  createAuthenticationAdapter,
  RainbowKitAuthenticationProvider,
} from "@rainbow-me/rainbowkit";
import React, { useCallback, useMemo } from "react";
import { SiweMessage } from "siwe";
import { ecnApiClient } from "src/apis";
import {
  actions as globalActions,
  selectors as globalSelectors,
  TsetAuthPayload,
} from "../state/global";
import { useAppSelector, useAppDispatch } from "src/state/reduxHooks";

const WRONG_NONCE: string = "wrong-nonce";

export const useAuthAdapter = ({
  setAuthInfo,
}: {
  setAuthInfo: (payload: TsetAuthPayload) => void;
}) => {
  const autAdapter = useMemo(() => {
    return createAuthenticationAdapter({
      getNonce: async () => {
        const { success, error, nonce } = await ecnApiClient.authNonce({
          data: {},
        });
        if (!success) throw "cannot get nonce";
        return nonce || WRONG_NONCE;
      },
      createMessage: ({ nonce, address, chainId }) => {
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
          access_token: null,
          auth_status: "loading",
        });
        const { success, access_token } = await ecnApiClient.authVerify({
          data: {
            message: message.prepareMessage(),
            signature,
          },
        });
        console.log("access_token", access_token);
        if (access_token) {
          setAuthInfo({
            access_token,
            auth_status: "authenticated",
          });
        } else {
          setAuthInfo({
            access_token: null,
            auth_status: "unauthenticated",
          });
        }
        return Boolean(success);
      },
      signOut: async () => {
        setAuthInfo({
          access_token: null,
          auth_status: "unauthenticated",
        });
      },
    });
  }, [setAuthInfo]);
  return {
    autAdapter,
  };
};

export const ECNRainbowKitAuthenticationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const authStatus = useAppSelector(globalSelectors.selectAuthStatus);
  const dispatch = useAppDispatch();
  const setAuthInfo = useCallback(
    ({ access_token, auth_status }: TsetAuthPayload) => {
      dispatch(globalActions.setAuth({ access_token, auth_status }));
    },
    [dispatch]
  );
  const { autAdapter } = useAuthAdapter({
    setAuthInfo,
  });
  console.log("authstatus", authStatus);
  return (
    <RainbowKitAuthenticationProvider adapter={autAdapter} status={authStatus}>
      {children}
    </RainbowKitAuthenticationProvider>
  );
};
