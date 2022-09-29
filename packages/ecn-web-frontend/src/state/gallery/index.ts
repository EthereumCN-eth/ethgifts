import type { PayloadAction } from "@reduxjs/toolkit";
import { createAction, createSlice } from "@reduxjs/toolkit";

import type { AppState } from "src/state/store";

import type { GalleryItemType, GalleryState } from "./types";

// const dummyGalleryItems = [
//   {
//     tags: [
//       { label: "SBT", variant: "whiteText" },
//       { label: "Ongoing", variant: "whiteBg" },
//     ],
//     imgSrc:
//       "https://scene7.zumiez.com/is/image/zumiez/product_main_medium/Toy-Machine-Monster-Sticker-_322489-front-US.jpg",
//     imgAlt: "toy",
//     title: "E群志初级SBT1",
//     desc: "2022年9月",
//     btnTxt: "查看SBT及相关活动",
//   },
// ];

const initialState: GalleryState = {
  shellItemNumber: 8,
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
    update: (state, action: PayloadAction<Partial<GalleryState>>) => {
      return { ...state, ...action.payload };
    },
  },
});

const fetchGalleryItems = createAction(
  `${gallerySlice.name}/fetchGalleryItems`
);
const sagaActions = {
  fetchGalleryItems,
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
