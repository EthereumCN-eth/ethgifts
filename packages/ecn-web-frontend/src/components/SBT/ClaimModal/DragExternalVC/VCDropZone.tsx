import { VStack, Text, Box, Skeleton, Center } from "@chakra-ui/react";
import { darken } from "polished";
import { useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { AiFillExclamationCircle, AiOutlineUpload } from "react-icons/ai";
import { BsFileEarmarkCheck } from "react-icons/bs";

import { calcLen } from "../hooks/calcLen";
import { responsive } from "../utils";

import { useExternalDragState } from "./externalDragState";
import { useFileReadTextOnDrop } from "./useFileReadTextOnDrop";

const DropText = ({
  isDragReject,
  isDragAccept,
}: {
  isDragReject: boolean;
  isDragAccept: boolean;
}) => {
  return (
    <>
      {isDragAccept && <BsFileEarmarkCheck size="9%" color="#EE862B" />}
      {isDragReject && <AiFillExclamationCircle size="9%" color="red" />}
      {!isDragReject && !isDragAccept && (
        <AiOutlineUpload color="#FFFFFF" size="9%" />
      )}
      <Box h="2%" />
      {/* <HStack>
            <AiFillExclamationCircle
              size={`${calcLen(responsive.respW(22))}px`}
              color="red"
            /> */}
      {isDragReject && (
        <Text fontSize={`${calcLen(responsive.respW(20))}px`}>
          错误 VC 文件格式
        </Text>
      )}
      {!isDragReject && isDragAccept && (
        <Text fontSize={`${calcLen(responsive.respW(20))}px`}>
          验证 VC 并申领SBT
        </Text>
      )}
      {!isDragReject && !isDragAccept && (
        <Text fontSize={`${calcLen(responsive.respW(20))}px`}>
          上传 VC 申领SBT
        </Text>
      )}
    </>
  );
};

export function VCDropZone({ isLoading }: { isLoading: boolean }) {
  const { onDrop, fileText } = useFileReadTextOnDrop();
  const setFileText = useExternalDragState((state) => state.setFileText);

  useEffect(() => {
    if (fileText) {
      setFileText(fileText);
    }
  }, [fileText, setFileText]);

  // useContractRead({

  // })

  const {
    getRootProps,
    getInputProps,
    // isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: {
      "application/json": [".json"],
    },
    maxFiles: 1,
    multiple: false,
  });

  if (isLoading) {
    return (
      <Center w="full" h="full" bg="white" borderRadius="16px">
        <Skeleton
          bgColor="#FAFAFA"
          borderRadius={responsive.respWStr(16)}
          w={`${calcLen(responsive.respW(424))}px`}
          h={`${calcLen(responsive.respW(333))}px`}
        />
      </Center>
    );
  }
  return (
    <>
      <VStack
        w="full"
        h="full"
        border="1px dashed #FFFFFF"
        justify="center"
        zIndex={1000}
        cursor="pointer"
        borderRadius="16px"
        // border="none"
        bgColor={
          // eslint-disable-next-line no-nested-ternary
          isDragAccept
            ? darken(0.45, "#EE862B")
            : isDragReject
            ? darken(0.45, "#ff0000")
            : "transparent"
        }
        color="#FFFFFF"
        _hover={{
          //
          "& *": {
            color: darken(0.5, "#fff"),
          },
        }}
        {...getRootProps()}
      >
        <input {...getInputProps()} />

        <DropText isDragReject={isDragReject} isDragAccept={isDragAccept} />
        <Box h="1%" />
        <Text
          textAlign="center"
          w="70%"
          fontSize={`${calcLen(responsive.respW(14))}px`}
        >
          上传或拖入任何与 E 群誌 SBT
          所有权一一对应的VC，验证并激活自己或别人的SBT申领
        </Text>
      </VStack>
      <VStack />
    </>
  );
}
