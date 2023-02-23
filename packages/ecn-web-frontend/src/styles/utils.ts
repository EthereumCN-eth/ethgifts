import { useEffect, useState } from "react";

const respW = (w: number) => {
  return (w / 1920) * (typeof window !== "undefined" ? window.innerWidth : 0);
};

const respH = (h: number) => {
  return (h / 1080) * (typeof window !== "undefined" ? window.innerHeight : 0);
};
const respWStr = (w: number) => `${respW(w)}px`;
const respHStr = (h: number) => `${respH(h)}px`;
const responsive = {
  respH,
  respW,
  respWStr,
  respHStr,
};
export { responsive };

export const useRespWindow = () => {
  const [fns, setFns] = useState({
    ...responsive,
  });

  useEffect(() => {
    const cb = () => {
      setFns({
        ...responsive,
      });
    };
    window.addEventListener("resize", cb);
    return () => window.removeEventListener("resize", cb);
  }, []);

  return fns;
};
