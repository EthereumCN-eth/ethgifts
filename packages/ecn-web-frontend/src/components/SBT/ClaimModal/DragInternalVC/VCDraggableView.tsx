import { Center, Image, VStack } from "@chakra-ui/react";
import { useDrag } from "react-dnd";
import type { DragSourceMonitor } from "react-dnd";

import { JSONBottomLabel } from "../../JSONBottomLabel";
import type { VCCheckItemType } from "../../VCCheckListCard";
import { responsive } from "../utils";
import type { SBTState } from "@/state/sbt";
import type { VCType } from "@/state/sbt/types";
import { shortenName } from "@/utils/shortenName";

import { useInternalDragState } from "./internalDragState";
import { VCDragCheckListCard } from "./VCDragCheckListCard";

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
      borderRadius={responsive.respWStr(16)}
      w={responsive.respWStr(424)}
      h={responsive.respWStr(333)}
      p={responsive.respWStr(20)}
      className="ecn-vc-draggble"
      // p={["10px", "12px", "15px", "20px"]}
      // p={[
      //   responsive.respWStr(10),
      //   responsive.respWStr(12),
      //   responsive.respWStr(15),
      //   responsive.respWStr(20),
      // ]}
      // maxWidth="400px"
      // maxH="400px"
      cursor="grab"
      opacity={isDragging ? "0.3" : "1"}
      sx={{
        "&::before, &::after": {
          borderRadius: responsive.respWStr(16),
        },
        transform: "translate(0, 0)",
      }}
      zIndex={10}
    >
      <VStack
        w="100%"
        h={responsive.respWStr(265)}
        // maxH="318px"
        bgColor="#DDD9D7"
        borderRadius="8px"
        position="relative"
        justify="space-evenly"
        px={responsive.respWStr(20)}
        pt={responsive.respWStr(20)}
        // pb="50px"
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
          return <VCDragCheckListCard key={item.leftText} item={item} />;
        })}

        <JSONBottomLabel
          hasVcJson
          iconSize={responsive.respWStr(12)}
          stackProps={{
            borderBottomRadius: responsive.respWStr(8),
            h: responsive.respWStr(25),
            fontSize: responsive.respWStr(14),
          }}
        />
      </VStack>
      <Center flex="1">
        <Image
          src="/holdicon.svg"
          w={responsive.respWStr(31.5)}
          h={responsive.respWStr(12.6)}
          objectFit="contain"
        />
      </Center>
    </VStack>
  );
};
