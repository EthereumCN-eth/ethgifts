import type { SBTSignatureRecord, SignaturePayload } from "@prisma/client";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createAction, createSlice } from "@reduxjs/toolkit";
import { constants } from "ethers";
import type { useContractRead } from "wagmi";
import { erc721ABI } from "wagmi";

import type { GallerySBTItemType, Tag } from "../gallery/types";
import type { AppState } from "src/state/store";

export interface SBTState {
  loaded: boolean;
  sbtLevel: number[];
  expressCount: number | null;
  status: "coming soon" | "ongoing" | null;
  chainId: number;
  records:
    | (SBTSignatureRecord & {
        signaturePayload: SignaturePayload;
      })[]
    | null;
  artworks: string[];
  itemTexts: string[] | null;
  detailTags: Tag[];
  contractAddress: string;
  issuerAddress: string;
  sbtTitle: string;
  contractReadObj: Parameters<typeof useContractRead>[0];
}

export const initialState: SBTState = {
  loaded: false,
  sbtLevel: [],
  expressCount: 0,
  status: null,
  chainId: 0,
  records: null,
  artworks: [],
  itemTexts: [],
  detailTags: [],
  contractAddress: constants.AddressZero,
  issuerAddress: "",
  sbtTitle: "",
  contractReadObj: {
    addressOrName: constants.AddressZero,
    chainId: -1,
    contractInterface: erc721ABI,
    functionName: "balanceOf",
    args: [constants.AddressZero],
  },
};

export const sbtSlice = createSlice({
  name: "sbt",
  initialState,
  reducers: {
    update: (state, action: PayloadAction<Partial<SBTState>>) => {
      return { ...state, ...action.payload };
    },
  },
});
const fetchSBTDetails = createAction<{
  ethAddress: string | undefined;
  id: number;
  chainId: number | undefined;
}>(`${sbtSlice.name}/fetchSBTDetails`);

const sagaActions = {
  fetchSBTDetails,
};

const selectSBTLevels = (state: AppState, id: number) =>
  (state.gallery.galleryItems.filter(
    (i) => i.typeName === "sbt" && i.id === id
  ) as GallerySBTItemType[]) || [];

const selectAll = (state: AppState) => state.sbt;

const selectVCStr = (state: AppState, index: number) => {
  const record =
    state.sbt.records?.filter(
      (rec) => rec.signaturePayload.expressCount === state.sbt.sbtLevel[index]
    )[0] || null;
  return record?.signedVC;
};

const selectors = {
  selectSBTLevels,
  selectAll,
  selectVCStr,
};

const { actions } = sbtSlice;

export default sbtSlice.reducer;

export { actions, selectors, sagaActions };
