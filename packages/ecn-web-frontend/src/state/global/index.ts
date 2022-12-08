import type { AuthenticationStatus } from "@rainbow-me/rainbowkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import type { AppState } from "src/state/store";

export type TAuthToken = string | null;

export type TsetAuthPayload = {
  accessToken: TAuthToken;
  auth_status: AuthenticationStatus;
  address: string | undefined;
  chainId: number | undefined;
  // timestamp: number | null;
};

export interface GlobalState {
  [addressAndChain: string]: {
    accessToken: TAuthToken;
    auth_status: AuthenticationStatus;
    timestamp: number | null;
  };
}

// control storage version
const GLOBAL_PERSIST_VERSION = 1;

const initialState: GlobalState = {};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<TsetAuthPayload>) => {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { accessToken, address, auth_status, chainId } = action.payload;
      if (!address || !chainId) return state;
      if (auth_status === "unauthenticated") {
        return {
          ...state,
          [`${GLOBAL_PERSIST_VERSION}-${address.toLowerCase().trim()}`]: {
            accessToken,
            auth_status,
            timestamp: null,
          },
        };
      }
      return {
        ...state,
        // [`${address.toLowerCase().trim()}-${chainId}`]: {
        [`${GLOBAL_PERSIST_VERSION}-${address.toLowerCase().trim()}`]: {
          accessToken,
          auth_status,
          timestamp: Date.now(),
        },
      };
    },
    logout: (
      state,
      action: PayloadAction<{
        address: string | undefined;
        chainId: number | undefined;
      }>
    ) => {
      const { address, chainId } = action.payload;
      if (!address || !chainId) return state;
      return {
        ...state,
        // [`${address.toLowerCase().trim()}-${chainId}`]: {
        [`${GLOBAL_PERSIST_VERSION}-${address.toLowerCase().trim()}`]: {
          accessToken: null,
          auth_status: "unauthenticated",
          timestamp: null,
        },
      };
    },
  },
});

const selectAuthStatus = (
  state: AppState,
  {
    address,
    chainId,
  }: {
    address: string | undefined;
    chainId: number | undefined;
  }
) => {
  if (address && chainId) {
    // const obj = state.global[`${address.toLowerCase().trim()}-${chainId}`];
    const obj =
      state.global[`${GLOBAL_PERSIST_VERSION}-${address.toLowerCase().trim()}`];
    if (obj) {
      return obj.auth_status;
    }
  }
  return "unauthenticated";
};
const selectAccessToken = (
  state: AppState,
  {
    address,
    chainId,
  }: {
    address: string | undefined;
    chainId: number | undefined;
  }
) => {
  if (address && chainId) {
    const obj =
      state.global[`${GLOBAL_PERSIST_VERSION}-${address.toLowerCase().trim()}`];
    if (obj) {
      return obj.accessToken;
    }
  }
  return null;
};

const selectAuthTimestamp = (
  state: AppState,
  {
    address,
    chainId,
  }: {
    address: string | undefined;
    chainId: number | undefined;
  }
) => {
  if (address && chainId) {
    const obj =
      state.global[`${GLOBAL_PERSIST_VERSION}-${address.toLowerCase().trim()}`];
    if (obj) {
      return obj.timestamp;
    }
  }
  return null;
};

const selectors = {
  selectAuthStatus,
  selectAccessToken,
  selectAuthTimestamp,
};

const { actions } = globalSlice;

export default globalSlice.reducer;

export { actions, selectors };
