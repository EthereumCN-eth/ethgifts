import { responsive } from "@/styles/utils";

export const resLen = (num: number) => {
  if (responsive.respW(496) > responsive.respH(496)) {
    return responsive.respH(num);
  }
  return responsive.respW(num);
};
