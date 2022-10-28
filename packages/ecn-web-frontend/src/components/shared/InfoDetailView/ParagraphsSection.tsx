import { Box, Text } from "@chakra-ui/react";

import type { InfoHTMLType } from "./types";

export const ParagraphsSection = ({
  dataItem,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  loaded,
}: {
  dataItem: InfoHTMLType;
  loaded: boolean;
}) => (
  <Box w="39.4vw">
    {dataItem.data.map((para) => {
      return (
        <Text
          dangerouslySetInnerHTML={{ __html: para }}
          mb="18px"
          key={para.toString()}
        >
          {/* {para} */}
        </Text>
      );
    })}
  </Box>
);