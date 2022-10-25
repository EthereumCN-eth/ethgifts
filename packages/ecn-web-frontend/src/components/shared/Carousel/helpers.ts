import type { NextRouter } from "next/router";
import { useRouter } from "next/router";
import { useCallback } from "react";

const routeToIndex = ({
  id,
  num,
  router,
  pathname,
}: {
  id: number | undefined;
  num: number;
  router: NextRouter;
  pathname: string;
}) => {
  if (id)
    router.replace(
      {
        pathname,
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
  pathname,
}: {
  id: number | undefined;
  selectedIndex: number;
  pathname: string;
}) => {
  const router = useRouter();
  const clickNext = useCallback(() => {
    routeToIndex({
      id,
      num: selectedIndex + 2,
      router,
      pathname,
      // pathname: `/sbt/[id]/[num]`,
    });
  }, [id, pathname, router, selectedIndex]);
  const clickPrev = useCallback(() => {
    routeToIndex({
      id,
      num: selectedIndex,
      router,
      pathname,
    });
  }, [id, pathname, router, selectedIndex]);
  const clickDot = useCallback(
    (index: number) => {
      routeToIndex({
        id,
        num: index + 1,
        router,
        pathname,
        // pathname: `/sbt/[id]/[num]`,
      });
    },
    [id, pathname, router]
  );
  return {
    clickDot,
    clickNext,
    clickPrev,
  };
};
