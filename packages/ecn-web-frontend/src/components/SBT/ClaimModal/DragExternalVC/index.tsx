import { Box, Button, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { constants } from "ethers";
import { AiFillCheckCircle, AiFillExclamationCircle } from "react-icons/ai";
import { useContractRead } from "wagmi";

// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { ProcessingSpinner } from "../DragInternalVC/ProcessingSpinner";
import { calcLen } from "../hooks/calcLen";
import { timeoutPromise } from "../hooks/timeoutPromise";
// import { useComputeDropAreaTransformValue } from "../hooks/useComputeTransformValue";
import { responsive } from "../utils";
import SBT1 from "@/abis/SBT1.json";
import { parseVCForPayloadAndVerifyVC } from "@/utils/vc";

import { useExternalDragState } from "./externalDragState";
import { VCDropZone } from "./VCDropZone";

export const HintView = ({
  isError,
  isLoading,
  isSuccess,
}: {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
}) => {
  return (
    <>
      {isLoading && (
        <HStack>
          <ProcessingSpinner size={responsive.respWStr(14)} color="white" />
          <Text
            textAlign="center"
            color="white"
            fontSize={`${calcLen(responsive.respW(14))}px`}
          >
            VC 文件加载中
          </Text>
        </HStack>
      )}

      {isError && (
        <HStack>
          <AiFillExclamationCircle size={responsive.respWStr(14)} color="red" />
          <Text
            textAlign="center"
            color="white"
            fontSize={`${calcLen(responsive.respW(14))}px`}
          >
            VC 文件载入错误
          </Text>
        </HStack>
      )}
      {isSuccess && (
        <HStack>
          <AiFillCheckCircle size={responsive.respWStr(14)} color="green" />
          <Text
            textAlign="center"
            color="white"
            fontSize={`${calcLen(responsive.respW(14))}px`}
          >
            VC 文件加载成功
          </Text>
        </HStack>
      )}
    </>
  );
};

export const DragExternalVC = () => {
  const fileText = useExternalDragState((state) => state.fileText);
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

  // console.log("VCParsedData", vCParsedData);
  // console.log("gradeLines", gradeLines);

  const isLoading = isFetching || gradeLineStatus === "loading";
  const isError = gradeLineStatus === "error" || vCParseStatus === "error";
  const isSuccess =
    gradeLineStatus === "success" && vCParseStatus === "success";

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
        {/* <Image
          // src={selectedArtwork}
          position="absolute"
          w={`calc(${calcLen(responsive.respW(496))}px - 2px)`}
          h={`calc(${calcLen(responsive.respW(496))}px - 2px)`}
          border="none"
          maxWidth="calc(460px - 2px)"
          maxH="calc(460px - 2px)"
          // opacity={bgOpacity}
          left={0}
          top={0}
          bottom={0}
          right={0}
          p="1px"
          borderRadius="16px"
          zIndex={1}
          textAlign="center"
        /> */}

        <VCDropZone isLoading={isLoading} />
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
          <Button
            // w="43%"
            fontSize={`${calcLen(responsive.respW(16))}px`}
            // isLoading={isSwitchNetworkLoading}
            // onClick={switchToNFTNetwork}
            // disabled={isSwitchNetworkLoading}
            px="20px"
            mx="0"
            h="fit-content"
            borderRadius="16px"
            variant="whiteOutline"
            py="8px"
            // minW={["100%", "100%", "100%", "100%", "47%"]}
          >
            确认信息并申领 SBT
          </Button>
        )}
      </VStack>
    </Flex>
  );
};
