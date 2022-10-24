import {
  Box,
  HStack,
  IconButton,
  Image,
  Link,
  ListItem,
  UnorderedList,
  // useDisclosure,
} from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useRouter } from "next/router";

import { useHeaderStore } from "./headerState";
// import "@rainbow-me/rainbowkit/styles.css";

const navItems = [
  { label: "EthGifts Gallery", href: "#" },
  // { label: "数字凭证", href: "#" },
  { label: "文档↗", href: "#" },
  // { label: "我的文档", href: "#" },
];

const Header = () => {
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
      bgColor={basebgColor}

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
              src="/giftslog.png"
              h="50px"
              w="10vw"
              fit="contain"
              alt="ethgifts-logo"
            />
          }
          variant="unstyled"
          aria-label="ethgifts-logo"
        />

        {/* <Text fontSize="56px" fontWeight={400} fontFamily="Red Rose">
          EthGifts
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
            fontWeight={400}
            display={{ base: "none", md: "flex" }}
          >
            {navItems.map((item) => {
              return (
                <ListItem mr="44px" key={item.label} display="inline-block">
                  <Link
                    maxW={64}
                    fontSize="sm"
                    lineHeight={4}
                    display="block"
                    href={item.href}
                    fontFamily="PingFang SC"
                    color="#000000"
                  >
                    {item.label}
                  </Link>
                </ListItem>
              );
            })}
          </UnorderedList>
          <ConnectButton
            chainStatus="none"
            accountStatus="address"
            showBalance={false}
          />
        </HStack>
      </HStack>
    </Box>
  );
};
export { Header };
