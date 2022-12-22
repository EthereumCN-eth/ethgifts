import {
  Box,
  HStack,
  IconButton,
  Image,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import { css } from "@emotion/react";
import { saveAs } from "file-saver";
import { useCallback } from "react";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { MdDownloading } from "react-icons/md";

import { ChakraNextLink } from "@/components/ChakraNextLink";
import { useVCParse } from "@/components/SBT/ClaimModal/hooks/useVCParse";
import { responsive } from "@/styles/utils";

import { resLen } from "./resLen";

export const VCView = ({
  vcStr,
  levelIndex,
}: {
  vcStr: string | undefined;
  levelIndex: number;
}) => {
  const { expressCountText, issuerText, metaUrlText, issueDate, reciverText } =
    useVCParse({ vcStr });
  const onDownloadVcCallback = useCallback(() => {
    if (!vcStr) return;
    const file = new Blob([vcStr], {
      type: "text/json;charset=utf-8",
    });
    saveAs(file, `ecn_express_lv${levelIndex + 1}.json`);
    // const url = URL.createObjectURL(file);
    // window.open(url, "_blank download")?.focus();
  }, [vcStr, levelIndex]);
  return (
    <VStack
      align="center"
      justify="space-between"
      transition="transform 1s cubic-bezier(0.77, 0, 0.175, 1)"
      // bgColor="green.100"
      w={`${resLen(295)}px`}
      p={`${resLen(25)}px`}
      h={`${resLen(421)}px`}
      bgColor="transparent"
      css={css`
        color: #000000;
        position: relative;
      `}
      sx={{
        "&&&&&& *": {
          m: 0,
          p: 0,
        },
        _hover: {
          ".vc-download": {
            opacity: 0.6,
            "&:hover": {
              opacity: 1,
            },
          },
        },
      }}
    >
      <IconButton
        variant="unstyled"
        aria-label="vc-download"
        className="vc-download"
        size={`${resLen(30)}px`}
        onClick={onDownloadVcCallback}
        css={css`
          opacity: 0;
          /* cursor: pointer; */
          position: absolute;
          right: ${resLen(5)}px;
          top: ${resLen(19)}px;
        `}
      >
        <MdDownloading size={`${resLen(25)}px`} />
      </IconButton>
      <Image
        position="absolute"
        left={0}
        top={0}
        alt="bg"
        bgColor="transparent"
        src="/stampbg.png"
        p={0}
        m={0}
        w={`${resLen(295)}px`}
        h={`${resLen(421)}px`}
        zIndex={-1}
      />
      <Text
        css={css`
          font-family: "PingFang SC";
          font-style: normal;
          font-weight: 600;
          font-size: ${responsive.respWStr(20)};
          /* line-height: ${responsive.respWStr(28)}; */
        `}
      >
        E群志SBT Lv{levelIndex + 1} 等效VC
      </Text>
      <Box bgColor="black" w={`${resLen(255)}px`} h="1px" />
      <HStack p={0} m={0}>
        <Text
          css={css`
            font-family: "PingFang SC";
            font-style: normal;
            font-weight: 500;
            font-size: ${`${resLen(14)}px`};
            /* or 25px */

            letter-spacing: 0.01em;
          `}
        >
          Express Count
        </Text>

        <Box w={`${resLen(7)}px`} />
        <Box cursor="pointer">
          <Tooltip label="Number of Expresses you have sent">
            <span>
              <AiOutlineExclamationCircle
                color="#757575"
                size={`${resLen(16)}px`}
              />
            </span>
          </Tooltip>
        </Box>
      </HStack>
      <Text
        css={css`
          font-family: "PingFang SC";
          font-style: normal;
          font-weight: 600;
          font-size: ${`${resLen(64)}px`};
          /* or 25px */

          letter-spacing: 0.01em;
        `}
      >
        {expressCountText}
      </Text>

      <HStack>
        <Text
          css={css`
            font-family: "PingFang SC";
            font-style: normal;
            font-weight: 500;
            font-size: ${`${resLen(14)}px`};
            /* line-height: 180%; */
            /* or 25px */

            letter-spacing: 0.01em;
          `}
        >
          Credential Subject ID
        </Text>
        <Box w={`${resLen(7)}px`} />
        <Box cursor="pointer">
          <Tooltip label="the ethereum address to receive the SBT">
            <span>
              <AiOutlineExclamationCircle
                color="#757575"
                size={`${resLen(16)}px`}
              />
            </span>
          </Tooltip>
        </Box>
      </HStack>
      <Text
        css={css`
          font-family: "PingFang SC";
          font-style: normal;
          font-weight: 600;
          font-size: ${`${resLen(20)}px`};
          /* or 25px */

          letter-spacing: 0.01em;
        `}
      >
        {reciverText}
      </Text>

      <Box bgColor="black" w={`${resLen(255)}px`} h="1px" />

      <HStack w={`${resLen(255)}px`} align="center" justify="space-between">
        <Text
          css={css`
            font-family: "PingFang SC";
            font-style: normal;
            font-weight: 400;
            font-size: ${`${resLen(12)}px`};
            /* line-height: ${responsive.respWStr(17)}; */
            /* or 25px */

            letter-spacing: 0.01em;
          `}
        >
          Metadata URI
        </Text>
        <ChakraNextLink
          display="inline"
          target="_blank"
          textDecoration="underline"
          href={metaUrlText}
        >
          <Text
            css={css`
              font-family: "PingFang SC";
              font-style: normal;
              font-weight: 500;
              font-size: ${`${resLen(14)}px`};
              text-decoration: underline;
              /* line-height: 180%; */
              /* or 25px */

              /* letter-spacing: 0.01em; */
            `}
          >
            archive on IPFS↗
          </Text>
        </ChakraNextLink>
      </HStack>

      <HStack w={`${resLen(255)}px`} align="center" justify="space-between">
        <Text
          css={css`
            font-family: "PingFang SC";
            font-style: normal;
            font-weight: 400;
            font-size: ${`${resLen(12)}px`};
            /* line-height: ${responsive.respWStr(17)}; */
            /* or 25px */

            letter-spacing: 0.01em;
          `}
        >
          Issuer ID
        </Text>
        <Text
          css={css`
            font-family: "PingFang SC";
            font-style: normal;
            font-weight: 500;
            font-size: ${`${resLen(14)}px`};
            /* line-height: 180%; */
            /* or 25px */

            /* letter-spacing: 0.01em; */
          `}
        >
          {issuerText}
        </Text>
      </HStack>

      <HStack w={`${resLen(255)}px`} align="center" justify="space-between">
        <Text
          css={css`
            font-family: "PingFang SC";
            font-style: normal;
            font-weight: 400;
            font-size: ${`${resLen(12)}px`};
            /* line-height: ${responsive.respWStr(17)}; */
            /* or 25px */

            letter-spacing: 0.01em;
          `}
        >
          Issuerance Date
        </Text>
        <Text
          css={css`
            font-family: "PingFang SC";
            font-style: normal;
            font-weight: 500;
            font-size: ${`${resLen(14)}px`};
            /* line-height: 180%; */
            /* or 25px */

            /* letter-spacing: 0.01em; */
          `}
        >
          {issueDate}
        </Text>
      </HStack>
      {/*  */}
    </VStack>
  );
};
