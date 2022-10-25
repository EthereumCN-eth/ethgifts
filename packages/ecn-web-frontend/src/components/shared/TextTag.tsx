import { Tag, TagLabel, TagLeftIcon } from "@chakra-ui/react";
import type { ComponentPropsWithoutRef } from "react";

import { LiveAnimate } from "../LiveAnimate";

export const TextTag = ({
  text,
  variant,
  tagRestProps = {},
}: {
  text: string;
  variant: string;
  tagRestProps?: ComponentPropsWithoutRef<typeof Tag>;
}) => {
  const isLive = variant.startsWith("live");
  return (
    <Tag
      key="whiteText"
      minW="10"
      h="37%"
      variant={variant}
      borderRadius="4px"
      fontSize="xs"
      {...tagRestProps}
    >
      {isLive && <TagLeftIcon boxSize="18px" as={LiveAnimate} />}
      <TagLabel ml={isLive ? "5px" : "0"} textTransform="uppercase">
        {text}
      </TagLabel>
    </Tag>
  );
};
