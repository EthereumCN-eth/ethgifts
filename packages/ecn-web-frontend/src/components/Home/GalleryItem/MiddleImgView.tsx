import { Center, Image, Skeleton } from "@chakra-ui/react";

import { GalleryOwnerShipStamp } from "../GalleryOwnerShipStamp";

export const MiddleImgView = ({
  imgAlt,
  imgSrc,
  isOwnIt,
}: {
  imgSrc: string;
  imgAlt: string;
  isOwnIt: boolean;
}) => {
  return (
    <Center w="330px" h="280px">
      <Image
        // loading="lazy"
        maxW="70vw"
        loading="lazy"
        fit="contain"
        h="100%"
        w="100%"
        src={imgSrc}
        alt={imgAlt}
        fallbackStrategy="beforeLoadOrError"
        fallback={
          <Skeleton
            startColor="orange.200"
            endColor="orange.400"
            w="full"
            h="full"
          />
        }
      />
      {isOwnIt && <GalleryOwnerShipStamp />}
    </Center>
  );
};
