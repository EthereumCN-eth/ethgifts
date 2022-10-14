import { Box, Button, Center, Flex, HStack, Image } from "@chakra-ui/react";
import { useState } from "react";

const RADIUS = 20;

export const Carousel = ({ artworks }: { artworks: string[] }) => {
  const [base, setBase] = useState(0);
  return (
    <Flex
      justify="center"
      align="center"
      w="100%"
      h="65%"
      bg="red.100"
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
        w="20vw"
        h="16vw"
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
              sx={{
                transformOrigin: "center",
                transform: `rotateY(${
                  eachDeg * ind
                }deg) translateZ(${RADIUS}vw) 
                ${
                  ((-base % total) + total) % total === ind
                    ? `scale(1)`
                    : `scale(0.5)`
                }
                `,
                transition: `transform 1s cubic-bezier(0.77, 0, 0.175, 1)`,
                backfaceVisibility: "hidden",
              }}
            >
              <Image src={img} fit="contain" position="relative" sx={{}} />
            </Box>
          );
        })}
      </Box>
      <Center position="absolute" bottom="0">
        <HStack>
          <Button
            onClick={() => {
              setBase((v) => v - 1);
            }}
          >{`<`}</Button>
          <Button
            onClick={() => {
              setBase((v) => v + 1);
            }}
          >{`>`}</Button>
        </HStack>
      </Center>
    </Flex>
  );
};
