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
  shellItemNumber: 8;
  galleryItems: GalleryItemType[];
  loading: boolean;
};
