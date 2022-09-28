import {
  createAuthenticationAdapter,
  RainbowKitAuthenticationProvider,
} from "@rainbow-me/rainbowkit";
import type React from "react";
import { useCallback, useMemo } from "react";
import { SiweMessage } from "siwe";

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
}: {
  setAuthInfo: (payload: TsetAuthPayload) => void;
}) => {
  const autAdapter = useMemo(() => {
    return createAuthenticationAdapter({
      getNonce: async () => {
        const { success, nonce } = await ecnApiClient.authNonce({
          data: {},
        });
        if (!success) throw Error("cannot get nonce");
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
          accessToken: null,
          auth_status: "loading",
        });
        const { success, accessToken } = await ecnApiClient.authVerify({
          data: {
            message: message.prepareMessage(),
            signature,
          },
        });
        // console.log("accessToken", accessToken);
        if (accessToken) {
          setAuthInfo({
            accessToken,
            auth_status: "authenticated",
          });
        } else {
          setAuthInfo({
            accessToken: null,
            auth_status: "unauthenticated",
          });
        }
        return Boolean(success);
      },
      signOut: async () => {
        setAuthInfo({
          accessToken: null,
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
    ({ accessToken, auth_status }: TsetAuthPayload) => {
      dispatch(globalActions.setAuth({ accessToken, auth_status }));
    },
    [dispatch]
  );
  const { autAdapter } = useAuthAdapter({
    setAuthInfo,
  });
  // console.log("authstatus", authStatus);
  return (
    <RainbowKitAuthenticationProvider adapter={autAdapter} status={authStatus}>
      {children}
    </RainbowKitAuthenticationProvider>
  );
};
