import { useRouter } from "next/router";
import { cookies } from "./store";
import { useUserAgent } from "next-useragent";
import { useEffect } from "react";

export const uuidv4 = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

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
    sessionId,
    firstVisitTime,
  };
}
