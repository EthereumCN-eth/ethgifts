type TagType = {
  label: string;
  variant: string;
};

type GiftItemProps = {
  tags: TagType[];
  imgSrc: string | null;
  imgAlt?: string;
  title: string;
  desc: string;
  btnTxt: string;
};

export type { TagType, GiftItemProps };