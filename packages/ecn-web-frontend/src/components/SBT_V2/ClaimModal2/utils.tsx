import { ChakraNextLink } from "@/components/ChakraNextLink";
import { shortenName } from "@/utils/shortenName";

export const ipfsToGateWayLink = (ipfslink: string) => {
  return ipfslink.replace("ipfs://", "https://ethereumcn.mypinata.cloud/ipfs/");
};

export const didToEthAddr = (id: string) => {
  return id.replace(`did:pkh:eth:`, "");
};

export const IssueIDLink = ({ issuerLongText }: { issuerLongText: string }) => {
  return (
    <ChakraNextLink
      target="_blank"
      href={`https://optimistic.etherscan.io/address/${didToEthAddr(
        issuerLongText
      )}`}
      textDecoration="underline"
    >
      <span>{shortenName(didToEthAddr(issuerLongText))}</span>
    </ChakraNextLink>
  );
};

export const ReciverTextLink = ({
  reciverLongText,
}: {
  reciverLongText: string;
}) => {
  return (
    <ChakraNextLink
      target="_blank"
      href={`https://optimistic.etherscan.io/address/${reciverLongText}`}
      textDecoration="underline"
    >
      <span>{shortenName(reciverLongText)}</span>
    </ChakraNextLink>
  );
};
