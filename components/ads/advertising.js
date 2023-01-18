import React, { useEffect, useState } from 'react';
import userParams from '../common/userParams';
import { withGPTQueue, withPrebidQueue } from './adsQueue'
import { bidAdjustments, buildPrebidConfig, prebidEventsListeners, gptEventsListeners } from './advertisingHelpers';

export default function useAdvertising() {
    const { isReady, utm_campaign, utm_source } = userParams();
    const [advertising, setAdvertising] = useState({})
    let initFinished = false;
    const gptInit = () => {
        const pubads = window.googletag.pubads();
        utm_campaign && pubads.setTargeting('utm_campaign', utm_campaign);
        utm_source && pubads.setTargeting('utm_source', utm_source);
        pubads.disableInitialLoad();
        pubads.enableSingleRequest();
        gptEventsListeners(pubads);
        window.googletag.enableServices();
    }

    const prebidInit = () => {
        const pbjs = window.pbjs;
        const bidAdjustmentsMap = {
            underdogmedia: 0.77,
            noBid: 0.94,
            sharethrough: 0.87,
            triplelift: 0.96,
            pubmaticnew: 0.97,
            onoapn: 0.95,
            yahoossp: 0.91,
            onetag: 0.95,
            openx: 0.96,
            rubicon: 0.95,
            sovrn: 0.96,
            yieldmo: 0.96,
            amx: 0.93,
            ix: 0.92,
            rhythmone: 0.97,
            '33across': 0.98
        };
        const configProps = {};
        const config = buildPrebidConfig(configProps)
        const bidderSettings = bidAdjustments(bidAdjustmentsMap);
        pbjs.setConfig(config);
        pbjs.bidderSettings = bidderSettings;
        prebidEventsListeners(pbjs);
    }

    const initAdsVars = () => {
        if (typeof window === undefined) return;
        window.googletag = window.googletag || Object();
        window.googletag.cmd = window.googletag.cmd || [];
        window.pbjs = window.pbjs || Object();
        window.pbjs.que = window.pbjs.que || [];
    }

    const auction = () => {
        if (window == undefined) return;
        const pbjs = window.pbjs;
        const googletag = window.googletag;
        pbjs.requestBids({
            bidsBackHandler: () => {
                withGPTQueue(function () {
                    withPrebidQueue(function () {
                        pbjs.setTargetingForGPTAsync();
                        googletag.pubads().refresh();
                    });
                });
            },
            timeout: 3000
        });
    }

    useEffect(() => {
        const initAdvertising = async () => {
            if (!isReady || initFinished) return;
            initAdsVars();
            await withGPTQueue(gptInit);
            await withPrebidQueue(prebidInit);
            initFinished = true;
        }
        initAdvertising();
    }, [isReady])

    return { advertising, auction }
}