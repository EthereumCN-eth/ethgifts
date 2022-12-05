import { useDrag } from "react-dnd";
import type { DragSourceMonitor } from "react-dnd";

import { useVCParse } from "../hooks/useVCParse";
import { VCView } from "../VCView/VCView";
import type { SBTState } from "@/state/sbt";

import { useInternalDragState } from "./internalDragState";

export type ArrayElement<A> = A extends readonly (infer T)[] ? T : never;

export const VCDraggableView = ({
  record,
  type,
}: {
  record: ArrayElement<Exclude<SBTState["records"], null>>;
  type: string;
}) => {
  const selectedIndex = useInternalDragState((state) => state.selectedIndex);
  const sbtTitle = useInternalDragState((state) =>
    state.computed.selectedSBTTitle(state)
  );
  const vcStr = record && record.signedVC;
  const { expressCountText, issuerText, metaUrlText, reciverText } = useVCParse(
    { vcStr }
  );

  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type,
      item: { id: `${sbtTitle}-${selectedIndex}` },
      // canDrag: !forbidDrag,
      collect: (monitor: DragSourceMonitor) => ({
        isDragging: monitor.isDragging(),
        // didDrop: monitor.didDrop(),
      }),
    }),
    [sbtTitle, selectedIndex, type]
    // [forbidDrag, color]
  );
  // const [settled, setSettled] = useState(false)
  // const display = computeDisplay({ isDragging, settled });

  // // console.log("settled", settled);
  // // console.log("didDrop", didDrop);
  // // console.log("isDragging", isDragging);
  // console.log("opacity", opacity);
  return (
    <VCView
      ref={dragRef}
      isDragging={isDragging}
      expressCountText={String(expressCountText)}
      issuerText={issuerText}
      metaUrlText={metaUrlText}
      reciverText={reciverText}
    />
  );
};
