import { Button, Divider, Flex, IconButton } from "@chakra-ui/react";
import { useMemo } from "react";
import { AiOutlineLeftCircle, AiOutlineRightCircle } from "react-icons/ai";

import { BothSideImage } from "./BothSideImage";
import { useRouteByIndex } from "./helpers";
import { SelectedZoomPatchedImage } from "./SelectedZoomPatchedImage";
import { useZoomImageState } from "./useZoomImageState";

const RADIUS = 23;

export const Carousel = ({
  artworks = [],
  loaded,
  idNumber,
  pathname,
  // numNumber,
  // base,

  selectedIndex,
}: {
  artworks: string[];
  loaded: boolean | null;

  selectedIndex: number;
  idNumber: number | undefined;
  pathname: string;
  // numNumber: number | undefined;
}) => {
  const isLeftDisable = useMemo(() => {
    if (loaded) {
      return selectedIndex === 0;
    }
    return true;
  }, [loaded, selectedIndex]);
  const isRightDisable = useMemo(() => {
    if (loaded) {
      return selectedIndex === artworks.length - 1;
    }
    return true;
  }, [artworks?.length, loaded, selectedIndex]);
  const { clickNext, clickPrev } = useRouteByIndex({
    id: idNumber,
    selectedIndex,
    pathname,
  });

  const isMultiple = useMemo(() => {
    // console.log("loaded", loaded);
    // console.log("artworks.length", artworks.length);
    if (loaded) {
      return artworks.length > 1;
    }
    return false;
  }, [artworks.length, loaded]);
  // console.log("isMultiple", isMultiple);

  const { handleZoomChange, height, imgRef, width, isZoomed } =
    useZoomImageState();

  if (!loaded) return null;
  return (
    <Flex
      justify="center"
      align="center"
      w="100%"
      h="100%"
      position="relative"
      sx={{
        perspective: "100vw",
        transformOrigin: "center",
      }}
    >
      {/*  */}
      <SelectedZoomPatchedImage
        width={width}
        height={height}
        isZoomed={isZoomed}
        handleZoomChange={handleZoomChange}
        img={artworks[selectedIndex]}
      />
      <Button
        variant="unstyled"
        position="absolute"
        onClick={() => handleZoomChange(true)}
        sx={{
          // eslint-disable-next-line sonarjs/no-duplicate-string
          transformStyle: "preserve-3d",
          transform: `translateZ(-${RADIUS}vw) rotateY(${
            -selectedIndex * (360 / artworks.length)
          }deg) scale(${isMultiple ? 1 : 1.04}) `,
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
              ref={ind === selectedIndex ? imgRef : undefined}
              key={img}
              eachDeg={eachDeg}
              myIndex={ind}
              img={img}
              selectedIndex={selectedIndex}
              zDepth={RADIUS}
            />
          );
        })}
      </Button>
      {isMultiple && (
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
      )}
    </Flex>
  );
};
