import { TabPanel, TabPanels } from "@chakra-ui/react";
import { css } from "@emotion/react";

import { responsive } from "@/styles/utils";

import { SBTCardSection } from "./SBTCardSection";

export const TabContents = () => {
  return (
    <TabPanels
      w="full"
      h={responsive.respWStr(1149)}
      css={css`
        background: rgba(255, 255, 255, 0.1);
      `}
      pt={responsive.respWStr(52)}
    >
      <SBTCardSection />

      <TabPanel>
        <p>two!</p>
      </TabPanel>
    </TabPanels>
  );
};
