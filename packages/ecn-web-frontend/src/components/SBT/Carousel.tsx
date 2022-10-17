import {
  Box,
  Divider,
  Flex,
  IconButton,
  Image,
  Progress,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { AiOutlineLeftCircle, AiOutlineRightCircle } from "react-icons/ai";
import { FaRegHandPointDown } from "react-icons/fa";

import { selectMainIndex, useComputedProgressVales } from "./helpers";

const RADIUS = 23;

export const Carousel = ({
  artworks = [],
  levels,
  itemTexts,
}: {
  artworks: string[];
  levels: number[];
  itemTexts: string[] | null;
}) => {
  const [base, setBase] = useState(0);
  const selectedIndex = selectMainIndex(base, artworks.length);
  // console.log("base", base);
  const progressValues = useComputedProgressVales(levels);
  const selectedProgress = progressValues[selectedIndex];
  const onClickArrowLeft = () => {
    setBase((v) => v + 1);
  };
  const onClickArrowRight = () => {
    setBase((v) => v - 1);
  };
  const onClickDot = (index: number) => {
    setBase(-index);
  };
  // console.log("artworks", artworks);
  return (
    <>
      <Flex
        justify="center"
        align="center"
        w="100%"
        h="75%"
        bg="rgba(0, 0, 0, 0.8)"
        position="relative"
        sx={{
          perspective: "100vw",
          transformOrigin: "center",
        }}
      >
        {/*  */}
        <Box
          position="absolute"
          sx={{
            transformStyle: "preserve-3d",
            transform: `translateZ(-${RADIUS}vw) rotateY(${
              base * (360 / artworks.length)
            }deg) `,
            transition: `transform 1s cubic-bezier(0.77, 0, 0.175, 1)`,
          }}
          w="full"
          h="full"
        >
          {artworks.map((img, ind) => {
            const total = artworks.length;
            const eachDeg = 360 / total;
            // console.log("v:", ((-base % total) + total) % total);

            return (
              <Box
                key={img}
                position="absolute"
                top={0}
                bottom={0}
                left={0}
                right={0}
                w="full"
                h="full"
                sx={{ transformStyle: "preserve-3d" }}
              >
                {[
                  {
                    additonalTransform: "rotateY(180deg)",
                    additionalProps: {},
                  },
                  {
                    additonalTransform: "",
                    additionalProps: {
                      backfaceVisibility: "hidden",
                    },
                  },
                ].map((obj) => {
                  return (
                    <Image
                      key={`${img}-${obj.additonalTransform}`}
                      position="absolute"
                      top={0}
                      bottom={0}
                      left={0}
                      right={0}
                      w="full"
                      h="full"
                      src={img}
                      fit="contain"
                      sx={{
                        // transformStyle: "preserve-3d",
                        transformOrigin: "center",
                        transform: `rotateY(${
                          eachDeg * ind
                        }deg) translateZ(${RADIUS}vw) ${obj.additonalTransform}
                ${selectedIndex === ind ? `scale(0.65)` : `scale(0.2)`}
                `,
                        transition: `transform 1s cubic-bezier(0.77, 0, 0.175, 1)`,
                        ...obj.additionalProps,
                      }}
                    />
                  );
                })}
              </Box>
            );
          })}
        </Box>
        <Flex
          h="10%"
          w="full"
          direction="row"
          align="center"
          justify="center"
          position="absolute"
          bottom={0}
          // bg="pink.200"
        >
          <IconButton
            aria-label="left"
            onClick={onClickArrowLeft}
            display="flex"
            alignItems="center"
            justifyContent="center"
            w="28px"
            h="28px"
            variant="unstyled"
            icon={<AiOutlineLeftCircle size="28px" />}
            color="#FFFFFF"
            // _hover={{
            //   color: "#FFFFFF",
            // }}
            // _focus={{
            //   color: "#FFFFFF",
            // }}
          />
          <Divider orientation="vertical" h="35px" mx="33px" bg="#7A7A7A" />
          <IconButton
            aria-label="left"
            onClick={onClickArrowRight}
            display="flex"
            alignItems="center"
            justifyContent="center"
            w="28px"
            h="28px"
            variant="unstyled"
            icon={<AiOutlineRightCircle size="28px" />}
            color="#FFFFFF"
            // _hover={{
            //   color: "#FFFFFF",
            // }}
            // _focus={{
            //   color: "#FFFFFF",
            // }}
          />
        </Flex>
      </Flex>
      <Flex w="full" h="25%" align="center" justify="center">
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
      </Flex>
    </>
  );
};
