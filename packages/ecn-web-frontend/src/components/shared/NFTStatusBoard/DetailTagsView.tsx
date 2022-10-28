import { HStack } from "@chakra-ui/react";

import { TextTag } from "../TextTag";
import type { Tag } from "@/state/gallery/types";

export function DetailTagsView({ detailTags }: { detailTags: Tag[] }) {
  return (
    <HStack gap={3} wrap="wrap">
      {detailTags.map((tag) => {
        return (
          <TextTag key={tag.label} text={tag.label} variant={tag.variant} />
        );
      })}
    </HStack>
  );
}
