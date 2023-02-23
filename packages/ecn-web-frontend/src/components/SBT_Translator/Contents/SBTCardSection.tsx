import {
  Box,
  Checkbox,
  CheckboxGroup,
  Flex,
  Stack,
  VStack,
} from "@chakra-ui/react";
import type { ChangeEvent } from "react";
import { useState } from "react";

import { responsive } from "@/styles/utils";

import { SBTCards } from "./SBTCards";

export const SBTCardSection = () => {
  const [condition, setCondition] = useState<"owned" | "all">("owned");
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "owned" || e.target.value === "all")
      setCondition(e.target.value);
  };

  return (
    <VStack w="full" minH={responsive.respWStr(1149)}>
      <Box ml="auto" mr={responsive.respWStr(63)}>
        <CheckboxGroup colorScheme="green" value={[condition]}>
          <Stack color="white" spacing={[1, 5]} direction={["column", "row"]}>
            <Checkbox onChange={onChange} value="owned">
              Owned
            </Checkbox>
            <Checkbox onChange={onChange} value="all">
              All
            </Checkbox>
          </Stack>
        </CheckboxGroup>
      </Box>
      <Flex
        direction="column"
        w="full"
        minH={responsive.respWStr(1149)}
        // justify="space-between"
        align="center"
        px={responsive.respWStr(63)}
        // bgColor="red.300"
      >
        <SBTCards condition={condition} setCondition={setCondition} />
      </Flex>
    </VStack>
  );
};
