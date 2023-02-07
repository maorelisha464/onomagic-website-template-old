import Script from "next/script";
import { useEffect } from "react";
import userParams from "../common/userParams";
import { cookies } from "../common/store";

const FacebookPixel = () => {
  const { utm_source } = userParams();
  const validUtmSource = ["facebook", "facebook-bc"];
  const shouldRun = validUtmSource.includes(utm_source);

  if (!shouldRun) return null;

  useEffect(() => {
    if (typeof window === 'undefined' || !window.fbq) return;
    const externalId = cookies.externalId();
    window.fbq("init", 500765417046434, { external_id: externalId });
    window.fbq("init", 1118320162091869, { external_id: externalId });
    window.fbq("init", 469637394515950, { external_id: externalId });
  }, []);

  return (
    <>
      <Script id="facebook-pixel" strategy="afterInteractive">
        {` (function (f, b, e, v, n, t, s) {
            if (f.fbq) return;
            n = f.fbq = function () { 
            n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
            };
            if (!f._fbq) f._fbq = n;
            n.push = n;
            n.loaded = !0;
            n.version = "2.0";
            n.queue = [];
            t = b.createElement(e);
            t.async = !0;
            t.src = v;
            s = b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t, s);
            })(window, document, "script", "//connect.facebook.net/en_US/fbevents.js");
      `}
      </Script>
    </>
  );
};

export default FacebookPixel;
