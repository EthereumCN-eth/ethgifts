import { AspectRatio, Center } from "@chakra-ui/react";
import { css } from "@emotion/react";
import ReactPlayer from "react-player";

export const VideoView = ({ videoUrl }: { videoUrl: string | undefined }) => {
  if (!videoUrl) return null;
  return (
    <Center w="100%" h="100%">
      <AspectRatio w="90%" ratio={758 / 424} position="relative">
        {videoUrl && (
          <ReactPlayer
            controls
            className="react-player"
            url={[
              {
                src: videoUrl,
                type: "video/mp4",
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
      </AspectRatio>
    </Center>
  );
};
