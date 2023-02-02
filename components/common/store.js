const ONO_COOKIE_KEY = "_gallery_data";
import { uuidv4 } from "../common/userParams";
const sessionStorage = {
  getItem: (key) => {
    const value = window?.sessionStorage?.[key];
    return value ? value : false;
  },
  setItem: (key, value) => {
    window?.sessionStorage?.setItem(key, value);
  },
};

const cookies = {
  get: (key) => {
    if (typeof document === "undefined") return;
    var nameEQ = key + "=";
    try {
      var ca = document.cookie.split(";");
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === " ") c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) {
          return c.substring(nameEQ.length, c.length) || "";
        }
      }
      return;
    } catch (e) {
      console.log(e);
      return;
    }
  },
  set: (key, value, hoursTtl) => {
    if (typeof document === "undefined") return;
    let date = new Date();
    const ttl = hoursTtl ? 1000 * 60 * hoursTtl : 30 * 60 * 1000;
    date.setTime(date.getTime() + ttl);
    let expires = "; expires=" + date.toGMTString();
    document.cookie = key + "=" + value + expires + "; path=/";
  },
  setOno: (key, value) => {
    const onoCookieObj = cookies.getOno();
    onoCookieObj[key] = value;
    cookies.set(ONO_COOKIE_KEY, encodeURIComponent(JSON.stringify(onoCookieObj)));
  },
  getOno: (key) => {
    const onoCookie = cookies.get(ONO_COOKIE_KEY);
    const onoCookieObj = onoCookie ? JSON.parse(decodeURIComponent(onoCookie)) : {};
    return key ? onoCookieObj[key] : onoCookieObj;
  },
};

export { sessionStorage, cookies };
