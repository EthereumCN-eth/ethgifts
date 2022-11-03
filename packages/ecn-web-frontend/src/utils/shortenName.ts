export const shortenName = (address: string) =>
  address && [address.slice(0, 4), address.slice(-4)].join("...");
