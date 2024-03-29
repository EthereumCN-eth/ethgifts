import { verifyCredential } from "@spruceid/didkit-wasm";
import { verifyTicket } from "ecn-eip712vc/dist/verifyTicket";
// import { verifyTicket } from "ecn-eip712vc/src/";

import type { VCType } from "@/state/sbt/types";

type VerifyResult = {
  checks: string[];
  errors: string[];
  warnings: string[];
};

export const verifyVC = async (vcStr: string | undefined) => {
  if (!vcStr) return false;
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

type ParseVCReturnType =
  | {
      success: true;
      data: {
        expressAmount: number;
        metadataURI: string;
        receiver: string;
        signature: string;
        verifyingContract: string;
        chainId: number;
        name: string;
        version: number;
      };
      error: null;
    }
  | {
      success: false;
      data: null;
      error: Error;
    };
export const parseVCForPayload = (
  vcStr: string | undefined
): ParseVCReturnType => {
  try {
    if (!vcStr)
      return {
        success: false,
        data: null,
        error: Error("falsy vc string"),
      };
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
      verifyingContract &&
      name &&
      version
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

export type ParseAndVerifyVCReturnType =
  | {
      success: true;
      data: {
        expressAmount: number;
        metadataURI: string;
        receiver: string;
        signature: string;
        verifyingContract: string;
        chainId: number;
        name: string;
        version: number;
      };
    }
  | {
      success: false;
      data: null;
    };

export const parseVCForPayloadAndVerifyVC = async (
  vcStr: string | undefined
): Promise<ParseAndVerifyVCReturnType> => {
  const { success, data } = parseVCForPayload(vcStr);
  if (success) {
    const verified = await verifyVC(vcStr);
    if (verified) {
      return {
        success: true,
        data,
      };
    } else {
      return {
        success: false,
        data: null,
      };
    }
  } else {
    return {
      success: false,
      data: null,
    };
  }
};

export const verifyVCTicket = async (
  vcStr: string | undefined,
  expectedVerifyPubKey: string | undefined
) => {
  if (!vcStr || !expectedVerifyPubKey) return false;
  const { success, data } = parseVCForPayload(vcStr);
  if (!success || !data) return false;
  const {
    chainId,
    expressAmount,
    metadataURI,
    name,
    receiver,
    signature,
    verifyingContract,
    version,
  } = data;
  return verifyTicket({
    domainData: {
      chainId,
      name,
      verifyingContract,
      version: version.toString(),
    },
    messageData: {
      expressAmount,
      metadataURI,
      receiver,
    },
    ticketSignedData: signature,
    expectedVerifyPubKey,
  });
};
