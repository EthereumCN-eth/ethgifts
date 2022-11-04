export const chainIdToName = (id: number) => {
  return {
    1: "Mainnet",
    10: "Optimism",
    5: "Goerli",
    42161: "Arbitrum",
  }[id];
};
