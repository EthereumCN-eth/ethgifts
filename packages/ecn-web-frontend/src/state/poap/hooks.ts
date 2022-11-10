import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { ecnApiClient } from "@/apis";

export const useFetchPoapEvent = ({
  address,
}: {
  address: string | undefined;
}) => {
  return useQuery(
    ["getAllPoapEventByAddress", address],
    () => ecnApiClient.getAllPoapEventByAddress({ address }),
    {
      enabled: !!address,
    }
  );
};

export const useHasPoapEvent = ({
  eventId,
  address,
}: {
  eventId: number;
  address: string | undefined;
}) => {
  const { data, isSuccess } = useFetchPoapEvent({ address });
  const [hasPoap, setHasPoap] = useState(false);

  useEffect(() => {
    if (data?.success) {
      //   console.log("data.data?.includes(eventId)", data.data?.includes(eventId));
      //   console.log("eventId", eventId);
      //   console.log("data.data", data.data);
      setHasPoap(data.data?.includes(eventId) ?? false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.success, eventId, isSuccess]);

  return {
    hasPoap,
  };
};
