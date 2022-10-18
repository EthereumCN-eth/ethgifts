import type { SBTSignatureRecord } from "@prisma/client";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createAction, createSlice } from "@reduxjs/toolkit";

import type { GallerySBTItemType, Tag } from "../gallery/types";
import type { AppState } from "src/state/store";

export interface SBTState {
  loaded: boolean;
  sbtLevel: number[];
  expressCount: number | null;
  status: "coming soon" | "ongoing" | null;
  chainId: number | null;
  records: SBTSignatureRecord[] | null;
  artworks: string[];
  itemTexts: string[] | null;
  detailTags: Tag[];
}

const initialState: SBTState = {
  loaded: false,
  sbtLevel: [],
  expressCount: 0,
  status: null,
  chainId: null,
  records: [],
  artworks: [],
  itemTexts: [],
  detailTags: [],
};

export const sbtSlice = createSlice({
  name: "sbt",
  initialState,
  reducers: {
    update: (state, action: PayloadAction<Partial<SBTState>>) => {
      return { ...state, ...action.payload };
    },
    // setAuth: (state, action: PayloadAction<TsetAuthPayload>) => {
    //   state.accessToken = action.payload.accessToken;
    //   state.auth_status = action.payload.auth_status;
    // },
  },
});
const fetchSBTDetails = createAction<{
  ethAddress: string | undefined;
  id: number;
}>(`${sbtSlice.name}/fetchSBTDetails`);

const sagaActions = {
  fetchSBTDetails,
};

const selectSBTLevels = (state: AppState, id: number) =>
  (state.gallery.galleryItems.filter(
    (i) => i.typeName === "sbt" && i.id === id
  ) as GallerySBTItemType[]) || [];

const selectAll = (state: AppState) => state.sbt;

const selectors = {
  selectSBTLevels,
  selectAll,
};

const { actions } = sbtSlice;

export default sbtSlice.reducer;

export { actions, selectors, sagaActions };
