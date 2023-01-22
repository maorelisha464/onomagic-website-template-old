import { cookies } from "../common/store";
import advertising from "./advertising";

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
        // consentManagement,
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

const getBidWinner = (data, html) => {
    if (data.isEmpty) {
        // No DFP creative
        return 'nobid';
    } else if (/pbjs\.renderAd/.test(html)) {
        // Prebid
        return 'prebid';
    } else if (/apstag\.renderImp/.test(html)) {
        // Amazon
        return 'amazon';
    } else {
        // AdX
        return 'adx';
    }
}

const calcEstimatedRevenue = (bidWinner, maxBid) => {
    if (bidWinner === 'nobid') return 0.1; // nobid from amazon and prebid
    if (bidWinner === 'adx') return maxBid.cpm * 1.55;
    return maxBid.cpm
}

const slotRenderEnded = (data) => {
    const slot = data?.slot
    if (!(slot && slot.bids)) return;
    const slotId = slot.getSlotElementId();
    const html = slot.getHtml();
    const bidWinner = getBidWinner(data, html); // [nobid, amazon, prebid, adx]
    const maxBid = slot.bids.reduce((currMaxBid, bid) => currMaxBid.cpm >= bid.cpm ? currMaxBid : bid, { cpm: 0, bidder: 'nobid' });
    console.log('bidWinner', bidWinner);
    console.log('maxBid', maxBid);
    console.log(slotId, slot.bids);
    const estRevenueCpm = calcEstimatedRevenue(bidWinner, maxBid);
    if (estRevenueCpm) {
        advertising.advertisingState.totalCpm += estRevenueCpm;
        cookies.setOno('totalCpm', advertising.advertisingState.totalCpm);
    }
}

export const gptEventsListeners = (pubads) => {
    pubads.addEventListener('slotRenderEnded', slotRenderEnded)
}