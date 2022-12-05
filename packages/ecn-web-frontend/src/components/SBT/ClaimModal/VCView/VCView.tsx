import { Center, Image, VStack } from "@chakra-ui/react";
import { forwardRef } from "react";

import { JSONBottomLabel } from "../../JSONBottomLabel";
import type { VCCheckItemType } from "../../VCCheckListCard";
import { VCDragCheckListCard } from "../DragInternalVC/VCDragCheckListCard";
import { calcLen } from "../hooks/calcLen";
import { responsive } from "../utils";

export const VCView = forwardRef<
  HTMLDivElement,
  {
    isDragging: boolean;
    issuerText: string;
    expressCountText: string;
    metaUrlText: string;
    reciverText: string;
  }
>(
  (
    { isDragging, issuerText, expressCountText, metaUrlText, reciverText },
    dragRef
  ) => {
    return (
      <VStack
        ref={dragRef}
        bgColor="#FAFAFA"
        borderRadius={responsive.respWStr(16)}
        w={`${calcLen(responsive.respW(424))}px`}
        h={`${calcLen(responsive.respW(333))}px`}
        p={`${calcLen(responsive.respW(20))}px`}
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
          h={`${calcLen(responsive.respW(265))}px`}
          // maxH="318px"
          bgColor="#DDD9D7"
          borderRadius="8px"
          position="relative"
          justify="space-evenly"
          px={`${calcLen(responsive.respW(20))}px`}
          pt={`${calcLen(responsive.respW(20))}px`}
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
            w={`${calcLen(responsive.respW(31.5))}px`}
            h={`${calcLen(responsive.respW(12.6))}px`}
            objectFit="contain"
          />
        </Center>
      </VStack>
    );
  }
);
