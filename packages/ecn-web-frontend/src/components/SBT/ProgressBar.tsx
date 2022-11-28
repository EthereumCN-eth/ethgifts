import { Box, IconButton, Progress, Text } from "@chakra-ui/react";
import { BsFillCaretDownFill } from "react-icons/bs";

import MotionBox from "../motion/Box";

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
  // const selectedLevelProgressVal = progressValues[selectedIndex];
  // console.log("levels", levels);
  // console.log("currentCount", currentCount);
  // console.log("expressProgress", expressProgress);

  return (
    <Box w="53%" position="relative" whiteSpace="nowrap">
      {/* {expressCount && ( */}
      <MotionBox
        animate={{ y: "6px" }}
        transition={{ repeat: Infinity, duration: 0.7, repeatType: "reverse" }}
        // width={{ base: "100%", sm: "70%", md: "60%" }}
        // margin="0 auto"
      >
        <Box
          position="absolute"
          bottom="calc(100% + 5px)"
          left={`calc(${
            expressProgress === 0 ? "0" : `${expressProgress}% - 7.5px`
          })`}
          transform="translateY(-4px) translateX(calc(-50%))"
          transition="left 1s cubic-bezier(0.77, 0, 0.175, 1)"
        >
          <BsFillCaretDownFill color="#FFFFFF" size="17px" />
        </Box>
      </MotionBox>
      {/* )} */}
      <Text
        position="absolute"
        bottom="calc(100% + 23px)"
        left={`calc(${
          expressProgress === 0 ? "0" : `${expressProgress}% - 7.5px`
        })`}
        // left={`calc(${expressProgress}% - 7.5px)`}
        transform="translateY(-4px) translateX(calc(-50%))"
        // left={`${selectedLevelProgressVal}%`}
        color="#FFFFFF"
        // fontSize="xs"
        fontSize={["6px", "6px", "6px", "xs"]}
        transition="left 1s cubic-bezier(0.77, 0, 0.175, 1)"
      >
        {`你在这里(${currentCount})`}
      </Text>

      {!!levels.length &&
        levels.map((level, index) => {
          // console.log("level", level);
          return (
            <Text
              position="absolute"
              left={`${progressValues[index]}%`}
              // bottom="-200%"
              fontSize={["6px", "6px", "6px", "xs"]}
              display="block"
              transform="translateX(calc(-50% - 6px)) translateY(20px)"
              // transform="translateX(-50%) translateY(-70px)"
              key={level}
              color={index === selectedIndex ? "white" : "#757575"}
              // opacity={? 1 : 0}
              transition="opacity 1s cubic-bezier(0.77, 0, 0.175, 1)"
            >
              {`Lv${index + 1} (${level})`}
              {/* {`(${level})`} */}
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
            bgColor={levels[index] <= currentCount ? "#757575" : "grey"}
            borderRadius="50%"
            transition="1000ms linear"
          />
        </IconButton>
      ))}
      <Progress value={expressProgress} variant="whiteProgress" />
    </Box>
  );
};
