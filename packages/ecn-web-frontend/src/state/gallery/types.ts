export type Tag = {
  label: string;
  variant: string;
};
export type GalleryItemType = {
  tags: Tag[];
  imgSrc: string;
  imgAlt: string;
  title: string;
  desc: string;
  btnTxt: string;
};
export type GalleryState = {
  galleryItems: GalleryItemType[];
  loading: boolean;
};
