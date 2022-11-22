import { useRouter } from "next/router";
import { useEffect } from "react";

import { NEXT_PUBLIC_GOOGLE_ANALYTICS } from "@/constants";

export const useGoogleAnalyticsPageViewTrack = () => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      window.gtag("config", NEXT_PUBLIC_GOOGLE_ANALYTICS, {
        page_path: url,
      });
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
};
