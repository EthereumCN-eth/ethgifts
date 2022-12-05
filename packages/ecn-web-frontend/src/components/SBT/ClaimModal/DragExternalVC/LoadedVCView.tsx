import { Center, IconButton } from "@chakra-ui/react";
import type { BigNumber } from "ethers";
import { darken } from "polished";
import { TbTrashX } from "react-icons/tb";

import { calcLen } from "../hooks/calcLen";
import { useVCParse } from "../hooks/useVCParse";
import { responsive } from "../utils";
import { VCView } from "../VCView/VCView";

import { useExternalDragState } from "./externalDragState";
import { useIsExternalClaimed } from "./useIsExternalClaimed";
import { VCExternalStepProgressView } from "./VCExternalStepProgressView";

export const LoadedVCView = ({
  reset,
  gradeLines,
}: {
  reset: () => void;
  gradeLines: BigNumber[];
}) => {
  const fileText = useExternalDragState((state) => state.fileText);
  const { expressCountText, issuerText, metaUrlText, reciverText } = useVCParse(
    { vcStr: fileText }
  );
  const isClaiming = useExternalDragState((state) => state.isClaiming);
  const claimed = useIsExternalClaimed({ gradeLines });

  return (
    <Center
      w="full"
      h="full"
      bg={darken(0.2, "#fff")}
      position="relative"
      borderRadius="16px"
      _hover={{
        "& .ecn-vc-reset": {
          display: "flex",
        },
      }}
    >
      {isClaiming && (
        <VCExternalStepProgressView isClaiming={isClaiming} claimed={claimed} />
      )}
      {!isClaiming && (
        <>
          <VCView
            isDragging={false}
            expressCountText={String(expressCountText)}
            issuerText={issuerText}
            metaUrlText={metaUrlText}
            reciverText={reciverText}
          />
          <Center
            zIndex={100}
            position="absolute"
            top="50%"
            left="50%"
            className="ecn-vc-reset"
            transform="translate(-50%, -50%)"
            w={`${calcLen(responsive.respW(424))}px`}
            h={`${calcLen(responsive.respW(333))}px`}
            // w="full"
            // h="full"
            // p={`${calcLen(responsive.respW(20))}px`}
            // borderRadius={responsive.respWStr(16)}
            opacity={0.4}
            // bgColor="black"
            display="none"
          >
            <IconButton
              onClick={() => reset()}
              aria-label="reset vc"
              variant="unstyled"
            >
              <Center
                bgColor="white"
                h={`${calcLen(responsive.respW(50))}px`}
                w={`${calcLen(responsive.respW(50))}px`}
                borderRadius="50%"
              >
                <TbTrashX
                  color="black"
                  size={`${calcLen(responsive.respW(30))}px`}
                />
              </Center>
            </IconButton>
          </Center>
        </>
      )}
    </Center>
  );
};
