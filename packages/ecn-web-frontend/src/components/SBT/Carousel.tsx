import { Box, Divider, Flex, IconButton } from "@chakra-ui/react";
import { AiOutlineLeftCircle, AiOutlineRightCircle } from "react-icons/ai";

import { BothSideImage } from "./BothSideImage";
import { useComputedProgressVales } from "./helpers";
import { ProgressBar } from "./ProgressBar";

const RADIUS = 23;

export const Carousel = ({
  artworks = [],
  levels,
  itemTexts,
  base,

  selectedIndex,
  clickPrev,
  clickNext,
  clickDot,
  isLeftDisable,
  isRightDisable,
  expressCount,
}: {
  artworks: string[];
  levels: number[];
  itemTexts: string[] | null;
  base: number;
  // setBase: Dispatch<SetStateAction<number>>;
  selectedIndex: number;
  clickPrev: () => void;
  clickNext: () => void;
  clickDot: (index: number) => void;
  isLeftDisable: boolean;
  isRightDisable: boolean;
  expressCount: number | null;
}) => {
  const progressValues = useComputedProgressVales(levels);
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
            // eslint-disable-next-line sonarjs/no-duplicate-string
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

            return (
              <BothSideImage
                key={img}
                eachDeg={eachDeg}
                myIndex={ind}
                img={img}
                selectedIndex={selectedIndex}
                zDepth={RADIUS}
              />
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
            onClick={clickPrev}
            display="flex"
            alignItems="center"
            justifyContent="center"
            w="28px"
            h="28px"
            variant="unstyled"
            icon={<AiOutlineLeftCircle size="28px" />}
            color="#FFFFFF"
            disabled={isLeftDisable}
          />
          <Divider orientation="vertical" h="35px" mx="33px" bg="#7A7A7A" />
          <IconButton
            aria-label="left"
            onClick={clickNext}
            display="flex"
            alignItems="center"
            justifyContent="center"
            w="28px"
            h="28px"
            variant="unstyled"
            icon={<AiOutlineRightCircle size="28px" />}
            color="#FFFFFF"
            disabled={isRightDisable}
          />
        </Flex>
      </Flex>
      <Flex w="full" h="25%" align="center" justify="center">
        <ProgressBar
          itemTexts={itemTexts}
          progressValues={progressValues}
          selectedIndex={selectedIndex}
          onClickDot={clickDot}
          expressCount={expressCount}
          levels={levels}
        />
      </Flex>
    </>
  );
};
