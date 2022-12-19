export type ImgIconType = {
  type: "img";
  iconsrc: string;
  text: string;
  content: {
    str: string;
    w: number;
    h: number;
  };
};
export type TextIconType = {
  type: "text";
  iconsrc: string;
  text: string;
  content: {
    str: string;
  };
};
export type IconType = ImgIconType | TextIconType;
