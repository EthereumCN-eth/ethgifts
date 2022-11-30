import { updateAddressApi } from "../apis/sbt-api";
import { COLLECTOR } from "../types";

export const updateCollector = async (collectors: COLLECTOR) => {
  await Promise.all([
    Object.keys(collectors).map(async (collector) => {
      if (collectors[collector].ethAddress !== "") {
        const collectorPayload = {
          ethAddress: collectors[collector].ethAddress,
          discordId: collectors[collector].discordId,
          discordName: collector,
        };

        try {
          const updateStatus = await updateAddressApi(collectorPayload);
          console.log(
            `address of ${collectorPayload.discordName} has been updated`
          );
        } catch (error) {
          console.log(`fail to update ethaddress: ${error}`);
        }
      }
    }),
  ]);
};
