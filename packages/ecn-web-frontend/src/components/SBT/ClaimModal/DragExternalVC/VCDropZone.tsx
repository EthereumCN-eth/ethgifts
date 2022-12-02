/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { VStack, Text, Box } from "@chakra-ui/react";
import { darken } from "polished";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { AiOutlineUpload } from "react-icons/ai";

import { calcLen } from "../hooks/calcLen";
import { responsive } from "../utils";

export function VCDropZone({ dropText }: { dropText: string }) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log(acceptedFiles[0]);
    // setLocalImgSrc(URL.createObjectURL(acceptedFiles[0]));
  }, []);
  const {
    getRootProps,
    getInputProps,
    isDragActive,
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

  console.log("isDragAccept", isDragAccept);
  console.log("isDragActive", isDragActive);
  return (
    <VStack
      w="full"
      h="full"
      justify="center"
      zIndex={100}
      {...getRootProps()}
      cursor="pointer"
      borderRadius="16px"
      border="none"
      color="#FFFFFF"
      _hover={{
        bgColor: isDragActive ? darken(0.4, "#EE862B") : "transparent",
        "& *": {
          // color: isDragActive ?  : darken(0.2, "#fff"),
        },
      }}
    >
      <input {...getInputProps()} />
      <AiOutlineUpload color="#FFFFFF" size="9%" />
      <Box h="2%" />
      <Text
        fontSize={`${calcLen(responsive.respW(20))}px`}
        fontWeight={600}
        textAlign="center"
      >
        {dropText}
      </Text>
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
  );
}
