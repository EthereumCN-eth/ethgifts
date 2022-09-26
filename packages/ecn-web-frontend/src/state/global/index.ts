import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "src/state/store";
import { AuthenticationStatus } from "@rainbow-me/rainbowkit";

export type TAuthToken = string | null;

export type TsetAuthPayload = {
  access_token: TAuthToken;
  auth_status: AuthenticationStatus;
};

export interface GlobalState {
  access_token: TAuthToken;
  auth_status: AuthenticationStatus;
}

const initialState: GlobalState = {
  access_token: null,
  auth_status: "unauthenticated",
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<TsetAuthPayload>) => {
      state.access_token = action.payload.access_token;
      state.auth_status = action.payload.auth_status;
    },
  },
});

const selectAuthStatus = (state: AppState) => state.global.auth_status;

const selectors = {
  selectAuthStatus,
};

const actions = globalSlice.actions;

export default globalSlice.reducer;

export { actions, selectors };
