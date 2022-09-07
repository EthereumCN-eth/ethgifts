import { BpType, MediaQueryKey } from "./media";
import { UnionToTuple } from "./unionToTuple";

interface FixedLengthArray<T extends any, L extends number> extends Array<T> {
  0: T;
  length: L;
}

// map the array of fontsize to the mediaquery css string
export const resposiveFontSize = (
  fontsizes: FixedLengthArray<number, UnionToTuple<BpType>["length"]>
) => {
  const mediaFontCSS = Object.keys(MediaQueryKey)
    .map((key, index) => {
      return `${MediaQueryKey[key as BpType]} {
        font-size: ${fontsizes[index]}px;
      };`;
    })
    // desktop first; css cascading
    .reverse()
    .join("");

  // the last ele as default fontsize
  const mediaFontCSSWithDefault = `font-size: ${
    fontsizes[fontsizes.length - 1]
  }px;${mediaFontCSS}
`;
  return mediaFontCSSWithDefault;
};
