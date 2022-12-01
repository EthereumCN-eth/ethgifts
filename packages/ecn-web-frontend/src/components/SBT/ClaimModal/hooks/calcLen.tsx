import { responsive } from "../utils";

export const calcLen = (num: number) => {
  if (window && window.innerHeight) {
    const ratio = responsive.respW(496) / (window.innerHeight * 0.4);
    if (ratio > 1) {
      return num / ratio;
    }
  }

  return num;
};
