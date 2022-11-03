export const chainIdToName = (id: number) => {
  return {
    1: "mainnet",
    10: "optimism",
    5: "goerli",
    42161: "arbitrum",
  }[id];
};
