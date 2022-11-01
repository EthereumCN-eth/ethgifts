import { Box, IconButton, Progress, Text } from "@chakra-ui/react";
import { FaRegHandPointDown } from "react-icons/fa";

export const ProgressBar = ({
  progressValues,
  selectedIndex,
  onClickDot,
  expressCount,
  levels,
}: {
  // eslint-disable-next-line react/no-unused-prop-types
  itemTexts: string[] | null;
  progressValues: number[];
  selectedIndex: number;
  onClickDot: (index: number) => void;
  expressCount: number | null;
  levels: number[];
}) => {
  const total = levels.length
    ? levels[levels.length - 1]
    : Number.POSITIVE_INFINITY;
  const currentCount = expressCount || 0;

  const expressProgress = (currentCount / total) * 100;
  const selectedLevelProgressVal = progressValues[selectedIndex];
  // console.log("levels", levels);
  // console.log("currentCount", currentCount);

  return (
    <Box w="53%" position="relative" whiteSpace="nowrap">
      {expressCount && (
        <Box
          position="absolute"
          bottom="calc(100% + 5px)"
          left={`${expressProgress}%`}
          transform="translateY(-4px) translateX(calc(-50% - 6px))"
          transition="left 1s cubic-bezier(0.77, 0, 0.175, 1)"
        >
          <FaRegHandPointDown color="#FFFFFF" size="20px" />
        </Box>
      )}
      {expressCount && (
        <Text
          position="absolute"
          bottom="calc(100% + 28px)"
          left={`${expressProgress}%`}
          // left={`${selectedLevelProgressVal}%`}
          color="#FFFFFF"
          fontSize="xs"
          transform="translateY(-4px) translateX(calc(-50% - 6px))"
          transition="left 1s cubic-bezier(0.77, 0, 0.175, 1)"
        >
          {`你在这里(${expressCount})`}
        </Text>
      )}

      {!!levels.length &&
        levels.map((level, index) => {
          return (
            <Text
              position="absolute"
              left={`${progressValues[index]}%`}
              // bottom="-200%"
              display="block"
              transform="translateX(-50%) translateY(100%)"
              // transform="translateX(-50%) translateY(-70px)"
              key={level}
              color={level <= currentCount ? "white" : "#757575"}
              // opacity={? 1 : 0}
              transition="opacity 1s cubic-bezier(0.77, 0, 0.175, 1)"
            >
              {`Lv${index + 1} (${level})`}
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
            bgColor={selectedLevelProgressVal >= v ? "grey" : "white"}
            borderRadius="50%"
            transition="1000ms linear"
          />
        </IconButton>
      ))}
      <Progress value={expressProgress} variant="whiteProgress" />
    </Box>
  );
};
