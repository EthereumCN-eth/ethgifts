import type { VCType } from "@/state/sbt/types";
import { shortenName } from "@/utils/shortenName";

export const useVCParse = ({ vcStr }: { vcStr: string | undefined }) => {
  const parsedVc = vcStr ? (JSON.parse(vcStr) as VCType) : {};
  const issuerLongText = (parsedVc && parsedVc.issuer) || "";
  const issuerText =
    (parsedVc && parsedVc.issuer && shortenName(parsedVc.issuer)) || "--";
  const expressCountText =
    parsedVc?.credentialSubject?.ethContractMessage?.expressAmount || "--";

  const metaUrlText =
    parsedVc?.credentialSubject?.ethContractMessage?.metadataURI || "--";
  const reciverLongText =
    parsedVc?.credentialSubject?.ethContractMessage?.receiver ?? "";
  const reciverText =
    (parsedVc?.credentialSubject?.ethContractMessage?.receiver &&
      shortenName(parsedVc?.credentialSubject?.ethContractMessage?.receiver)) ||
    "--";

  const issueDate = parsedVc.issuanceDate
    ? new Date(parsedVc.issuanceDate).toLocaleDateString()
    : "--";

  // console.log("parsedVc", parsedVc);
  return {
    // parsedVc,
    issuerLongText,
    issuerText,
    expressCountText,
    metaUrlText,
    reciverText,
    reciverLongText,
    issueDate,
  };
};
