type TagType = {
  label: string;
  variant: string;
};

type GiftItemProps = {
  tags: TagType[];
  imgSrc: string;
  imgAlt?: string;
  title: string;
  desc: string;
  btnTxt: string;
  key: string;
};

export type { TagType, GiftItemProps };
