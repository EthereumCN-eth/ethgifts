import create from "zustand";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ExternalDragState {}

const initState = {};

const computed = {
  // yes, just use a nested object, which can be easily used in `Object.assign`
  //   selectedClaimed: (state: ExternalDragState) =>
  //     state.claimed[state.selectedIndex],
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const useExternalDragState = create<ExternalDragState>()((set) => ({
  ...initState,
  computed,
}));
