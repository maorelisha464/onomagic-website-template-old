import { cookies } from "../common/store";
import { userParams } from "../common/userParams";
import { facebookPixelIds } from "./facebookPixel";
class Tracking {
  constructor() {
    this.reported_fb_points = {};
  }

  cacheBusting = () => Math.floor(Math.random() * 2147483647);

  trackSessionInit = () => {
    const { utm_source, utm_campaign, utm_term, article_id } = userParams;
    console.log(`******* trackSessionInit *******`);
    const data = {
      utm_source,
      utm_campaign,
      utm_term,
      article_id,
      domain: process.env.NEXT_PUBLIC_HOST,
    };

    this.track("FBClick", data);
  };

  trackPageView = (page) => {
    const { utm_source, utm_campaign, utm_term, article_id } = userParams;
    console.log(`******* trackPageView: ${page} *******`);
    const data = {
      utm_source,
      utm_campaign,
      utm_term,
      article_id,
      page,
      domain: process.env.NEXT_PUBLIC_HOST,
    };

    this.track("PageView", data);
    this.trackPageViewToPartners(data);
  };

  trackPageValue = (value, page, isWinnigBid, videoValue) => {
    const { utm_source, utm_campaign, utm_term, article_id } = userParams;
    console.log(`******* trackPageValue: page-${page}, value-${value}, type-${videoValue ? "videoValue" : "displayValue"} *******`);
    const data = {
      utm_source,
      utm_campaign,
      utm_term,
      article_id,
      page,
      value,
      domain: process.env.NEXT_PUBLIC_HOST,
    };

    if (!videoValue) {
      data.ad_slots = 1;
      data.winning_bids = isWinnigBid ? 1 : 0;
    }

    this.track(videoValue ? "PageVideoValue" : "PageValue", data);
    this.trackPageValueToPartners(data);
  };

  trackPageViewToPartners = (data) => {
    this.fireFacebookEvent("PageView", data);
  };

  trackPageValueToPartners = (data) => {
    this.fireFacebookEvent("ViewContent", data);
    this.fireFacebookEvent("Points", data);
  };

  fireFacebookEvent = (eventName, data) => {
    const { fbclid, isDesktop, external_id } = userParams;
    if (typeof window === "undefined" || !window.fbq) return;
    const fbq = window.fbq;
    const totalCpm = cookies.getOno("totalCpm") || 0;
    data.total_rpm = totalCpm;
    const eventID = `${eventName}_${Date.now().toString()}_${Math.random().toString().slice(2, 20)}`;

    if (eventName === "PageView") {
      fbq("track", "PageView", data, { eventID: eventID });
    }

    /////////  need to implement pageRpm

    // if (eventName === "ViewContent") {
    //   const t = isDesktop ? 10 : 5;
    //   if (pageRpm > t) fbq("track", "ViewContent", data, { eventID: eventID });
    // }

    if (eventName === "Points") {
      const currentTotalValue = totalCpm / 1000;
      const fbPointsArray = [0.02, 0.03, 0.04, 0.05, 0.06, 0.07, 0.08, 0.09, 0.1, 0.11, 0.12, 0.13, 0.14, 0.15, 0.16, 0.17, 0.18, 0.19, 0.2, 0.21, 0.22, 0.23, 0.24, 0.25];
      fbPointsArray.forEach((point) => {
        const lastReportedPoint = cookies.getOno("lastReportedPoint") || 0;
        if (currentTotalValue > point && point > lastReportedPoint /*&& !this.reported_fb_points[point]*/) {
          // this.reported_fb_points[point] = true;
          cookies.setOno("lastReportedPoint", point);
          const pointsData = { currency: "USD", value: point };
          fbq("trackCustom", "Points", pointsData, { eventID: eventID });

          // send FB Conversions API request using Cloudflare worker
          facebookPixelIds.forEach((id) => {
            const requestData = {
              eventName: "Points",
              pixelId: id,
              external_id: external_id,
              eventId: eventID,
              url: window.location.href,
              fbclid,
              data: JSON.stringify(pointsData),
            };
            const queryString = Object.entries(requestData)
              .map(([key, val]) => encodeURIComponent(key) + "=" + encodeURIComponent(val))
              .join("&");
            fetch(`//${process.env.NEXT_PUBLIC_HOST}/api/fb-events?${queryString}`);
          });
        }
      });
    }
  };

  track = (eventName, data = {}) => {
    if (typeof document === "undefined") return;
    const img = new Image();
    const dataStr = Object.entries(data)
      .filter(([key, val]) => typeof val !== "undefined" && val !== null)
      .map(([key, val]) => `${key}=${val}`)
      .join("&");
    img.src = `//vv.pupabc.com/prepixel?event=${eventName}&${dataStr}&cb=${this.cacheBusting()}`;
  };
}

export default new Tracking();
