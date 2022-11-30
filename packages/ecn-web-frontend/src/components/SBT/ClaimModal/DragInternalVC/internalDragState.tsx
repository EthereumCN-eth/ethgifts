import { Text } from "@chakra-ui/react";
import type { ReactNode } from "react";
import create from "zustand";

import type { SBTState } from "@/state/sbt";
import { initialState as sbtInitalState } from "@/state/sbt";

interface InternalDragState {
  levelIndexs: number[];
  setDropTargetX: (dropTargetXVal: number) => void;
  setDragX: (dragXVal: number) => void;
  syncClaimLevels: (claimedSbtIndexed: number[]) => void;
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
  dropped: Array<{
    drop: boolean;
    // verified: boolean;
  }>;
  clickNext: () => void;
  clickPre: () => void;
  clickLevel: (index: number) => void;
  setDrop: (drop: boolean, index: number) => void;
  reset: (claimed?: boolean) => void;

  computed: typeof computed;
  claimed: boolean[];
  dropTargetX: number;
  dragX: number;

  setClaimingHint: ({ claimingHint }: { claimingHint: ReactNode }) => void;
  claimingHint: ReactNode;
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
  dropTargetX: 0,
  dragX: 0,
  claimingHint: "",
};

const computed = {
  // yes, just use a nested object, which can be easily used in `Object.assign`
  selectedClaimed: (state: InternalDragState) =>
    state.claimed[state.selectedIndex],
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
    state.dropped[state.selectedIndex]?.drop || false,
  selectChainId: (state: InternalDragState) => state.sbtReduxState.chainId,
};

export const useInternalDragState = create<InternalDragState>()((set) => ({
  ...initState,
  computed,
  setClaimingHint: ({ claimingHint }) =>
    set(() => {
      return {
        claimingHint,
      };
    }),
  setDropTargetX: (dropTargetXVal) =>
    set(() => {
      return {
        dropTargetX: dropTargetXVal,
      };
    }),
  setDragX: (dragX) =>
    set(() => {
      return {
        dragX,
      };
    }),
  reset: (claimed) =>
    set((state) => {
      const { levelIndexs, selectedIndex } = state;
      const dropped = levelIndexs.map(() => ({
        drop: false,
        verified: false,
      }));
      const newClaimed = [...state.claimed];
      if (claimed) {
        newClaimed[selectedIndex] = true;
      }
      return {
        claimed: newClaimed,
        dropped,
        dropTargetX: 0,
        claimingHint: (
          <Text>
            {claimed
              ? `已申领 E群誌 SBT Lv${selectedIndex + 1} 。`
              : `请拖入对应的线下VC文档到虚线框内，以激活 E群誌 SBT Lv${
                  selectedIndex + 1
                } 的申领。`}
          </Text>
        ),
      };
    }),
  syncClaimLevels: (claimedSbtIndexed) =>
    set((state) => {
      const { levelIndexs } = state;
      const claimed = levelIndexs.map((ind) => claimedSbtIndexed.includes(ind));
      return {
        claimed,
      };
    }),
  init: (levels, selectedIndex, sbtReduxState, claimedSbtIndexed) =>
    set(() => {
      const leftDisabled = selectedIndex === 0;
      const rightDisabled = levels.length - 1 === selectedIndex;
      const claimed = levels.map((ind) => claimedSbtIndexed.includes(ind));
      const dropped = levels.map(() => ({
        drop: false,
        verified: false,
      }));

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
      cloneDropped[index] = {
        drop,
      };
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
