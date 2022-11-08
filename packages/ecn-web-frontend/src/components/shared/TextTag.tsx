import { Tag, TagLabel, TagLeftIcon } from "@chakra-ui/react";

import { LiveAnimate } from "../LiveAnimate";

export const TextTag = ({
  text,
  variant,
}: // tagRestProps = {},
{
  text: string;
  variant: string;
  // tagRestProps?: ComponentPropsWithoutRef<typeof Tag>;
}) => {
  const isLive = variant.startsWith("live");
  return (
    <Tag
      key="whiteText"
      minW="10"
      h={[
        `${(50 / 498) * 660 * 0.043}vw`,
        `${(40 / 498) * 660 * 0.043}vw`,
        `${(22 / 498) * 660 * 0.043}vw`,
      ]}
      variant={variant}
      borderRadius="4px"
      fontSize="xs"
      sx={{
        maxW: "8rem",
        h: "100%",
      }}
      fontFamily="PingFang SC"
      fontWeight={400}
      // {...tagRestProps}
    >
      {isLive && <TagLeftIcon boxSize="18px" as={LiveAnimate} />}
      <TagLabel ml={isLive ? "5px" : "0"} textTransform="uppercase">
        {text}
      </TagLabel>
    </Tag>
  );
};
