import { constants } from "ethers";
import { erc721ABI } from "wagmi";

import erc1155ABI from "@/abis/ERC1155.json";
import type { GalleryServerItem } from "@/types/gallery.interface";

import type {
  BaseItemType,
  GalleryItemType,
  GalleryNFTItemType,
  GalleryPoapItemType,
  GallerySBTItemType,
  Tag,
} from "./types";

const btnTxt = "查看SBT及相关活动";

const constructContractReadObj = (
  address: string | undefined,
  item: GalleryServerItem
) => {
  if (address && (item.typeName === "nft" || item.typeName === "sbt")) {
    if (item.tokenType === "ERC1155") {
      return {
        addressOrName: item.contractAddress,
        chainId: item.chainId,
        contractInterface: erc1155ABI,
        functionName: "balanceOf",
        args: [address, item.tokenId],
      };
    }
    if (item.tokenType === "ERC721") {
      return {
        addressOrName: item.contractAddress,
        chainId: item.chainId,
        contractInterface: erc721ABI,
        functionName: "balanceOf",
        args: [address],
      };
    }
  }
  // workaround as null
  return {
    addressOrName: constants.AddressZero,
    chainId: 1,
    contractInterface: erc721ABI,
    functionName: "balanceOf",
    args: [constants.AddressZero],
  };

  // return null;
};
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

    const baseProps: BaseItemType = {
      key: `${serverItem.typeName}_${name}`,
      tags,
      imgSrc: imageLinks && imageLinks[0],
      imgAlt: name,
      desc: `${year}年${month}月`,
      btnTxt,
      title: name,
      id,
    };
    const contractReadObj = constructContractReadObj(address, serverItem);
    if (serverItem.typeName === "nft") {
      const additionPorps: Omit<GalleryNFTItemType, keyof BaseItemType> = {
        contractReadObj,
        typeName: "nft",
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
    // sbt
    const additionPorps: Omit<GallerySBTItemType, keyof BaseItemType> = {
      contractReadObj,
      typeName: "sbt",
    };
    return {
      ...baseProps,
      ...additionPorps,
    };
  });
};
