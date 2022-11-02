import { Flex, Tab, TabList } from "@chakra-ui/react";

import { useAppSelector } from "@/state/reduxHooks";
import { selectors as sbtSelectors } from "@/state/sbt";

export const LevelTabList = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { loaded, records, sbtLevel } = useAppSelector(sbtSelectors.selectAll);
  // console.log("loaded", loaded);

  return (
    <TabList border="none">
      <Flex
        minW="148px"
        h="25px"
        bgColor="#DDD9D7"
        borderRadius="25px"
        display="flex"
        justifyContent="space-between"
        px="1.5px"
        py="2px"
        align="center"
      >
        {sbtLevel.map((value, index) => {
          return (
            <Tab
              border="none"
              //   py="1px"
              m="0"
              w="42px"
              h="full"
              borderRadius="25px"
              textAlign="center"
              cursor="pointer"
              bgColor="transparent"
              key={value}
              fontSize="sm"
              color="#FFFFFF"
              _selected={{
                bgColor: "#EE862B",
              }}
            >{`Lv${index + 1}`}</Tab>
          );
        })}
      </Flex>
    </TabList>
  );
};
