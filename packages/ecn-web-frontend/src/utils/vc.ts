import { verifyCredential } from "@spruceid/didkit-wasm";

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
