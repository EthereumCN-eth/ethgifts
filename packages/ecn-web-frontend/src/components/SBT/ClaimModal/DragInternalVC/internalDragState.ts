import create from "zustand";

interface InternalDragState {
  levelIndexs: number[];
  init: (levels: number[], selectedIndex: number) => void;
  selectedIndex: number;
  uiLoaded: boolean;
  leftDisabled: boolean;
  rightDisabled: boolean;
  clickNext: () => void;
  clickPre: () => void;
  clickLevel: (index: number) => void;
}

const initState = {
  levelIndexs: [],
  selectedIndex: 0,
  uiLoaded: false,
  leftDisabled: true,
  rightDisabled: true,
};

export const useInternalDragState = create<InternalDragState>()((set) => ({
  ...initState,
  init: (levels, selectedIndex) =>
    set(() => {
      if (levels.length > 0)
        return {
          levelIndexs: levels,
          selectedIndex,
          uiLoaded: true,
          leftDisabled: true,
          rightDisabled: false,
        };
      return {
        levelIndexs: levels,
        selectedIndex,
        uiLoaded: true,
        leftDisabled: true,
        rightDisabled: true,
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
