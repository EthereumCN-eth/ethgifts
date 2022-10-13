import type { PayloadAction } from "@reduxjs/toolkit";
import { createAction, createSlice } from "@reduxjs/toolkit";

import type { AppState } from "src/state/store";

import type { GalleryItemType, GalleryState } from "./types";

const initialState: GalleryState = {
  shellItemNumber: 8,
  galleryItems: [],
  loading: false,
  poapStatusLoading: false,
  poapEvents: [],
};

export const gallerySlice = createSlice({
  name: "gallery",
  initialState,
  reducers: {
    setGalleryItems: (state, action: PayloadAction<GalleryItemType[]>) => {
      return { ...state, galleryItems: action.payload };
    },
    update: (state, action: PayloadAction<Partial<GalleryState>>) => {
      return { ...state, ...action.payload };
    },
  },
});

const fetchGalleryItems = createAction<{
  address: string | undefined;
}>(`${gallerySlice.name}/fetchGalleryItems`);

const fetchNFTItemByContractId = createAction<{
  ethAddress: string;
  id: number;
}>(`${gallerySlice.name}/fetchNFTItemByContractId`);

const fetchPoapItemByContractId = createAction<{
  ethAddress: string;
  id: number;
}>(`${gallerySlice.name}/fetchPoapItemByContractId`);

const sagaActions = {
  fetchGalleryItems,
  fetchNFTItemByContractId,
  fetchPoapItemByContractId,
};

const selectGalleryItems = (state: AppState) => state.gallery.galleryItems;
const selectShellItemNumber = (state: AppState) =>
  state.gallery.shellItemNumber;
const selectLoading = (state: AppState) => state.gallery.loading;

const selectors = {
  selectGalleryItems,
  selectShellItemNumber,
  selectLoading,
};

const { actions } = gallerySlice;

export default gallerySlice.reducer;

export { actions, selectors, sagaActions };
