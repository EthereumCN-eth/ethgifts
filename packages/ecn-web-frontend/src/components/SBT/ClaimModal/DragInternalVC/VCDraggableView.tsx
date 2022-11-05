import { Center, Image, VStack } from "@chakra-ui/react";
import { useDrag } from "react-dnd";
import type { DragSourceMonitor } from "react-dnd";

import { JSONBottomLabel } from "../../JSONBottomLabel";
import { VCCheckListCard } from "../../VCCheckListCard";
import type { VCCheckItemType } from "../../VCCheckListCard";
import type { SBTState } from "@/state/sbt";
import type { VCType } from "@/state/sbt/types";
import { shortenName } from "@/utils/shortenName";

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
  const parsedVc = record && (JSON.parse(record.signedVC) as VCType);
  const issuerText =
    (parsedVc && parsedVc.issuer && shortenName(parsedVc.issuer)) || "--";
  const expressCountText =
    record?.signaturePayload?.expressCount.toString() || "--";
  const metaUrlText = record?.signaturePayload?.metadataURI || "--";
  const reciverText =
    (record && shortenName(record.signaturePayload.receiverETHAddress)) || "--";

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
    <VStack
      ref={dragRef}
      bgColor="#FAFAFA"
      borderRadius="16px"
      w="20vw"
      h="20vw"
      p="20px"
      maxWidth="400px"
      maxH="400px"
      cursor="grab"
      opacity={isDragging ? "0.3" : "1"}
      sx={{
        "&::before, &::after": {
          borderRadius: "16px",
        },
        transform: "translate(0, 0)",
      }}
      zIndex={10}
    >
      <VStack
        w="100%"
        h="16vw"
        maxH="318px"
        bgColor="#DDD9D7"
        borderRadius="8px"
        position="relative"
        justify="space-evenly"
        px="20px"
        pt="30px"
        pb="50px"
      >
        {(
          [
            {
              leftText: "issuer:",
              rightText: issuerText,
              type: "text",
            },
            {
              leftText: "Express Count:",
              rightText: expressCountText,
              type: "text",
            },
            {
              leftText: "Matadata URI:",

              rightText: "archive on IPFS↗",
              href: metaUrlText,
              type: "link",
            },
            {
              leftText: "reciver:",
              rightText: reciverText,
              type: "text",
            },
          ] as Array<VCCheckItemType>
        ).map((item) => {
          return <VCCheckListCard key={item.leftText} item={item} />;
        })}

        <JSONBottomLabel
          hasVcJson
          stackProps={{
            borderBottomRadius: "8px",
          }}
        />
      </VStack>
      <Center flex="1">
        <Image
          src="/holdicon.svg"
          w="31px"
          h={["5px", "5px", "5px", "5px", "12px"]}
          objectFit="contain"
        />
      </Center>
    </VStack>
  );
};