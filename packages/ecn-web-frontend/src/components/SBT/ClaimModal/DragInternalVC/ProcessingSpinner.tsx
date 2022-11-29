import { Box, keyframes } from "@chakra-ui/react";
import type { IconBaseProps } from "react-icons";
import { AiOutlineReload } from "react-icons/ai";

import { responsive } from "../utils";

const rotate = keyframes`
  0% {
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(360deg);
  }
`;

export const ProcessingSpinner = ({
  size,
  color,
}: {
  size?: IconBaseProps["size"];
  color?: IconBaseProps["color"];
}) => {
  return (
    <Box
      sx={{
        animation: `1s ${rotate} linear infinite`,
      }}
    >
      <AiOutlineReload
        size={size || responsive.respWStr(20)}
        color={color || "black"}
      />
    </Box>
  );
};