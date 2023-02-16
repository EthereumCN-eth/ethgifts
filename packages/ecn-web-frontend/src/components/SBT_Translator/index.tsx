import { Box, Flex, useMediaQuery } from "@chakra-ui/react";
import { css } from "@emotion/react";

import { responsive } from "@/styles/utils";

import { SBTCardSection } from "./Contents/SBTCardSection";
import { InfoDesc } from "./InfoDesc";
import { InfoIcons } from "./InfoIcons";

export const SBTTranslator = () => {
  const [isLargerThan500] = useMediaQuery("(min-width: 500px)");

  return (
    <Flex
      w="100%"
      px={responsive.respWStr(322)}
      direction="column"
      bg="rgba(0, 0, 0, 0.9)"
      // bg="rgba(12, 6, 1, 0.82)"
      // css={css`
      //   backdrop-filter: blur(150px);
      // `}
      pt={responsive.respWStr(80)}
    >
      {/*  */}
      <Flex
        direction={["row"]}
        align="center"
        justify="space-between"
        minH={responsive.respWStr(360)}
        w="100%"
      >
        {/*  */}
        <InfoDesc />
        {isLargerThan500 && <InfoIcons />}
      </Flex>
      <Box h={responsive.respWStr(82)} />
      <Box minH={responsive.respWStr(1149)} w="full" pb="90px">
        <Box
          w="full"
          minH={responsive.respWStr(666 - 40 - 90)}
          css={css`
            background: rgba(255, 255, 255, 0.1);
            border-radius: 0px 0px 16px 16px;
          `}
          pt={responsive.respWStr(52)}
        >
          <SBTCardSection />

          {/* <SBTRelatedDescriptionSection /> */}
        </Box>
      </Box>
    </Flex>
  );
};
