import type { SerializedStyles } from "@emotion/react";

export type ImgIconType = {
  type: "img";
  iconsrc: string;
  text: string;
  content: {
    str: string;
    w: number;
    h: number;
    cssStyle?: SerializedStyles;
  };
  link?: string;
};
export type TextIconType = {
  type: "text";
  iconsrc: string;
  text: string;
  content: {
    str: string;
  };
  link?: string;
};
export type IconType = ImgIconType | TextIconType;
