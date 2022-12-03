import { useEffect, useState } from "react";

export const useFuncTriggerByDeps = <T>({
  func,
  deps,
  init = "idle",
}: {
  func: () => Promise<T>;
  deps: boolean[];
  init: "error" | "success" | "loading" | "idle";
}) => {
  const [returnVal, setReturnVal] = useState<
    "error" | "success" | "loading" | "idle"
  >(init);
  useEffect(() => {
    if (deps.length === 0 || deps.every(Boolean)) {
      setReturnVal("loading");
      func().then((v) => {
        setReturnVal(v ? "success" : "error");
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [func, ...deps]);
  return returnVal;
};
