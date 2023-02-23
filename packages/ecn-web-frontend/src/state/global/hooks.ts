import { useEffect } from "react";
import { useAccount, useNetwork } from "wagmi";

import {
  selectors as globalSelectors,
  actions as globalActions,
} from "@/state/global";
import { useAppSelector, useAppDispatch } from "@/state/reduxHooks";

import { AUTO_LOGOUT_DURATION } from "./constants";

// const TWO_MONTH_TIMESTAMP = 60 * 5 * 1000;

export const useIsAuth = () => {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const authStatus = useAppSelector((state) =>
    globalSelectors.selectAuthStatus(state, { address, chainId: chain?.id })
  );
  return authStatus === "authenticated";
};

export const useAutoLogoutExpiredJWT = () => {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const authStatus = useAppSelector((state) =>
    globalSelectors.selectAuthStatus(state, { address, chainId: chain?.id })
  );
  const timestamp = useAppSelector((state) =>
    globalSelectors.selectAuthTimestamp(state, { address, chainId: chain?.id })
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    const nowtime = Date.now();
    if (
      authStatus === "authenticated" &&
      timestamp &&
      nowtime - timestamp > AUTO_LOGOUT_DURATION
    ) {
      dispatch(
        globalActions.logout({
          address,
          chainId: chain?.id,
        })
      );
    }
  }, [address, authStatus, chain?.id, dispatch, timestamp]);
};
