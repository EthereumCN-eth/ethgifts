import { constants } from "ethers";
import { erc721ABI } from "wagmi";

import erc1155ABI from "@/abis/ERC1155.json";
import type { GalleryServerItem } from "@/types/gallery.interface";

export const constructContractReadObj = (
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
