const BASE_URL = "pupabc.com";

class Tracking {
  cacheBusting = () => Math.floor(Math.random() * 2147483647);

  initTracking = () => {
    if (typeof document === "undefined") return;
  };
  track = (subdomain, endPoint, eventName, data = {}) => {
    if (typeof document === "undefined") return;
    const img = new Image();
    const dataStr = Object.entries(data)
      .filter(([key, val]) => val)
      .map(([key, val]) => `${key}=${val}`)
      .join("&");
    img.src = `//${subdomain ? `${subdomain}.` : ""}${BASE_URL}/${endPoint}?event=${eventName}&${dataStr}&cb=${this.cacheBusting()}`;
  };
}

export default new Tracking();
