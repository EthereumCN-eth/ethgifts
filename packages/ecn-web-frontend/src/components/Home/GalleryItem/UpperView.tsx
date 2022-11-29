import { Box, Flex, LinkOverlay, Text } from "@chakra-ui/react";
import { css } from "@emotion/react";
import NextLink from "next/link";

export const UpperView = ({
  title,
  typeName,
  linkTo,
}: {
  title: string;
  linkTo: string;
  typeName: "nft" | "poap" | "sbt";
}) => {
  return (
    <Flex
      direction="row"
      justify="space-between"
      h="56px"
      w="full"
      // bgColor="gray.100"
      align="flex-start"
    >
      {/*  */}
      <NextLink href={linkTo} passHref>
        <LinkOverlay zIndex={100}>
          <Text
            w="240px"
            display="block"
            color="#FFFFFF"
            fontWeight={600}
            fontSize="1.25rem"
            fontFamily="PingFang SC"
            lineHeight={28 / 20}
          >
            {title}
          </Text>
        </LinkOverlay>
      </NextLink>
      <Box
        // zIndex={-1}
        px="16px"
        py="6px"
        w="68px"
        h="29px"
        css={css`
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          /* https://dev.to/afif/border-with-gradient-and-radius-387f */
          &::before {
            content: "";
            position: absolute;
            inset: 0;
            padding: 1px;
            background: linear-gradient(
                270deg,
                #ee862b -2.17%,
                #f5a636 72.83%,
                #ffd747 105.3%
              )
              border-box;
            border-radius: 16px;
            /* border: 1px solid transparent; */
            mask: linear-gradient(#fff 0 0) content-box,
              linear-gradient(#fff 0 0);
            mask-composite: xor;
            mask-composite: exclude;
          }
        `}
      >
        <Text
          fontSize="0.75rem"
          fontWeight={600}
          fontFamily="PingFang SC"
          textTransform="uppercase"
          letterSpacing="0.06em"
          css={css`
            background: linear-gradient(
              270deg,
              #ee862b -2.17%,
              #f5a636 72.83%,
              #ffd747 105.3%
            );
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-fill-color: transparent;
          `}
        >
          {typeName}
        </Text>
        {/*  */}
      </Box>
    </Flex>
  );
};
