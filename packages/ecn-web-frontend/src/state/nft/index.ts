import type { PayloadAction } from "@reduxjs/toolkit";
import { createAction, createSlice } from "@reduxjs/toolkit";

import type { GalleryNFTItemType } from "../gallery/types";
import type { AppState } from "src/state/store";

type NFTState =
  | ({
      loaded: boolean;
    } & GalleryNFTItemType)
  | null;

const initialState = null as NFTState;

export const nftSlice = createSlice({
  name: "nft",
  initialState,
  reducers: {
    update: (
      state,
      action: PayloadAction<
        | GalleryNFTItemType
        | { loaded: boolean }
        | ({
            loaded: boolean;
          } & GalleryNFTItemType)
      >
    ) => {
      if (state) {
        return {
          ...state,
          ...action.payload,
        };
      } else {
        return action.payload as {
          loaded: boolean;
        } & GalleryNFTItemType;
      }
    },
  },
});

const fetchNFTDetails = createAction<{
  ethAddress: string | undefined;
  id: number;
  chainId: number | undefined;
}>(`${nftSlice.name}/fetchNFTDetails`);

const sagaActions = {
  fetchNFTDetails,
};

const selectNFT = (state: AppState) => state.nft;
const selectors = {
  selectNFT,
};

const { actions } = nftSlice;

export default nftSlice.reducer;

export { actions, selectors, sagaActions };
