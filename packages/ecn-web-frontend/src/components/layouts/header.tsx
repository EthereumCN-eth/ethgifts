import {
  Box,
  HStack,
  IconButton,
  Link,
  ListItem,
  Text,
  UnorderedList,
  useDisclosure,
} from "@chakra-ui/react";
import { css } from "@emotion/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { HamburgerIcon, CloseIcon, AddIcon } from "@chakra-ui/icons";

const navItems = [
  { label: "EthGifts Gallery", href: "#" },
  { label: "数字凭证", href: "#" },
  { label: "文档", href: "#" },
  { label: "我的文档", href: "#" },
];

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box
      as={"header"}
      display={"flex"}
      flexDirection={"row"}
      alignItems={"center"}
      width={"full"}
      h={"120px"}

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
        width={"full"}
        spacing={11}
        alignItems={"center"}
        px={65}
        justify={"space-between"}
        zIndex={100}
      >
        <Text fontSize={"56px"} fontWeight={400} fontFamily={"Red Rose"}>
          EthGifts
        </Text>

        <HStack
          flex={1}
          align={"center"}
          sx={{
            "[data-rk] &  div button": {
              fontWeight: 400,
            },
          }}
          display={{ base: "none", md: "flex" }}
        >
          <UnorderedList
            justifyContent={"flex-end"}
            styleType="none"
            // display={"flex"}
            flex={1}
            alignItems={"center"}
            color={"#000000"}
            fontFamily={"PingFang SC"}
            fontWeight={400}
            display={{ base: "none", md: "flex" }}
          >
            {navItems.map((item) => {
              return (
                <ListItem mr={"44px"} key={item.label} display={"inline-block"}>
                  <Link
                    maxW={64}
                    fontSize="sm"
                    lineHeight={4}
                    display="block"
                    href={item.href}
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
