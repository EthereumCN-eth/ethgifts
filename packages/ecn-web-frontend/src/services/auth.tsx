import {
  AuthenticationStatus,
  createAuthenticationAdapter,
} from "@rainbow-me/rainbowkit";
import { useEffect, useMemo, useState } from "react";
import { SiweMessage } from "siwe";
import { ecnApiClient } from "src/apis";

const WRONG_NONCE: string = "wrong-nonce";

export const useAuthAdapter = () => {
  const [authstatus, setAuthStatus] =
    useState<AuthenticationStatus>("unauthenticated");
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
        setAuthStatus("loading");
        const { success, access_token } = await ecnApiClient.authVerify({
          data: {
            message: message.prepareMessage(),
            signature,
          },
        });
        console.log("access_token", access_token);
        if (access_token) setAuthStatus("authenticated");
        else setAuthStatus("unauthenticated");
        return Boolean(success);
      },
      signOut: async () => {
        setAuthStatus("unauthenticated");
      },
    });
  }, []);
  return {
    authstatus,
    autAdapter,
  };
};
