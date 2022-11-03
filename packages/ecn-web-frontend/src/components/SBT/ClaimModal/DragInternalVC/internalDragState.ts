import create from "zustand";

import type { SBTState } from "@/state/sbt";
import { initialState as sbtInitalState } from "@/state/sbt";

interface InternalDragState {
  levelIndexs: number[];
  init: (
    levels: number[],
    selectedIndex: number,
    sbtReduxState: SBTState,
    claimedSbtIndexed: number[]
  ) => void;
  selectedIndex: number;
  uiLoaded: boolean;
  leftDisabled: boolean;
  rightDisabled: boolean;
  sbtReduxState: SBTState;
  dropped: boolean[];
  clickNext: () => void;
  clickPre: () => void;
  clickLevel: (index: number) => void;
  setDrop: (drop: boolean, index: number) => void;
  reset: () => void;

  computed: typeof computed;
  claimed: boolean[];
}

const initState = {
  levelIndexs: [],
  selectedIndex: 0,
  uiLoaded: false,
  sbtReduxState: sbtInitalState,
  leftDisabled: true,
  rightDisabled: true,
  dropped: [],
  claimed: [],
};

const computed = {
  // yes, just use a nested object, which can be easily used in `Object.assign`
  selectedArtwork: (state: InternalDragState) =>
    state.sbtReduxState.artworks[state.selectedIndex],
  selectedRecord: (state: InternalDragState) =>
    state.sbtReduxState.records?.filter(
      (rec) =>
        rec.signaturePayload.expressCount ===
        state.sbtReduxState.sbtLevel[state.selectedIndex]
    )[0] || null,
  selectedSBTTitle: (state: InternalDragState) => state.sbtReduxState.sbtTitle,
  selectedDropped: (state: InternalDragState) =>
    state.dropped[state.selectedIndex],
};

export const useInternalDragState = create<InternalDragState>()((set) => ({
  ...initState,
  computed,
  reset: () => set(() => initState),
  init: (levels, selectedIndex, sbtReduxState, claimedSbtIndexed) =>
    set(() => {
      const leftDisabled = selectedIndex === 0;
      const rightDisabled = levels.length - 1 === selectedIndex;
      const claimed = levels.map((ind) => claimedSbtIndexed.includes(ind));
      const dropped = levels.map(() => false);

      return {
        levelIndexs: levels,
        selectedIndex,
        uiLoaded: true,
        leftDisabled,
        rightDisabled,
        sbtReduxState,
        claimed,
        dropped,
      };
    }),
  setDrop: (drop: boolean, index: number) =>
    set((state) => {
      const cloneDropped = [...state.dropped];
      cloneDropped[index] = drop;
      return {
        dropped: cloneDropped,
      };
    }),
  clickNext: () =>
    set((state) => {
      const rightDisabled =
        state.selectedIndex + 1 === state.levelIndexs.length - 1;
      const leftDisabled = false;

      return {
        leftDisabled,
        rightDisabled,
        selectedIndex: state.selectedIndex + 1,
      };
    }),
  clickPre: () =>
    set((state) => {
      const rightDisabled = false;
      const leftDisabled = state.selectedIndex - 1 === 0;

      return {
        leftDisabled,
        rightDisabled,
        selectedIndex: state.selectedIndex - 1,
      };
    }),
  clickLevel: (index: number) =>
    set((state) => {
      const rightDisabled = index === state.levelIndexs.length - 1;
      const leftDisabled = index === 0;
      return {
        selectedIndex: index,
        leftDisabled,
        rightDisabled,
      };
    }),
}));
