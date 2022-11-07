import { useQuery } from "@tanstack/react-query";
import type { useContractRead } from "wagmi";

import { useNFTRead } from "@/state/gallery/hooks";

const fetchClaimFile = async ({ merkleUrl }: { merkleUrl: string }) => {
  const res = await fetch(merkleUrl);
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

export const useWhiteListAndClaim = ({
  contractReadObj,
  merkleUrl,
}: {
  merkleUrl: string;
  contractReadObj: Parameters<typeof useContractRead>[0];
}) => {
  useNFTRead(contractReadObj);
  useQuery({
    queryKey: ["merkleUrl", merkleUrl],
    queryFn: () => fetchClaimFile({ merkleUrl }),
  });
};
