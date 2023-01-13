import { checkingMediaType } from "./config";

export const verifyMediaUrl = (url: string): boolean => {
  for (let i = 0; i < checkingMediaType.length; i++) {
    if (checkingMediaType[i] == "twitter") {
      const site_domain = url.slice(1, 19);
      if (site_domain == "https://twitter.com") {
        return true;
      }
    }
  }

  return false;
};
