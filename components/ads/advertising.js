import Script from 'next/script';
import React, { useEffect } from 'react';
import userParams from '../common/userParams';
import { withGPTQueue, withPrebidQueue } from './adsQueue'

export default function Advertising({ }) {
    const { isReady, utm_campaign, utm_source } = userParams();
    const gptInit = () => {
        const pubads = window.googletag.pubads();
        utm_campaign && pubads.setTargeting('utm_campaign', utm_campaign);
        utm_source && pubads.setTargeting('utm_source', utm_source);
        pubads.disableInitialLoad();
        pubads.enableSingleRequest();
        // pubads.addEventListener('slotRenderEnded', data => {
        //     const slotId = data && data.slot && data.slot.getSlotElementId();
        //     try {

        //         if (!slotId) throw new Error('No slot id in data');
        //         if (!data.slot.adParams) throw new Error(`No adParams in slot '${slotId}'`);

        //         const { page, loop, amazonBids, prebidBids } = data.slot.adParams;
        //         sreLog('adParams', data.slot.adParams);

        //         if (slotId !== 'div-gpt-sticky') {
        //             this.pageRenderedTimeStamp[page || 0] = new Date().getTime();
        //         }

        //         const maxBid = getMaxBid({ amazonBids, prebidBids });
        //         sreLog('maxBid', maxBid);

        //         let adxWinner = false;
        //         let winningBidCpm = maxBid ? maxBid.cpm : 0;
        //         sreLog('winningBidCpm', winningBidCpm);

        //         const html = data.slot.getHtml();

        //         if (data.isEmpty) {
        //             // No DFP creative
        //             sreLog('No DFP creative', maxBid || 'No winning bid', 'Set winningBidCpm = 0');
        //             winningBidCpm = 0;
        //         } else if (/pbjs\.renderAd/.test(html)) {
        //             // Prebid
        //             sreLog('winner', 'Prebid', { html });
        //         } else if (/apstag\.renderImp/.test(html)) {
        //             // Amazon
        //             sreLog('winner', 'Amazon', { html });
        //         } else {
        //             // AdX
        //             sreLog('winner', 'Adx');
        //             adxWinner = true;
        //         }

        //         if (this.isUtm) {
        //             tracking.trackCustomPageValue({
        //                 dfpAdUnitCode: data.slot.dfpAdUnitCode,
        //                 page,
        //                 loop,
        //                 winningBidCpm,
        //                 adxWinner,
        //             });

        //             if (adxWinner || winningBidCpm > 0) {
        //                 tracking.trackDebugPageValue(maxBid, {
        //                     dfpAdUnitCode: data.slot.dfpAdUnitCode,
        //                     winningBidCpm,
        //                     adxWinner,
        //                     page,
        //                     slotId,
        //                 });
        //             }
        //         }

        //         // unlock cached bid if it was not rendered
        //         if (window.gallery.pbc) {
        //             const slotTargeting = data.slot.getTargetingMap();
        //             if (data.slot.prebidCode && slotTargeting) {
        //                 const prebidAdId = slotTargeting.hb_adid && slotTargeting.hb_adid[0];
        //                 const bidResponses = window.pbjs.getBidResponsesForAdUnitCode(data.slot.prebidCode).bids || [];
        //                 const slotBid = bidResponses.find(b => b.adId === prebidAdId);
        //                 if (slotBid && slotBid.status !== 'rendered') {
        //                     sreLog('Unlock cached bid', slotBid);
        //                     slotBid.locked = false;
        //                 }
        //             }
        //         }

        //         const ono_clk = window.googletag.pubads().getTargeting('ono_clk');

        //         if (!ono_clk.length) {
        //             const queryString = `div[id='${slotId}'] iframe[id^='google_ads_iframe_']`;
        //             const frame = document.querySelector(queryString);

        //             if (!!frame) {
        //                 const innerDocument = frame.contentDocument || frame.contentWindow.document;
        //                 const frameId = frame.id;
        //                 const isDblClickDetected = innerDocument.querySelector('#confirmedClickVisible');

        //                 if (!!isDblClickDetected) {
        //                     window.ga('send', 'event', 'cfclk', frameId);
        //                     Advertising[queueForGPT](() => window.googletag.pubads().setTargeting('ono_clk', '1'));
        //                 }
        //             }
        //         }
        //     } catch (err) {
        //         sreLog('error', err);
        //     }
        // });
        window.googletag.enableServices();
    }

    const initAdsLibs = () => {
        if (typeof window === undefined) return;
        window.googletag = window.googletag || Object();
        window.googletag.cmd = window.googletag.cmd || [];
        window.pbjs = window.pbjs || Object();
        window.pbjs.que = window.pbjs.que || [];
    }

    const prebidInit = () => {

    }

    useEffect(() => {
        if (!isReady) return;
        initAdsLibs();
        withGPTQueue(gptInit);
        withPrebidQueue(prebidInit)
    }, [isReady])

    return (
        <>
            <Script src={"https://securepubads.g.doubleclick.net/tag/js/gpt.js"} strategy="beforeInteractive" async />
            <Script src={"/onomagic-prebid7.13.0.js"} strategy="beforeInteractive" async />
        </>
    )
}