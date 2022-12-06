import { Box, Flex, VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import type { BigNumber } from "ethers";
import { constants } from "ethers";
import { useContractRead } from "wagmi";

// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { calcLen } from "../hooks/calcLen";
import { timeoutPromise } from "../hooks/timeoutPromise";
// import { useComputeDropAreaTransformValue } from "../hooks/useComputeTransformValue";
import { responsive } from "../utils";
import SBT1 from "@/abis/SBT1.json";
import { parseVCForPayloadAndVerifyVC } from "@/utils/vc";

import { ClaimExternalVCButton } from "./ClaimExternalVCButton";
import { useExternalDragState } from "./externalDragState";
import { HintView } from "./HintView";
import { VCDropZone } from "./VCDropZone";

export const DragExternalVC = () => {
  const fileText = useExternalDragState((state) => state.fileText);
  const setParsedVC = useExternalDragState((state) => state.setParsedVC);
  const {
    data: vCParsedData,
    status: vCParseStatus,
    isFetching,
  } = useQuery({
    queryKey: ["parseAndVerifyVC", fileText],
    queryFn: async () => {
      const delayPromise = timeoutPromise(1000);
      const [resVal] = await Promise.all([
        parseVCForPayloadAndVerifyVC(fileText),
        delayPromise,
      ]);
      if (!resVal.success) {
        throw Error("parseAndVerifyVC Error");
      }
      if (resVal.data.expressAmount <= 0) {
        throw Error("parseAndVerifyVC expressAmount Error");
      }
      setParsedVC(resVal.data);
      return resVal;
    },
    enabled: !!fileText,
    refetchOnWindowFocus: false,
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: gradeLines, status: gradeLineStatus } = useContractRead({
    contractInterface: SBT1.abi,
    addressOrName:
      vCParsedData?.data?.verifyingContract || constants.AddressZero,
    chainId: vCParsedData?.data?.chainId,
    functionName: "expressGradeLine",
    args: [],
    enabled: !!vCParsedData && vCParsedData.success,

    // overrides: {
    //   gasLimit: 50000,
    // },
  });
  // console.log("isFetching", isFetching);
  // console.log("vCParseStatus", vCParseStatus);
  // console.log("gradeLineStatus", gradeLineStatus);

  // // console.log("VCParsedData", vCParsedData);
  // console.log("gradeLines", gradeLines);

  const isLoading = isFetching || gradeLineStatus === "loading";
  const isError = gradeLineStatus === "error" || vCParseStatus === "error";
  const isSuccess =
    !isLoading &&
    !isError &&
    gradeLineStatus === "success" &&
    vCParseStatus === "success";

  // console.log("isLoading", isLoading);
  // console.log("isError", isError);
  // console.log("isSuccess", isSuccess);

  return (
    <Flex w="full" h="full" direction="column" align="center" justify="center">
      <Flex
        direction="column"
        align="center"
        w={`${calcLen(responsive.respW(496))}px`}
        h={`${calcLen(responsive.respW(496))}px`}
        maxWidth="460px"
        maxH="460px"
        borderRadius="16px"
        zIndex={1000}
        // zIndex={dropped ? 1000 : 0}
        // bgColor="transparent"

        justify="center"
        position="relative"
        // bgColor={isOver ? "rgba(238, 134, 43, 0.8)" : "transparent"}
        transition="all 1s cubic-bezier(0.77, 0, 0.175, 1) , background-color 0.5s cubic-bezier(0.77, 0, 0.175, 1)"
      >
        <VCDropZone
          gradeLines={gradeLines as BigNumber[]}
          isLoading={isLoading}
          isSuccess={isSuccess}
        />
      </Flex>
      <Box h={`${responsive.respH(30)}px`} />

      <VStack
        // bgColor="green"
        justify="center"
        // h={`${calcLen(responsive.respW(50))}px`}
        w="70%"
      >
        {/*  */}
        <HintView
          isError={isError}
          isLoading={isLoading}
          isSuccess={isSuccess}
        />

        <Box h={`${responsive.respH(5)}px`} />
        {isSuccess && (
          <ClaimExternalVCButton gradeLines={gradeLines as BigNumber[]} />
        )}
      </VStack>
    </Flex>
  );
};
