import create from "zustand";

import type { ParseAndVerifyVCReturnType } from "@/utils/vc";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ExternalDragState {
  fileText: string | undefined;
  setFileText: (txt: string | undefined) => void;
  setParsedVC: (
    data: Exclude<ParseAndVerifyVCReturnType["data"], null>
  ) => void;
  parsedVC: ParseAndVerifyVCReturnType["data"];
  setClaiming: (isClaiming: boolean) => void;
  isClaiming: boolean;
  claimingStatus: {
    isSignRightStatus: "error" | "idle" | "success" | "loading";
    isTxStatus: "error" | "idle" | "success" | "loading";
    isVCRightStatus: "error" | "idle" | "success" | "loading";
    isWriteStatus: "error" | "idle" | "success" | "loading";
  };
  setClaimingStatus: (
    claimingStatus: ExternalDragState["claimingStatus"]
  ) => void;
}

const initState = {
  fileText: undefined,
  parsedVC: null,
  isClaiming: false,
  claimingStatus: {
    isSignRightStatus: "idle",
    isTxStatus: "idle",
    isVCRightStatus: "idle",
    isWriteStatus: "idle",
  } as const,
};

// const computed = {
//   // yes, just use a nested object, which can be easily used in `Object.assign`
//   //   selectedClaimed: (state: ExternalDragState) =>
//   //     state.claimed[state.selectedIndex],
// };

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const useExternalDragState = create<ExternalDragState>()((set) => ({
  ...initState,
  setFileText: (txt) =>
    set(() => ({
      fileText: txt,
    })),
  // computed,
  setParsedVC: (parsedVC) => {
    set(() => ({
      parsedVC,
    }));
  },
  setClaiming: (isClaiming) => {
    set(() => ({
      isClaiming,
    }));
  },
  setClaimingStatus: (claimingStatus) => {
    // const claimingStatus = claimingS as ExternalDragState["claimingStatus"];
    set(() => ({
      claimingStatus,
    }));
  },
}));
