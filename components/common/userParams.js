import { useRouter } from "next/router";
import { cookies } from "./store";
import { useUserAgent } from "next-useragent";
import { useEffect } from "react";
import { uuidv4 } from "./utils";
import tracking from "../tracking/tracking";


const setSession = () => {
  if (cookies.getOno("sessionId")) return;
  const sessionId = uuidv4();
  cookies.setOno("sessionId", sessionId);
  cookies.setOno("firstVisitTime", new Date().toISOString());
  tracking.trackSessionInit();
};

let initPageParams = false;

export default function useUserParams(uaStr) {
  const UA = useUserAgent(uaStr ? uaStr : null);
  const router = useRouter();
  const {
    query: { utm_campaign, utm_source, utm_term },
  } = router;

  useEffect(() => {
    // if(!(utm_campaign || utm_source || utm_term)) return;
    if (initPageParams) return;
    else initPageParams = true;
    utm_source && cookies.setOno("utm_source", utm_source);
    utm_term && cookies.setOno("utm_term", utm_term);
    utm_campaign && cookies.setOno("utm_campaign", utm_campaign);
    setSession();
  }, []);

  const isMobile = typeof window !== "undefined" ? Math.min(window.screen.width, window.screen.height) < 768 : UA.isMobile;
  const calcUtmSource = utm_source || cookies.getOno("utm_source");
  const calcUtmCampaign = utm_campaign || cookies.getOno("utm_campaign");
  const calcUtmTerm = utm_term || cookies.getOno("utm_term");

  return {
    utm_campaign: calcUtmCampaign,
    utm_source: calcUtmSource,
    utm_term: calcUtmTerm,
    country: cookies.get("CF-COUNTRY") || "unknown",
    browser: UA.browser || "unknown",
    device: isMobile ? "mobile" : UA.isDesktop ? "desktop" : "tablet",
    isUTM: !!(calcUtmCampaign && calcUtmSource),
    isMobile: isMobile,
    isDesktop: UA.isDesktop,
    isTablet: UA.isTablet,
    isIOS: UA.isIos,
    isBot: UA.isBot,
    os: UA.os || "unknown",
    ua: UA.source || "",
    sessionId: cookies.getOno("sessionId"),
    firstVisitTime: cookies.getOno("firstVisitTime"),
  };
}
