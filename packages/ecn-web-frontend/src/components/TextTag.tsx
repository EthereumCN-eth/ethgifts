import { Tag, TagLabel, TagLeftIcon } from "@chakra-ui/react";

import { LiveAnimate } from "./LiveAnimate";

export const TextTag = ({
  text,
  variant,
}: {
  text: string;
  variant: string;
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
    >
      {isLive && <TagLeftIcon boxSize="18px" as={LiveAnimate} />}
      <TagLabel ml={isLive ? "5px" : "0"} textTransform="uppercase">
        {text}
      </TagLabel>
    </Tag>
  );
};
