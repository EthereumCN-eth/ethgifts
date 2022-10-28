import { Box, Image } from "@chakra-ui/react";

import type { InfoImageType } from "./types";

// type ArrElement<ArrType extends readonly unknown[]> =
//   ArrType extends readonly (infer ElementType)[] ? ElementType : never;
export const SingleImageSection = ({
  dataItem,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  loaded,
}: {
  dataItem: InfoImageType;
  loaded: boolean;
}) => {
  return (
    <Box w="39.4vw">
      <Image
        w="36vw"
        h="400px"
        objectFit="contain"
        src={dataItem.data[0].src}
        alt={dataItem.data[0].alt}
      />
    </Box>
  );
};
