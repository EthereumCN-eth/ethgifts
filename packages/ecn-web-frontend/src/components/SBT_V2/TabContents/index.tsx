import { TabPanels } from "@chakra-ui/react";
import { css } from "@emotion/react";

import { responsive } from "@/styles/utils";

import { SBTCardSection } from "./SBTCardSection";
import { SBTRelatedDescriptionSection } from "./SBTRelatedDescriptionSection";

export const TabContents = () => {
  return (
    <TabPanels
      w="full"
      minH={responsive.respWStr(666)}
      css={css`
        background: rgba(255, 255, 255, 0.1);
        border-radius: 0px 0px 16px 16px;
      `}
      pt={responsive.respWStr(52)}
    >
      <SBTCardSection />

      <SBTRelatedDescriptionSection />
    </TabPanels>
  );
};
