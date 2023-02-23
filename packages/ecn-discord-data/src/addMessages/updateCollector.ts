import { updateAddressApi } from "../apis/sbt-api";
import { COLLECTOR } from "../types";

export const updateCollector = async (collectors: COLLECTOR) => {
  try {
    await Promise.all([
      ...Object.keys(collectors).map(async (collector) => {
        if (collectors[collector].ethAddress !== "") {
          const collectorPayload = {
            ethAddress: collectors[collector].ethAddress,
            discordId: collectors[collector].discordId,
            discordName: collector,
            discordAvatar: collectors[collector].discordAvatar,
          };

          try {
            const updateStatus = await updateAddressApi(collectorPayload);
            if (updateStatus.success) {
              console.log(
                `address of ${collectorPayload.discordName} has been updated`
              );
            } else {
              throw new Error(
                `fail to update ethaddress of discordId: ${collectorPayload.discordId}`
              );
            }
          } catch (error) {
            console.log(error);
          }
        }
      }),
    ]);

    return {
      success: true,
      error: null,
    };
  } catch (error) {
    console.log(`fail to update all ethaddres: ${error}`);
    return {
      success: false,
      error: error,
    };
  }
};
