import type {
  InfoHTMLType,
  InfoImageType,
  InfoVideoType,
} from "@/state/gallery/types";

export { InfoHTMLType, InfoImageType, InfoVideoType };

export type DetailInfoType = {
  title: string;
  subTitle: string;
  dataSection: Array<InfoHTMLType | InfoImageType | InfoVideoType>;
};
