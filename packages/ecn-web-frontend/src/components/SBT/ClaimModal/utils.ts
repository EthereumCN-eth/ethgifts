const respW = (w: number) => {
  return (w / 1920) * window.innerWidth;
};

const respH = (h: number) => {
  return (h / 1080) * window.innerHeight;
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
