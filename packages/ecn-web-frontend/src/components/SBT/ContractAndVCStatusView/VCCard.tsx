import { VStack } from "@chakra-ui/react";

import { JSONBottomLabel } from "../JSONBottomLabel";
import type { VCType } from "../types";
import type { VCCheckItemType } from "../VCCheckListCard";
import { VCCheckListCard } from "../VCCheckListCard";
import { useIsAuth } from "@/state/global/hooks";
import { useAppSelector } from "@/state/reduxHooks";
import { selectors as sbtSelectors } from "@/state/sbt";

export const VCCard = () => {
  const isAuth = useIsAuth();
  const { loaded, records } = useAppSelector(sbtSelectors.selectAll);
  const contributionRecord =
    loaded && records && records[0] && records[0].signedVC
      ? (JSON.parse(records[0].signedVC) as VCType)
      : null;
  // console.log("contributionRecord", contributionRecord);
  const credsubjidText = contributionRecord
    ? contributionRecord.credentialSubject.id
    : "--";
  const expressCountText =
    contributionRecord?.credentialSubject.ethContractMessage.expressAmount ??
    "--";
  const metaUrl =
    contributionRecord?.credentialSubject.ethContractMessage.metadataURI ??
    "--";
  const issuerIdText = contributionRecord?.issuer ?? "--";
  const dateText = contributionRecord
    ? new Date(contributionRecord.issuanceDate).toLocaleDateString()
    : "--";
  const hasVcJson = isAuth && loaded && !!records;
  const type = contributionRecord ? contributionRecord.type.join(" ,") : "--";
  return (
    <VStack
      minH="220px"
      w="full"
      bgColor="#DDD9D7"
      borderRadius="8px"
      p="20px"
      position="relative"
      zIndex={1}
      overflow="hidden"
    >
      {(
        [
          {
            leftText: "Type",
            rightText: type,
            type: "text",
          },
          {
            leftText: "Credential Subject ID",
            rightText: credsubjidText,
            type: "text",
          },
          {
            leftText: "Express Count",
            rightText: expressCountText,
            type: "text",
          },
          {
            leftText: "Matadata URI",
            rightText: "archive on IPFS↗",
            href: metaUrl,
            type: "link",
          },
          {
            leftText: "Issuer ID",
            rightText: issuerIdText,
            type: "text",
          },
          {
            leftText: "Issuance Date",
            rightText: dateText,
            type: "text",
          },
        ] as VCCheckItemType[]
      ).map((item) => {
        return (
          <VCCheckListCard key={item.leftText} item={item} />
          // <HStack
          //   key={item.leftText}
          //   fontWeight={500}
          //   letterSpacing="0.06em"
          //   fontFamily="PingFang SC"
          //   fontSize="sm"
          //   w="full"
          //   justify="space-between"
          // >
          //   <Text color="#8E8D8C">{item.leftText}</Text>
          //   <Text w="50%" textAlign="end" color="#000000">
          //     {item.rightText}
          //   </Text>
          // </HStack>
        );
      })}
      <JSONBottomLabel hasVcJson={hasVcJson} />
    </VStack>
  );
};
