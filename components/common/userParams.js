import { useRouter } from 'next/router'
import { cookies } from './store';
import { useUserAgent } from 'next-useragent'
import { useEffect } from 'react';



const uuidv4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0,
            v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

const globalParams = {
    sessionId: cookies.getOno('sessionId') || uuidv4(),
    firstVisitTime: cookies.getOno('firstVisitTime') || new Date().toISOString(),
}

export default function useUserParams(uaStr) {
    const UA = useUserAgent(uaStr ? uaStr : null);
    const router = useRouter();
    const { sessionId, firstVisitTime } = globalParams;
    const {
        query: {
            utm_campaign,
            utm_source,
            utm_term
        }
    } = router;

    useEffect(() => {
        cookies.setOno('utm_source', (utm_source || ''));
        cookies.setOno('utm_term', (utm_term || ''));
        cookies.setOno('utm_campaign', (utm_campaign || ''));
        cookies.setOno('sessionId', sessionId);
        cookies.setOno('firstVisitTime', firstVisitTime);
    }, [])


    return {
        utm_campaign,
        utm_source,
        country: cookies.get('CF-COUNTRY') || 'unknown',
        browser: UA.browser || 'unknown',
        device: UA.isMobile ? 'mobile' : UA.isDesktop ? 'desktop' : 'tablet',
        isIOS: UA.isIos,
        isBot: UA.isBot,
        os: UA.os || 'unknown',
        ua: UA.source || '',
        sessionId,
        firstVisitTime
    };
}