import type { GalleryServerItem } from "@/types/gallery.interface";

import type { GalleryItemType, Tag } from "./types";

const btnTxt = "查看SBT及相关活动";

//   { label: "SBT", variant: "whiteText" },
//   { label: "Ongoing", variant: "whiteBg" },
export const convertGalleryItem = (
  serverItems: GalleryServerItem[]
): GalleryItemType[] => {
  return serverItems.map((serverItem) => {
    const {
      //   startTime,
      //   endTime,
      id,
      status,
      imageLinks,
      typeName,
      // videoLinks,

      name,
    } = serverItem;

    let tags: Tag[] = [
      {
        label: serverItem.typeName,
        variant: "whiteText",
      },
    ];
    if (status)
      tags = [
        ...tags,
        {
          label: status,
          variant: "whiteBg",
        },
      ];
    const dateObj = new Date(serverItem.startTime * 1000);
    // const day = dateObj.getDate();
    const month = dateObj.getMonth();
    const year = dateObj.getFullYear();
    return {
      key: `${serverItem.typeName}_${name}`,
      tags,
      imgSrc: imageLinks && imageLinks[0],
      imgAlt: name,
      desc: `${year}年${month}月`,
      btnTxt,
      title: name,
      id,
      typeName,
    };
  });
};
