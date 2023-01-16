export type Meta = {
  urlType: UrlType;
  title?: string;
  description?: string;
  imageUrl?: string;
  siteName?: string;
  videoUrl?: string;
  twitterId?: string;
};

export const UrlType: {
  twitter: "twitter";
  video: "video";
  ogData: "ogData";
  onlyMeta: "onlyMeta";
  noMeta: "noMeta";
} = {
  twitter: "twitter",
  video: "video",
  ogData: "ogData",
  onlyMeta: "onlyMeta",
  noMeta: "noMeta",
};

export type UrlType = typeof UrlType[keyof typeof UrlType];
