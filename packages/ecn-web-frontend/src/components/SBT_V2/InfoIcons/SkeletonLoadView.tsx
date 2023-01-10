import { HStack, Image, Skeleton, Text, VStack } from "@chakra-ui/react";
import { css } from "@emotion/react";

import { fontSize } from "../styles";
import { responsive } from "@/styles/utils";

export const SkeletonLoadView = ({
  iconsrc,
  text,
}: {
  iconsrc: string;
  text: string;
}) => (
  <VStack align="flex-start" justify="flex-start">
    {/*  */}
    {/*  */}
    <HStack>
      <Image src={iconsrc} boxSize={responsive.respWStr(20)} />
      <Text
        fontSize={fontSize.res_xs}
        css={css`
          font-family: "PingFang SC";
          font-style: normal;
          font-weight: 500;
          /* font-size: ${fontSize.res_xs}; */
          line-height: 180%;
          /* or 25px */

          letter-spacing: 0.01em;

          color: #b9b9b9;
        `}
      >
        {" "}
        {text}
      </Text>
    </HStack>
    <Skeleton w={responsive.respWStr(80)} height={responsive.respWStr(20)} />
  </VStack>
);
