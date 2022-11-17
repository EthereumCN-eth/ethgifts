import type { LinkProps } from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import type { LinkProps as NextLinkProps } from "next/link";
import NextLink from "next/link";

type ChakraLinkAndNextProps = NextLinkProps & LinkProps;

export function ChakraNextLink({
  href,
  children,
  ...props
}: ChakraLinkAndNextProps) {
  return (
    <NextLink href={href} passHref scroll={false}>
      <Link {...props}>{children}</Link>
    </NextLink>
  );
}
