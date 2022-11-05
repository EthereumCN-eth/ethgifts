import { verifyCredential } from "@spruceid/didkit-wasm";

import type { VCType } from "@/state/sbt/types";

type VerifyResult = {
  checks: string[];
  errors: string[];
  warnings: string[];
};

export const verifyVC = async (vcStr: string) => {
  const verifyOptionsString = "{}";
  const verifyResultStr = await verifyCredential(
    `${vcStr}`,
    verifyOptionsString
  );
  const res = JSON.parse(verifyResultStr) as VerifyResult;
  // eslint-disable-next-line no-console
  console.log("res", res);
  return res.errors.length === 0;
};
export type ParseVCForPayloadDataType = ReturnType<
  typeof parseVCForPayload
>["data"];

export const parseVCForPayload = (vcStr: string) => {
  try {
    const vc = JSON.parse(vcStr) as VCType;
    const expressAmount =
      vc?.credentialSubject?.ethContractMessage?.expressAmount;
    const metadataURI = vc?.credentialSubject?.ethContractMessage?.metadataURI;
    const receiver = vc?.credentialSubject?.ethContractMessage?.receiver;
    const signature = vc?.credentialSubject?.ethContractMessageSignData;
    const chainId = vc?.credentialSubject?.ethContract?.chainId;
    const name = vc?.credentialSubject?.ethContract?.name;
    const verifyingContract =
      vc?.credentialSubject?.ethContract?.verifyingContract;
    const version = vc?.credentialSubject?.ethContract?.version;
    if (
      expressAmount &&
      metadataURI &&
      receiver &&
      signature &&
      chainId &&
      verifyingContract
    ) {
      return {
        success: true,
        data: {
          expressAmount,
          metadataURI,
          receiver,
          signature,
          verifyingContract,
          chainId,
          name,
          version,
        },
        error: null,
      };
    }
    return {
      success: false,
      data: null,
      error: Error("Missing payload Error"),
    };
  } catch (e) {
    return {
      success: false,
      error: Error("Parsing Error"),
      data: null,
    };
  }
};
