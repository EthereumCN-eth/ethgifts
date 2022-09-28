import type { AuthenticationStatus } from "@rainbow-me/rainbowkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import type { AppState } from "src/state/store";

export type TAuthToken = string | null;

export type TsetAuthPayload = {
  accessToken: TAuthToken;
  auth_status: AuthenticationStatus;
};

export interface GlobalState {
  accessToken: TAuthToken;
  auth_status: AuthenticationStatus;
}

const initialState: GlobalState = {
  accessToken: null,
  auth_status: "unauthenticated",
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<TsetAuthPayload>) => {
      state.accessToken = action.payload.accessToken;
      state.auth_status = action.payload.auth_status;
    },
  },
});

const selectAuthStatus = (state: AppState) => state.global.auth_status;

const selectors = {
  selectAuthStatus,
};

const { actions } = globalSlice;

export default globalSlice.reducer;

export { actions, selectors };
