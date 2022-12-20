import { Tab, TabList } from "@chakra-ui/react";
import { css } from "@emotion/react";

import { responsive } from "@/styles/utils";

const tabLabels = [
  {
    text: "SBTs",
  },
  {
    text: "E群誌相关",
  },
];

export const TabLabels = () => {
  return (
    <TabList
      css={css`
        border-radius: 16px 16px 0px 0px;
      `}
      w="full"
      h={responsive.respWStr(60)}
    >
      {tabLabels.map((labelObj, ind) => {
        const cssStr =
          ind === 0
            ? css`
                border-radius: 16px 0px 0px 0px;
              `
            : css`
                border-radius: 0px 16px 0px 0px;
              `;
        return (
          <Tab
            css={[
              cssStr,
              css`
                font-family: "PingFang SC";
                font-style: normal;
                font-weight: 600;
                font-size: ${responsive.respWStr(20)};
                line-height: ${responsive.respWStr(28)};
                /* identical to box height */

                color: #ffffff;
              `,
            ]}
            w="50%"
            h="full"
            background="rgba(0, 0, 0, 0.4)"
            color="#757575"
            _selected={{
              color: "#FFFFFF",
              background: "rgba(255, 255, 255, 0.1)",
            }}
            key={labelObj.text}
          >
            {labelObj.text}
          </Tab>
        );
      })}
    </TabList>
  );
};
