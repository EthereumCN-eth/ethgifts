import type {
  BaseItemType,
  DetailInfoType,
  GalleryItemType,
  GalleryNFTItemType,
  GalleryPoapItemType,
  GallerySBTItemType,
  Tag,
} from "../types";
import type { GalleryServerItem } from "@/types/gallery.interface";

import { constructContractReadObj } from "./constructContractReadObj";
import { convertDateToYearMonthStr } from "./convertDateToYearMonthStr";

const btnTxt = "查看SBT及相关活动";

export const convertGalleryItem = (
  serverItems: GalleryServerItem[],
  address: string | undefined
): GalleryItemType[] => {
  return serverItems.map((serverItem) => {
    const {
      //   startTime,
      //   endTime,
      id,
      status,
      imageLinks,
      coverLink,
      chainId,
      // videoLinks,
      itemText,
      tags,
      name,
      infoDetail,
    } = serverItem;

    // console.log("infoDetail", infoDetail);

    // let homeTags: Tag[] = [
    //   {
    //     label: serverItem.typeName,
    //     variant: "whiteText",
    //   },
    // ];
    // if (status)
    //   homeTags = [
    //     ...homeTags,
    //     {
    //       label: status,
    //       variant: "whiteBg",
    //     },
    //   ];

    let detailTags: Tag[];
    if (tags) {
      const [typeTags, ...rest] = tags.map((txt) => ({
        label: txt,
        variant: "whiteText",
      }));

      detailTags = status
        ? [typeTags, { label: status, variant: "live-whiteBg" }, ...rest]
        : [typeTags, ...rest];
    } else {
      detailTags = [];
    }
    const homeTags = detailTags;

    const yearMonthStr = convertDateToYearMonthStr(serverItem.startTime);
    // const dateObj = new Date(serverItem.startTime * 1000);
    // // const day = dateObj.getDate();
    // const month = dateObj.getMonth();
    // const year = dateObj.getFullYear();

    const baseProps: BaseItemType = {
      key: `${serverItem.typeName}_${name}`,
      detailTags,
      homeTags,
      imgSrc: coverLink,
      imgAlt: name,
      desc: yearMonthStr,
      btnTxt,
      title: name,
      id,
      status,
      chainId,
      itemText,
      imageLinks,
      infoDetail: infoDetail as DetailInfoType,
    };
    const contractReadObj = constructContractReadObj(address, serverItem);

    if (serverItem.typeName === "nft") {
      const { contractAddress, nftAppType, nftDeliveryData } = serverItem;
      const additionPorps: Omit<GalleryNFTItemType, keyof BaseItemType> = {
        contractReadObj,
        typeName: "nft",
        contractAddress,
        nftAppType,
        nftDeliveryData,
      };
      return {
        ...baseProps,
        ...additionPorps,
      };
    }
    if (serverItem.typeName === "poap") {
      const additionPorps: Omit<GalleryPoapItemType, keyof BaseItemType> = {
        typeName: "poap",
        eventId: serverItem.eventId,
        contractReadObj,
      };
      return {
        ...baseProps,
        ...additionPorps,
      } as GalleryPoapItemType;
    }

    const { SBTLevel, artworks, currentLevel, currentIndex, contractAddress } =
      serverItem;
    // sbt
    const additionPorps: Omit<GallerySBTItemType, keyof BaseItemType> = {
      contractReadObj,
      SBTLevel,
      artworks,
      typeName: "sbt",
      currentLevel,
      currentIndex,
      contractAddress,
    };
    return {
      ...baseProps,
      ...additionPorps,
    };
  });
};
