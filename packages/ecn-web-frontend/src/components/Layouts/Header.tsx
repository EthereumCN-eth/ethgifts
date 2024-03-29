import {
  Box,
  HStack,
  IconButton,
  Image,
  ListItem,
  UnorderedList,
  // useDisclosure,
} from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useRouter } from "next/router";

import { ChakraNextLink } from "../ChakraNextLink";

import { useHeaderStore } from "./headerState";
// import "@rainbow-me/rainbowkit/styles.css";

const navItems = [
  { label: "ETHGifts Gallery", href: "/#ecn-gallery", isBlank: false },
  // { label: "数字凭证", href: "#" },
  { label: "文档↗", href: "https://docs.ethgifts.com/", isBlank: true },
  // { label: "我的文档", href: "#" },
];

const Header = ({ headerBgColor }: { headerBgColor?: string }) => {
  const { basebgColor, textColor } = useHeaderStore(
    (state) => state.headerValues
  );
  const router = useRouter();
  return (
    <Box
      as="header"
      display="flex"
      flexDirection="row"
      alignItems="center"
      width="full"
      h="120px"
      bgColor={headerBgColor || basebgColor}

      // css={css`
      //   width: 100%;
      //   display: flex;
      //   height: 100px;
      //   align-items: center;
      //   justify-content: center;
      //   flex-direction: row;
      //   background-color: whitesmoke;
      // `}
    >
      <HStack
        width="full"
        spacing={11}
        alignItems="center"
        px={65}
        justify="space-between"
        zIndex={100}
      >
        <IconButton
          onClick={() => {
            router.push("/");
          }}
          icon={
            <Image
              src="/ethgifts-logo.svg"
              h={["40px", "40px", "60px", `${(3.5 / 81) * 70}vw`]}
              w={["35px", "35px", "52px", "3.5vw"]}
              fit="contain"
              alt="ethgifts-logo"
            />
          }
          variant="unstyled"
          aria-label="ethgifts-logo"
        />

        {/* <Text fontSize="56px" fontWeight={400} fontFamily="Red Rose">
          ETHGifts
        </Text> */}

        <HStack
          flex={1}
          align="center"
          sx={{
            "[data-rk] &  div button": {
              fontWeight: 400,
            },
          }}
          display={{ base: "none", md: "flex" }}
        >
          <UnorderedList
            justifyContent="flex-end"
            styleType="none"
            // display={"flex"}
            flex={1}
            alignItems="center"
            color={textColor}
            fontFamily="PingFang SC"
            fontWeight={500}
            display={{ base: "none", md: "flex" }}
          >
            {navItems.map((item) => {
              return (
                <ListItem mr="44px" key={item.label} display="inline-block">
                  <ChakraNextLink
                    maxW={64}
                    fontSize="sm"
                    lineHeight={4}
                    display="block"
                    href={item.href}
                    fontFamily="PingFang SC"
                    color={textColor}
                    target={item.isBlank ? "_blank" : "_self"}
                  >
                    {item.label}
                  </ChakraNextLink>
                </ListItem>
              );
            })}
          </UnorderedList>
          <Box
            sx={{
              "&& div button": {
                fontWeight: 500,
              },
              // "&& div": {
              //   fontWeight: 500,
              // },
            }}
          >
            <ConnectButton
              chainStatus="full"
              accountStatus="address"
              showBalance={false}
            />
          </Box>
        </HStack>
      </HStack>
    </Box>
  );
};
export { Header };
