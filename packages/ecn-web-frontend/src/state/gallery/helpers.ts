import type { GalleryServerItem as GelleryServerItem } from "@/types/gallery.interface";

import type { GalleryItemType, Tag } from "./types";

const btnTxt = "查看SBT及相关活动";

//   { label: "SBT", variant: "whiteText" },
//   { label: "Ongoing", variant: "whiteBg" },
export const convertGalleryItem = (
  serverItems: GelleryServerItem[]
): GalleryItemType[] => {
  return serverItems.map((serverItem) => {
    const {
      //   startTime,
      //   endTime,
      status,
      imageLinks,
      videoLinks,
      name,
    } = serverItem;

    const tags: Tag[] = [
      {
        label: serverItem.typeName,
        variant: "whiteText",
      },
      {
        label: status,
        variant: "whiteBg",
      },
    ];
    return {
      tags,
      imgSrc: (imageLinks && imageLinks[0]) || (videoLinks && videoLinks[0]),
      imgAlt: name,
      desc: "date",
      btnTxt,
      title: name,
    };
  });
};
// const tags: Tag[] = [
//   {
//     label: serverItem.typeName,
//     variant: "whiteText",
//   },
//   {
//     label: status,
//     variant: whiteBg,
//   },
// ];
// if (serverItem.typeName === "nft") {
//   const { name } = serverItem;

// }
// if (serverItem.typeName === "poap") {
//   const {} = serverItem;
// } else if (serverItem.typeName === "sbt") {
//   const {} = serverItem;
// } else {
//   // never
// }
//   });
