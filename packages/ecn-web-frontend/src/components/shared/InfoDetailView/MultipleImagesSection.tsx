import { Box, Flex, IconButton, Image } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

import { ZoomImageWrapper } from "../ZoomImageWrapper";

import type { InfoImageType } from "./types";

// type ArrElement<ArrType extends readonly unknown[]> =
//   ArrType extends readonly (infer ElementType)[] ? ElementType : never;
export const MultipleImagesSection = ({
  dataItem,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  loaded = true,
}: {
  dataItem: InfoImageType;
  loaded: boolean;
}) => {
  const [{ isLeftDisabled, isRightDisabled, selectedInd }, setDataState] =
    useState<{
      selectedInd: number;
      isLeftDisabled: boolean;
      isRightDisabled: boolean;
    }>({
      isLeftDisabled: true,
      isRightDisabled: false,
      selectedInd: 0,
    });

  const [clickedInd, setClickInd] = useState(0);
  const [containerWidth, setContainerWidth] = useState<{
    cssString: "39.4vw - 85px";
    pxNumber: number | null;
  }>({
    cssString: "39.4vw - 85px",
    pxNumber: null,
  });
  useEffect(() => {
    setContainerWidth({
      cssString: "39.4vw - 85px",
      pxNumber: window.innerWidth * 0.394 - 85,
    });
  }, []);

  const imageStillWidthNumber = useMemo(
    () => Math.max(Math.floor((containerWidth.pxNumber ?? 0) / 112) - 1, 0),
    [containerWidth.pxNumber]
  );
  useEffect(() => {
    if (dataItem.data.length < imageStillWidthNumber + 1) {
      setDataState((state) => ({
        ...state,
        isLeftDisabled: true,
        isRightDisabled: true,
      }));
    }
  }, [dataItem.data.length, imageStillWidthNumber]);

  const onClickLeft = () => {
    if (dataItem.data.length < imageStillWidthNumber + 1) {
      return setDataState((state) => ({
        ...state,
        selectedInd: state.selectedInd - 1,
        isRightDisabled: true,
        isLeftDisabled: true,
      }));
    }
    if (selectedInd === 1) {
      return setDataState((state) => ({
        ...state,
        selectedInd: state.selectedInd - 1,
        isLeftDisabled: true,
        isRightDisabled: false,
      }));
    } else {
      return setDataState((state) => ({
        ...state,
        selectedInd: state.selectedInd - 1,
        isRightDisabled: false,
      }));
    }
    // setDataState((state) => ({ ...state, selectedInd: state.selectedInd - 1 }));
  };
  const onClickRight = () => {
    if (dataItem.data.length < imageStillWidthNumber + 1) {
      return setDataState((state) => ({
        ...state,
        selectedInd: state.selectedInd + 1,
        isRightDisabled: true,
        isLeftDisabled: true,
      }));
    }
    if (selectedInd === dataItem.data.length - 2 - imageStillWidthNumber) {
      return setDataState((state) => ({
        ...state,
        selectedInd: state.selectedInd + 1,
        isRightDisabled: true,
        isLeftDisabled: false,
      }));
    } else {
      return setDataState((state) => ({
        ...state,
        selectedInd: state.selectedInd + 1,
        isLeftDisabled: false,
      }));
    }
  };
  const onClickImgIndex = (index: number) => {
    setClickInd(index);
  };
  // console.log("selected", selectedInd);
  // console.log("isLeftDisabled", isLeftDisabled);
  // console.log("isRightDisabled", isRightDisabled);
  //   console.log("isLeftDisabled", isLeftDisabled);
  return (
    <Box w="39.4vw">
      <ZoomImageWrapper>
        <Image
          w="36vw"
          h="400px"
          objectFit="contain"
          src={dataItem.data[clickedInd].src}
          alt={dataItem.data[clickedInd].alt}
        />
      </ZoomImageWrapper>
      <Flex
        direction="row"
        align="center"
        mt="12px"
        w="39.4vw"
        h="136px"
        // p={0}
        bgColor="rgba(255, 255, 255, 0.4)"
        py="16px"
        borderRadius="16px"
      >
        <IconButton
          variant="ghost"
          aria-label="left"
          icon={<AiOutlineLeft size="15px" />}
          marginRight="auto"
          onClick={onClickLeft}
          disabled={isLeftDisabled}
        />
        <Flex
          alignItems="center"
          w="calc(39.4vw - 85px)"
          position="relative"
          overflow="hidden"
          h="136px"
        >
          {dataItem.data.map((item, index) => {
            return (
              <IconButton
                position="absolute"
                // zIndex={100}
                key={`${item.src}`}
                variant="unstyled"
                w="100px"
                h="135px"
                transition="all 1s cubic-bezier(0.77, 0, 0.175, 1), left 0.3s linear"
                left={`${(index - selectedInd) * 112}px`}
                mr="12px"
                aria-label={item.alt}
                onClick={() => onClickImgIndex(index)}
                borderRadius={0}
                icon={
                  <Image
                    _hover={{
                      opacity: 0.85,
                    }}
                    src={item.src}
                    py="16px"
                    w="100px"
                    h="135px"
                    objectFit="cover"
                    opacity={index === clickedInd ? 1 : 0.4}
                  />
                }
              />
            );
          })}
        </Flex>
        <IconButton
          variant="ghost"
          aria-label="right"
          marginLeft="auto"
          icon={<AiOutlineRight size="15px" />}
          onClick={onClickRight}
          disabled={isRightDisabled}
        />
      </Flex>
    </Box>
  );
};
