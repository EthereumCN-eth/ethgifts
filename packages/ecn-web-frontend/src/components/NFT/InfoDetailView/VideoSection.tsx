import { Box } from "@chakra-ui/react";
import { css } from "@emotion/react";
import ReactPlayer from "react-player/lazy";

import type { InfoVideoType } from "./types";

export const VideoSection = ({
  dataItem,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  loaded = true,
}: {
  dataItem: InfoVideoType;
  loaded: boolean;
}) => {
  // console.log("dataItem", dataItem);
  return (
    <Box w="39.4vw" h={`${(39.4 / 758) * 424}vw`} position="relative">
      {dataItem && dataItem.data && dataItem.data[0] && dataItem.data[0].src && (
        <ReactPlayer
          controls
          className="react-player"
          url={[
            {
              src: dataItem.data[0].src,
              type: dataItem.data[0].type,
            },
          ]}
          width="100%"
          height="100%"
          css={css`
            position: absolute;
            top: 0;
            left: 0;
          `}
        />
      )}
    </Box>
  );
};
