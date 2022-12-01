import { Box, Text } from "@chakra-ui/react";
import { AiFillCheckCircle, AiFillExclamationCircle } from "react-icons/ai";

import { responsive } from "../../utils";
import { ProcessingSpinner } from "../ProcessingSpinner";

export const hintText = {
  processing: ({ selectedIndex }: { selectedIndex: number }) => (
    <>
      <ProcessingSpinner size={responsive.respWStr(25)} color="white" />
      <Box w="10px" />
      <Text>{`claim processing Lv${selectedIndex + 1}`}</Text>
      {/* <Spinner ml="5px" size="sm" color="white" /> */}
    </>
  ),
  cancelling: ({ selectedIndex }: { selectedIndex: number }) => (
    <>
      <AiFillExclamationCircle size={responsive.respWStr(25)} color="red" />
      <Box w="10px" />
      <Text>{`claim cancelling Lv${selectedIndex + 1}`}</Text>
    </>
  ),
  success: ({ selectedIndex }: { selectedIndex: number }) => {
    return (
      <>
        <AiFillCheckCircle size={responsive.respWStr(25)} color="green" />
        <Box w="10px" />
        <Text>{`已申领 E群誌 SBT Lv${selectedIndex + 1}`}</Text>
      </>
    );
  },
};
