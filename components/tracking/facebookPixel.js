import { useEffect } from "react";
import userParams from '../common/userParams';


export default function FaceBookPixelInit() {
    const { isReady, utm_source } = userParams();
    useEffect(()=>{
        const validUtmSource = ['facebook', 'facebook-bc']
        if(validUtmSource.includes(utm_source))
            initFaceBookPixel();
    },[isReady])

    const initFaceBookPixel = () => {
        (function (f, b, e, v, n, t, s) {
            if (f.fbq) return;
            n = f.fbq = function () {
                n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
            };
            if (!f._fbq) f._fbq = n;
            n.push = n;
            n.loaded = !0;
            n.version = '2.0';
            n.queue = [];
            t = b.createElement(e);
            t.async = !0;
            t.src = v;
            s = b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t, s);
        })(window, document, 'script', '//connect.facebook.net/en_US/fbevents.js');
        const fbq = window.fbq;
        const external_id = '123';
        //fbq('init', window.facebookPixelId,{ external_id: external_id });
        fbq('init', 1118320162091869, { external_id: external_id }); // NEW PIX ID
        fbq('init', 469637394515950, { external_id: external_id }); // NEW PIX ID
    }
}
