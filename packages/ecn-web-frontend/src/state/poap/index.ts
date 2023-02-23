import type { PayloadAction } from "@reduxjs/toolkit";
import { createAction, createSlice } from "@reduxjs/toolkit";
import { constants } from "ethers";
import { erc721ABI } from "wagmi";

import type { Tag, GalleryPoapItemType } from "../gallery/types";
import type { AppState } from "src/state/store";

//   typeName: "poap";
//   contractReadObj: Parameters < typeof useContractRead > [0];
// eventId: number;
//   homeTags: Tag[];
//   detailTags: Tag[];
//   itemText: string[] | null;
//   imgSrc: string;
//   imgAlt: string;
//   title: string;
//   desc: string;
//   btnTxt: string;
//   id: number;
//   key: string;
//   status: "coming soon" | "ongoing" | null;
//   chainId: number;
//   imageLinks: string[] | null;
//   videoLinks: string[] | null;
//   infoDetail?: DetailInfoType;
//   mainViewType: MainViewType;

export type PoapState = {
  loaded: boolean;
} & GalleryPoapItemType;

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
  videoLinks: null,
  infoDetail: null,
  mainViewType: "image",
  typeName: "poap",
  eventId: -1,

  contractReadObj: {
    addressOrName: constants.AddressZero,
    chainId: -1,
    contractInterface: erc721ABI,
    functionName: "balanceOf",
    args: [constants.AddressZero],
  },

  nftDeliveryData: null,
  onShelf: true,
  //   infoDetail?: Prisma.JsonValue,
} as PoapState;

export const poapSlice = createSlice({
  name: "poap",
  initialState: initialDummyState,
  reducers: {
    update: (state, action: PayloadAction<Partial<PoapState>>) => {
      return { ...state, ...action.payload } as PoapState;
    },
  },
});

const fetchPoapDetails = createAction<{
  ethAddress: string | undefined;
  id: number;
  chainId: number | undefined;
}>(`${poapSlice.name}/fetchPoapDetails`);

const sagaActions = {
  fetchPoapDetails,
};

const selectPoap = (state: AppState) => state.poap;
const selectors = {
  selectPoap,
};

const { actions } = poapSlice;

export default poapSlice.reducer;

export { actions, selectors, sagaActions };
