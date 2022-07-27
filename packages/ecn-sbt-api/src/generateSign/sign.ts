import { getCurrentNonce } from "./utils";
import * as config from "./config";

export const signExpressData = async (
  receiver: string,
  expressCounters: number
): Promise<string> => {
  // fill out typedData

  config.typedData.domain.chainId = (
    await config.alchemyProvider().getNetwork()
  ).chainId;
  config.typedData.domain.verifyingContract = config.ExpressSBT_ContractAddress;
  config.typedData.message.receiver = receiver;
  // config.typedData.message.metadataURI = await storageMetaData();
  config.typedData.message.expressCounters = expressCounters;
  config.typedData.message.nonces = await getCurrentNonce(receiver);

  const approver = config.Approver();

  const signature = approver._signTypedData(
    config.typedData.domain,
    config.typedData.types,
    config.typedData.message
  );

  return signature;
};
