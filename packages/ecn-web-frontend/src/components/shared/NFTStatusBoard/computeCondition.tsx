import { useMemo } from "react";

import type { NFTState } from "@/state/nft";
import { useWhiteListAndClaim } from "@/state/nft/hooks";

export const renderConditionText = ({
  deliveryText,
  condition,
}: {
  deliveryText: {
    beforeText: string;
    toClaimText: string;
    hasClaimedText: string;
    noClaimedText: string;
    endedNoText: string;
  };
  condition: ReturnType<typeof computeCondition>;
}) => {
  const {
    beforeText,
    endedNoText,
    hasClaimedText,
    noClaimedText,
    toClaimText,
  } = deliveryText;

  if (condition === "before") return beforeText;
  if (condition === "claimed") return hasClaimedText;
  if (condition === "noClaim") return noClaimedText;
  if (condition === "toClaim") return toClaimText;
  if (condition === "endedNoClaim") return endedNoText;
  return "";
};
export const computeCondition = ({
  noClaimFile,
  isError,
  isLoading,
  claimed,
  inWhiteList,
  ended,
}: {
  noClaimFile: boolean;
  isError: boolean;
  isLoading: boolean;
  claimed: boolean;
  inWhiteList: boolean;
  ended: boolean;
}) => {
  // console.log("isErr", isError);
  // console.log("isLoading", isLoading);
  // console.log("noClaimFile", noClaimFile);
  if (noClaimFile) return "before";
  if (isError) return "error";
  if (!isError && isLoading) return "loading";
  if (claimed) return "claimed";

  //! isError && !isLoading && !claimed
  if (!inWhiteList && !ended) return "noClaim";
  if (!inWhiteList && ended) return "endedNoClaim";
  if (inWhiteList && ended) return "toClaim";
  if (inWhiteList && !ended) return "toClaim";
  return "never";
};

export const useConditionText = ({ nftData }: { nftData: NFTState }) => {
  const { contractReadObj, nftDeliveryData, status, infoDetail } = nftData;
  const merkleUrl = useMemo(() => {
    if (nftDeliveryData) {
      return nftDeliveryData.merkleUrl;
    }
    return undefined;
  }, [nftDeliveryData]);

  const { claimed, inWhiteList, isLoading, isError } = useWhiteListAndClaim({
    contractReadObj,
    merkleUrl,
  });

  const hasWhitelistFile = !!nftDeliveryData && !!merkleUrl;
  const noClaimFile = !hasWhitelistFile;

  const condition = useMemo(
    () =>
      computeCondition({
        noClaimFile,
        isError,
        isLoading,
        claimed,
        inWhiteList,
        ended: !status,
      }),
    [claimed, inWhiteList, isError, isLoading, noClaimFile, status]
  );
  const {
    deliveryText,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  } = infoDetail!;
  const conditionText = useMemo(
    () => renderConditionText({ condition, deliveryText }),
    [condition, deliveryText]
  );
  return {
    conditionText,
  };
};
