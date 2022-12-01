import { TabPanel, TabPanels } from "@chakra-ui/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { useAppSelector } from "@/state/reduxHooks";
import { selectors as sbtSelectors } from "@/state/sbt";

import { InternalDragPanel } from "./InternalDragPanel";

export const LevelTabPanels = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { loaded, records, sbtLevel } = useAppSelector(sbtSelectors.selectAll);
  return (
    <DndProvider backend={HTML5Backend}>
      <TabPanels w="100%" h="100%">
        {sbtLevel.map((_, i) => {
          return (
            // eslint-disable-next-line react/no-array-index-key
            <TabPanel w="100%" key={i} h="100%">
              <InternalDragPanel index={i} />
            </TabPanel>
          );
        })}

        {/* <TabPanel w="100%" h="100%">
          <InternalDragPanel />
        </TabPanel>
        <TabPanel w="100%" h="100%">
          <InternalDragPanel />
        </TabPanel> */}
      </TabPanels>
    </DndProvider>
  );
};
