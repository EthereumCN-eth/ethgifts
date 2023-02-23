import { Flex, Tab, TabList } from "@chakra-ui/react";

import { responsive } from "../../../../styles/utils";
import { calcLen } from "../hooks/calcLen";
import { useAppSelector } from "@/state/reduxHooks";
import { selectors as sbtSelectors } from "@/state/sbt";

export const LevelTabList = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { loaded, records, sbtLevel } = useAppSelector(sbtSelectors.selectAll);
  // console.log("loaded", loaded);

  return (
    <TabList border="none">
      <Flex
        minW={responsive.respW(148)}
        h={responsive.respH(25)}
        bgColor="#DDD9D7"
        borderRadius={responsive.respW(25)}
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
              w={responsive.respW(42)}
              h="full"
              borderRadius={responsive.respW(25)}
              textAlign="center"
              cursor="pointer"
              bgColor="transparent"
              key={value}
              fontSize={`${calcLen(responsive.respW(14))}px`}
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
