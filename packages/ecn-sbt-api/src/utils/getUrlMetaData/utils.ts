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

export const getTwitterStatusId = (url: string) => {
  const single_url = url.split(",");

  const twitterUrl =
    single_url.length === 1
      ? single_url[0]
      : single_url.find((url) => {
          url.includes("https://twitter.com");
        });

  const split_url = twitterUrl !== undefined ? twitterUrl.split("/") : "";

  for (let i = 0; i < split_url.length; i++) {
    if (split_url[i] == "status") {
      const split_id = split_url[i + 1].split("?");
      return split_id[0];
    }
  }

  console.log("invalid tweet");
};
