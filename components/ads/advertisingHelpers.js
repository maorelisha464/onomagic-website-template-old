

export const bidAdjustments = (bidAdjustMap) => {
    return Object.entries(bidAdjustMap).reduce((prev, [key, val]) => {
        return {
            ...prev,
            [key]: {
                bidCpmAdjustment: function (bidCpm, bid) {
                    return bidCpm * val;
                }
            }
        }
    }, {})
}


export const buildPrebidConfig = (configProps) => {
    const priceGranularity = {
        buckets: [
            {
                precision: 2,
                min: 0,
                max: 1,
                increment: 0.01,
            },
            {
                precision: 2,
                min: 1,
                max: 5,
                increment: 0.02,
            },
            {
                precision: 2,
                min: 5,
                max: 10,
                increment: 0.1,
            },
        ],
    }

    const consentManagement = {
        gdpr: {
            cmpApi: 'iab',
            timeout: 8000,
            allowAuctionWithoutConsent: true,
            defaultGdprScope: true,
        },
        usp: {
            cmpApi: 'iab',
            timeout: 8000,
        },
    }

    const userSync = {
        userIds: [
            {
                name: 'amxId',
                storage: {
                    name: 'amxId',
                    type: 'html5',
                    expires: 14,
                },
            },
            {
                name: 'sharedId',
                storage: {
                    type: 'cookie',
                    name: '_pubcid', // create a cookie with this name
                    expires: 180,
                },
            },
            {
                name: 'identityLink',
                params: {
                    pid: 'REPLACE_ME', // Set your real identityLink placement ID here
                },
                storage: {
                    type: 'cookie',
                    name: 'idl_env', // create a cookie with this name
                    expires: 7, // cookie can last for seven days
                },
            },
        ],
        syncEnabled: true,
        pixelEnabled: true,
        syncsPerBidder: 5,
        syncDelay: 3000,
        auctionDelay: 0,
        iframeEnabled: true,
        pubcid: {
            enable: true,
            expInterval: 525600,
        },
        filterSettings: {
            iframe: {
                bidders: '*',
                filter: 'include',
            },
        },
    }

    const sizeConfig = [
        {
            mediaQuery: '(min-width: 1025px)',
            sizesSupported: [
                [728, 90],
                [300, 250],
                [300, 600],
                [320, 50],
                [160, 600],
                [1, 1],
            ],
            labels: ['display'],
        },
        {
            mediaQuery: '(min-width: 768px) and (max-width: 1024px)',
            sizesSupported: [
                [728, 90],
                [300, 250],
                [300, 600],
                [320, 50],
                [160, 600],
                [1, 1],
            ],
            labels: ['tablet'],
        },
        {
            mediaQuery: '(min-width: 0px) and (max-width: 767px)',
            sizesSupported: [
                [300, 250],
                [300, 600],
                [728, 90],
                [320, 50],
                [160, 600],
                [1, 1],
            ],
            labels: ['mobile'],
        },
    ]

    return {
        priceGranularity,
        bidderTimeout: 3000,
        enableSendAllBids: false,
        consentManagement,
        userSync,
        // sizeConfig,
    }
}

export const prebidEventsListeners = (pbjs) => {
    pbjs.onEvent('noBid', data => {
        // if (!window.gallery.noBid) window.gallery.noBid = {};
        // const { auctionId, adUnitCode, bidder } = data;
        // if (!window.gallery.noBid[auctionId]) window.gallery.noBid[auctionId] = {};
        // if (!window.gallery.noBid[auctionId][adUnitCode]) window.gallery.noBid[auctionId][adUnitCode] = [];
        // window.gallery.noBid[auctionId][adUnitCode].push({
        //     auctionId,
        //     adUnitCode,
        //     bidder,
        // });
    });
    pbjs.onEvent('bidResponse', data => {
        // if (data && data.adUnitCode && !noCacheFetchBidders.has(data.bidder)) {
        //     BidCacher.setBySize([data]);
        // }
    });
}

export const gptEventsListeners = (pubads) => {
    pubads.addEventListener('slotRenderEnded', data => {
        const slot = data?.slot
        if (!slot) return;
        const slotId = slot.getSlotElementId();
        const html = slot.getHtml();
        let winningBidType;
        let winningBidCpm = 0;
        if (data.isEmpty) {
            // No DFP creative
            winningBidType = 'nobid';
        } else if (/pbjs\.renderAd/.test(html)) {
            // Prebid
            winningBidType = 'prebid';
        } else if (/apstag\.renderImp/.test(html)) {
            // Amazon
            winningBidType = 'amazon';
        } else {
            // AdX
            winningBidType = 'adx';
        }
    })
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

}