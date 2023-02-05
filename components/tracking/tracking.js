class Tracking {
  cacheBusting = () => Math.floor(Math.random() * 2147483647);

  initTracking = () => {
    if (typeof document === "undefined") return;
  };

  trackSessionInit = () => {
    // eq = trackSession
    console.log("******* trackSessionInit *******");
    // const data = {
    //   session,
    //   utm_source: utmSource,
    //   utm_campaign: utmCampaign,
    //   articleId: window.gallery.articleId,
    //   display: window.gallery.display,
    //   domain: window.gallery.domain,
    //   version: window.galleryScriptVersion,
    //   testing: window.gallery.AB_testing,
    //   country: window.gallery.country,
    //   pbc: window.gallery.pbc ? 1 : 0,
    //   videotest: window.videoTestPlayer || "",
    // };

    // this.track("vv", "prepixel", "SessionInit", data);
  };

  trackPageView = (page) => {
    // eq = trackPageView
    console.log(`******* trackPageView: ${page} *******`);
  };

  trackPageValue = () => {};
  trackPageVideoValue = () => {};

  track = (subdomain, endPoint, eventName, data = {}) => {
    if (typeof document === "undefined") return;
    const img = new Image();
    const dataStr = Object.entries(data)
      .filter(([key, val]) => val)
      .map(([key, val]) => `${key}=${val}`)
      .join("&");
    img.src = `//${subdomain ? `${subdomain}.` : ""}${process.env.NEXT_PUBLIC_HOST}/${endPoint}?event=${eventName}&${dataStr}&cb=${this.cacheBusting()}`;
  };
}

export default new Tracking();
