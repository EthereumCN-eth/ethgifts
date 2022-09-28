import type { PayloadAction } from "@reduxjs/toolkit";
import { createAction, createSlice } from "@reduxjs/toolkit";

import type { AppState } from "src/state/store";

type Tag = {
  label: string;
  variant: string;
};

export type GalleryItemType = {
  tags: Tag[];
  imgSrc: string;
  imgAlt: string;
  title: string;
  desc: string;
  btnTxt: string;
};

export type GalleryState = {
  galleryItems: GalleryItemType[];
  loading: boolean;
};

const initialState: GalleryState = {
  galleryItems: [],
  loading: false,
};

export const gallerySlice = createSlice({
  name: "gallery",
  initialState,
  reducers: {
    setGalleryItems: (state, action: PayloadAction<GalleryItemType[]>) => {
      state.galleryItems = action.payload;
    },
  },
});

const fetchGalleryItems = createAction(
  `${gallerySlice.name}/fetchGalleryItems`
);
const sagaActions = {
  fetchGalleryItems,
};

const selectAuthStatus = (state: AppState) => state.global.auth_status;

const selectors = {
  selectAuthStatus,
};

const { actions } = gallerySlice;

export default gallerySlice.reducer;

export { actions, selectors, sagaActions };
