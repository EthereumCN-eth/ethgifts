import type { IconType, ImgIconType, TextIconType } from "./types";

export function isImgIcon(i: IconType): i is ImgIconType {
  return i.type === "img";
}
export function isTextIcon(i: IconType): i is TextIconType {
  return i.type === "text";
}
