import { Box, IconButton, Progress, Text } from "@chakra-ui/react";
import { FaRegHandPointDown } from "react-icons/fa";

export const ProgressBar = ({
  itemTexts,
  progressValues,
  selectedIndex,
  onClickDot,
}: {
  itemTexts: string[] | null;
  progressValues: number[];
  selectedIndex: number;
  onClickDot: (index: number) => void;
}) => {
  const selectedProgress = progressValues[selectedIndex];
  return (
    <Box w="53%" position="relative" whiteSpace="nowrap">
      <Box
        position="absolute"
        bottom="100%"
        left={`${selectedProgress}%`}
        transform="translateY(-4px) translateX(calc(-50% - 6px))"
        transition="left 1s cubic-bezier(0.77, 0, 0.175, 1)"
      >
        <FaRegHandPointDown color="#FFFFFF" size="25px" />
      </Box>

      {itemTexts &&
        itemTexts.map((txt, index) => {
          return (
            <Text
              position="absolute"
              left={`${progressValues[index]}%`}
              // bottom="-200%"
              display="block"
              // transform="translateX(-50%) translateY(100%)"
              transform="translateX(-50%) translateY(-70px)"
              key={txt}
              color="white"
              opacity={selectedIndex === index ? 1 : 0}
              transition="opacity 1s cubic-bezier(0.77, 0, 0.175, 1)"
            >
              {txt}
            </Text>
          );
        })}

      {progressValues.map((v, index) => (
        <IconButton
          key={v}
          position="absolute"
          left={`${v}%`}
          h="60px"
          minW="20px"
          transform="translateX(calc(-50% - 8px))"
          my="auto"
          top={0}
          bottom={0}
          aria-label={`progress-${v}`}
          variant="unstyled"
          zIndex={100}
          display="flex"
          alignItems="center"
          justifyContent="center"
          onClick={() => {
            onClickDot(index);
          }}
        >
          <Box
            key={v}
            // position="absolute"
            // left={`${v}%`}
            h="4px"
            w="4px"
            bgColor={selectedProgress >= v ? "grey" : "white"}
            borderRadius="50%"
            transition="1000ms linear"
          />
        </IconButton>
      ))}
      <Progress value={selectedProgress} variant="whiteProgress" />
    </Box>
  );
};
