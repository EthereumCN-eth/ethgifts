import type { NextRouter } from "next/router";
import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";

export const selectMainIndex = (base: number, total: number) => {
  if (!total) return 0;
  return ((-base % total) + total) % total;
};

export const mainNumberToBase = (index: number) => {
  return -(index - 1);
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

const routeToIndex = ({
  id,
  num,
  router,
}: {
  id: number | undefined;
  num: number;
  router: NextRouter;
}) => {
  if (id)
    router.replace(
      {
        pathname: `/sbt/[id]/[num]`,
        query: {
          id,
          num,
        },
      },
      undefined,
      {
        shallow: true,
      }
    );
};

export const useRouteByIndex = ({
  selectedIndex,
  id,
}: {
  id: number | undefined;
  selectedIndex: number;
}) => {
  const router = useRouter();
  const clickNext = useCallback(() => {
    routeToIndex({
      id,
      num: selectedIndex + 2,
      router,
    });
  }, [id, router, selectedIndex]);
  const clickPrev = useCallback(() => {
    routeToIndex({
      id,
      num: selectedIndex,
      router,
    });
  }, [id, router, selectedIndex]);
  const clickDot = useCallback(
    (index: number) => {
      routeToIndex({
        id,
        num: index + 1,
        router,
      });
    },
    [id, router]
  );
  return {
    clickDot,
    clickNext,
    clickPrev,
  };
};
