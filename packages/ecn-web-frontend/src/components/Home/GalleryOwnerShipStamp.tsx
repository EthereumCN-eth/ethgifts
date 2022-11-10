import { Image } from "@chakra-ui/react";

export const GalleryOwnerShipStamp = () => (
  <Image
    src="/ownstamp.svg"
    alt="you-own-it"
    w="80px"
    h="60px"
    position="absolute"
    bottom={0}
    right={0}
    transform="translate(10px, 50%)"
  />
);
