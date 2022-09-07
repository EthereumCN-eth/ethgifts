const breakpoints = {
  upToExtraSmall: 576,
  upToSmall: 768,
  upToMedium: 992,
  upToLarge: 1500,
};

type BpType = keyof typeof breakpoints;

// example usage
// ${MediaQueryKey.sm} {
//   left: ${10}px;
// }
const MediaQueryKey = (Object.keys(breakpoints) as Array<BpType>).reduce(
  (acc: Partial<Record<BpType, string>>, v: BpType) => {
    acc[v] = `@media (max-width: ${breakpoints[v]}px)`;
    return acc;
  },
  {}
) as Record<BpType, string>;

export { MediaQueryKey };
export type { BpType };
