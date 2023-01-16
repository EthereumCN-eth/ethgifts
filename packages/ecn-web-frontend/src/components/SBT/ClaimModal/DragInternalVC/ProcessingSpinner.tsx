import { Box, keyframes } from "@chakra-ui/react";
import type { IconBaseProps } from "react-icons";
import { AiOutlineReload } from "react-icons/ai";

import { responsive } from "../../../../styles/utils";
import { calcLen } from "../hooks/calcLen";

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
        height={size || `${calcLen(responsive.respW(20))}px`}
        width={size || `${calcLen(responsive.respW(20))}px`}
        size={size || `${calcLen(responsive.respW(20))}px`}
        color={color || "black"}
      />
    </Box>
  );
};
