/* eslint-disable react/destructuring-assignment */
import { Box } from "@chakra-ui/react";
import { css } from "@emotion/react";

import { responsive } from "@/styles/utils";

import { icondata } from "./icondata";
import { OneInfo } from "./OneInfo";
import { useParseData } from "./utils";

export const InfoIcons = () => {
  const parsedIcondata = useParseData({ icondata });
  return (
    <Box
      minW={responsive.respWStr(460)}
      minH={responsive.respWStr(360)}
      // bgColor="gray.100"
      css={css`
        border: 1px solid #ffffff;
        border-radius: 16px;
        /* place-items: start; */
      `}
      display="grid"
      px={responsive.respWStr(80)}
      py={responsive.respWStr(55)}
      gridTemplate="repeat(3, 1fr) / repeat(2, 1fr)"
      columnGap={responsive.respWStr(98)}
      rowGap={responsive.respWStr(35)}
    >
      {/*  */}
      {parsedIcondata.map((v) => {
        return <OneInfo key={v.text} {...v} />;
      })}
    </Box>
  );
};
