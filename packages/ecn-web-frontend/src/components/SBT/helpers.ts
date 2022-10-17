import { useMemo } from "react";

export const selectMainIndex = (base: number, total: number) => {
  if (!total) return 0;
  return ((-base % total) + total) % total;
};

const progressValues = (levels: number[]) => {
  const allLevels = [...levels];
  const last = allLevels.pop();
  return [
    ...allLevels.map((v) =>
      Math.floor((v * 100) / (last || Number.POSITIVE_INFINITY))
    ),
    100,
  ];
};

export const useComputedProgressVales = (levels: number[]) => {
  return useMemo(() => {
    return progressValues(levels);
  }, [levels]);
};
