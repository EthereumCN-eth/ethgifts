import type { PayloadAction } from "@reduxjs/toolkit";
import { createAction, createSlice } from "@reduxjs/toolkit";
import { constants } from "ethers";
import { erc721ABI } from "wagmi";

import type { GalleryNFTItemType, Tag } from "../gallery/types";
import type { AppState } from "src/state/store";

export type NFTState = {
  loaded: boolean;
} & GalleryNFTItemType;

const initialDummyState = {
  loaded: false,
  homeTags: [] as Tag[],
  detailTags: [] as Tag[],
  itemText: [""],
  imgSrc: "",
  imgAlt: "",
  title: "",
  desc: "",
  btnTxt: "",
  id: -1,
  key: "",
  status: null,
  chainId: -1,
  imageLinks: null,
  typeName: "nft",
  contractAddress: constants.AddressZero,
  nftAppType: "PERSENT",
  contractReadObj: {
    addressOrName: constants.AddressZero,
    chainId: -1,
    contractInterface: erc721ABI,
    functionName: "balanceOf",
    args: [constants.AddressZero],
  },
  mainViewType: "image",
  videoLinks: [],
  nftDeliveryData: null,
  onShelf: true,
  //   infoDetail?: Prisma.JsonValue,
} as NFTState;

export const nftSlice = createSlice({
  name: "nft",
  initialState: initialDummyState,
  reducers: {
    update: (state, action: PayloadAction<Partial<NFTState>>) => {
      return { ...state, ...action.payload } as NFTState;
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
