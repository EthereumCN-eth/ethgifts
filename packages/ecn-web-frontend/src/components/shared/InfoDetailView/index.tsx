import { Box, Divider, Flex, Text } from "@chakra-ui/react";

import { MultipleImagesSection } from "./MultipleImagesSection";
import { ParagraphsSection } from "./ParagraphsSection";
import { SingleImageSection } from "./SingleImageSection";
import type { DetailInfoType } from "./types";
import { VideoSection } from "./VideoSection";

export const InfoDetailView = ({
  loaded,
  detailInfoOfNFT,
}: {
  loaded: boolean;
  detailInfoOfNFT: DetailInfoType | undefined;
}) => {
  if (!detailInfoOfNFT) {
    return (
      <Flex
        w="100%"
        minH="900px"
        bgColor="rgba(255, 255, 255, 0.8)"
        pt="100px"
        px="23%"
        direction="column"
      />
    );
  }
  return (
    <Flex
      w="100%"
      minH="900px"
      bgColor="rgba(255, 255, 255, 0.8)"
      pt="100px"
      px="23%"
      direction="column"
    >
      {/*  */}
      {/*  */}
      <Text
        fontSize="32px"
        color="#000000"
        fontFamily="PingFang SC"
        fontWeight={600}
        mb="12px"
      >
        {detailInfoOfNFT.title}
      </Text>
      <Text
        fontWeight={400}
        color="#B9B9B9"
        fontSize="xl"
        fontFamily="PingFang SC"
        mb="64px"
      >
        {detailInfoOfNFT.subTitle}
      </Text>
      {detailInfoOfNFT.dataSection.map((dataItem, index) => {
        return (
          <Flex
            w="full"
            justify="start"
            direction="row"
            key={dataItem.heading}
            mb="64px"
          >
            {/*  */}
            <Box w="7.9vw">
              <Text
                w="7.9vw"
                fontSize="20px"
                fontWeight="600"
                fontFamily="PingFang SC"
                mb="10px"
              >
                {dataItem.heading}
              </Text>
              <Text
                w="7.9vw"
                fontSize="md"
                fontWeight="600"
                fontFamily="PingFang SC"
                letterSpacing="0.02em"
                color="#B9B9B9"
              >
                {dataItem.subHeading}
              </Text>
            </Box>

            <Box height="60px" ml="3.75vw" mr="0.625vw">
              <Divider orientation="vertical" />
            </Box>
            <Text
              w="5vw"
              color="#B9B9B9"
              fontSize="sm"
              fontWeight={500}
              mr="4.114vw"
            >
              {`0${index + 1}`}
            </Text>

            {dataItem.type === "html" && (
              <ParagraphsSection loaded={loaded} dataItem={dataItem} />
            )}
            {loaded &&
              dataItem.type === "image" &&
              dataItem.data.length === 1 && (
                <SingleImageSection loaded={loaded} dataItem={dataItem} />
              )}
            {loaded &&
              dataItem.type === "image" &&
              dataItem.data.length > 1 && (
                <MultipleImagesSection dataItem={dataItem} loaded={loaded} />
              )}
            {loaded && dataItem.type === "video" && (
              <VideoSection dataItem={dataItem} loaded={loaded} />
            )}
            {/* <Text /> */}
          </Flex>
        );
      })}
    </Flex>
  );
};
