import { useRouter } from "next/router";
import { cookies } from "./store";
import { useUserAgent } from "next-useragent";
import { useEffect } from "react";
import { uuidv4 } from "./utils";

const globalParams = {
  sessionId: cookies.getOno("sessionId") || uuidv4(),
  firstVisitTime: cookies.getOno("firstVisitTime") || new Date().toISOString(),
};

let userCookiesSet = false;

export default function useUserParams(uaStr) {
  const UA = useUserAgent(uaStr ? uaStr : null);
  const router = useRouter();
  const { sessionId, firstVisitTime } = globalParams;
  const {
    query: { utm_campaign, utm_source, utm_term },
  } = router;

  useEffect(() => {
    utm_source && cookies.setOno("utm_source", utm_source || "");
    utm_term && cookies.setOno("utm_term", utm_term || "");
    utm_campaign && cookies.setOno("utm_campaign", utm_campaign || "");
    if (!userCookiesSet) {
      cookies.setOno("sessionId", sessionId);
      cookies.setOno("firstVisitTime", firstVisitTime);
      userCookiesSet = true;
    }
  }, []);

  return {
    utm_campaign: utm_campaign || cookies.getOno("utm_campaign"),
    utm_source: utm_source || cookies.getOno("utm_source"),
    utm_term: utm_term || cookies.getOno("utm_term"),
    country: cookies.get("CF-COUNTRY") || "unknown",
    browser: UA.browser || "unknown",
    device: UA.isMobile ? "mobile" : UA.isDesktop ? "desktop" : "tablet",
    isMobile: UA.isMobile,
    isDesktop: UA.isDesktop,
    isTablet: UA.isTablet,
    isIOS: UA.isIos,
    isBot: UA.isBot,
    os: UA.os || "unknown",
    ua: UA.source || "",
    sessionId,
    firstVisitTime,
  };
}
