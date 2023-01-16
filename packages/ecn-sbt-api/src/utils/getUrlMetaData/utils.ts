import { checkingMediaType } from "./config";

export const verifyMediaUrl = (url: string) => {
  for (let i = 0; i < checkingMediaType.length; i++) {
    if (checkingMediaType[i] == "twitter") {
      if (url.includes("https://twitter.com")) {
        return true;
      } else {
        return false;
      }
    }
  }
};

export const getUrl = (videoJson: string) => {
  const url = JSON.parse(JSON.stringify(videoJson)).url;
  return url;
};

export const getTwitterStatusId = (twitterUrl: string) => {
  const split_url = twitterUrl.split("/");

  return split_url[split_url.length - 1];
};
