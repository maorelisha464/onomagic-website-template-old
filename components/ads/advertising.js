import React, { useEffect, useState } from 'react';
import { useAdContext } from '../../context/advertisingContext';
import userParams from '../common/userParams';
import { withGPTQueue, withPrebidQueue } from './adsQueue'
import { bidAdjustments, buildPrebidConfig, prebidEventsListeners, gptEventsListeners } from './advertisingHelpers';

export default function useAdvertising() {
    const { isReady, utm_campaign, utm_source } = userParams();
    const { } = useAdContext();
    let initFinished = false;
    const AMAZON_TIMEOUT = 3000;
    const PREBID_TIMEOUT = 3000;

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

    const amazonInit = () => {
        let apstag = window['apstag'];
        if (!apstag) {
            function q(c, r) {
                apstag._Q.push([c, r])
            }

            apstag = {
                init: function () {
                    q("i", arguments)
                }, fetchBids: function () {
                    q("f", arguments)
                }, setDisplayBids: function () {
                }, targetingKeys: function () {
                    return []
                }, _Q: []
            };
        };

        apstag.init({
            pubID: '4ec48844-41a0-42e9-bfb2-785374cd6a0a',
            adServer: 'googletag',
            schain: {
                complete: 1,
                ver: '1.0',
                nodes: [],
            },
        });
    }

    const initAdsVars = () => {
        if (typeof window === undefined) return;
        window.googletag = window.googletag || Object();
        window.googletag.cmd = window.googletag.cmd || [];
        window.pbjs = window.pbjs || Object();
        window.pbjs.que = window.pbjs.que || [];
    }

    const amazonAuction = async (apstag) => {
        const amazonSlots = [] // add slots logic
        const amazonBids = await new Promise((resolve, reject) => {
            if (!amazonSlots.length) {
                resolve([]);
                return;
            }
            apstag.fetchBids(
                {
                    slots: amazonSlots,
                    timeout: AMAZON_TIMEOUT,
                },
                bids => {
                    resolve(bids);
                }
            );
        });
        return amazonBids;
    }

    const prebidAuction = async (pbjs) => {
        const auctionResponse = {};
        await new Promise((res, rej) => {
            pbjs.requestBids({
                bidsBackHandler: (bids, timedOut, auctionId) => {
                    auctionResponse.auctionId = auctionId;
                    auctionResponse.bids = {}
                    const bidsEntries = Object.entries(bids);
                    if (bidsEntries) {
                        for (const [adUnitName, { bids }] of Object.entries(bids)) {
                            if (bids)
                                auctionResponse.bids[adUnitName] = bids;
                        }
                    }
                    res();
                },
                timeout: PREBID_TIMEOUT
            });
        })
        return auctionResponse;
    }

    const auction = async () => {
        if (window == undefined) return;
        const googletag = window.googletag;
        const pbjs = window.pbjs;
        const apstag = window.apstag;
        const [amazonBids, prebidBids] = await Promise.all([amazonAuction(apstag), prebidAuction(pbjs)])
        console.log('amazonBids:', amazonBids, 'prebidBids:', prebidBids)
        //pass bids to google
        await withGPTQueue(async () => {
            apstag.setDisplayBids();
            await withPrebidQueue(() => pbjs.setTargetingForGPTAsync())
        });
        googletag.pubads().refresh();
    }

    useEffect(() => {
        const initAdvertising = async () => {
            if (!isReady || initFinished) return;
            initAdsVars();
            await withGPTQueue(gptInit);
            await withPrebidQueue(prebidInit);
            amazonInit();
            initFinished = true;
        }
        initAdvertising();
    }, [isReady])

    return { auction }
}