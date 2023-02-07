import { userParams } from "../common/userParams";

class Tracking {
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
