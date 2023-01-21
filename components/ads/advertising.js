import React from 'react';
import { advertisingState } from '../common/store';
import userParams from '../common/userParams';
import { withGPTQueue, withPrebidQueue } from './adsQueue'
import { bidAdjustments, buildPrebidConfig, prebidEventsListeners, gptEventsListeners } from './advertisingHelpers';


const AMAZON_TIMEOUT = 3000;
const PREBID_TIMEOUT = 3000;

class Advertising {
    constructor() {
        const advertisingState = {
            selfRefreshAdUnits: [],
            renderedSelfRefreshAdUnits: [],
            renderedSelfRefreshSlots: [],
            newAdUnits: [],
            renderedAdUnits: [],
            renderedSlots: [],
            clearedSlots: [],
            newBids: [],
            allBids: []
        }
        this.advertisingState = advertisingState;
        this.initFinished = false;
    }

    gptInit = (utm_campaign = '123', utm_source = 'facebook') => {
        const pubads = window.googletag.pubads();
        utm_campaign && pubads.setTargeting('utm_campaign', utm_campaign);
        utm_source && pubads.setTargeting('utm_source', utm_source);
        pubads.disableInitialLoad();
        pubads.enableSingleRequest();
        gptEventsListeners(pubads);
        window.googletag.enableServices();
    }

    prebidInit = () => {
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

    amazonInit = () => {
        let apstag = window['apstag'];
        if (!apstag) {
            function q(c, r) {
                window.apstag._Q.push([c, r])
            }

            window.apstag = {
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

        window.apstag.init({
            pubID: '4ec48844-41a0-42e9-bfb2-785374cd6a0a',
            adServer: 'googletag',
            schain: {
                complete: 1,
                ver: '1.0',
                nodes: [],
            },
        });
    }

    initAdsVars = () => {
        if (typeof window === undefined) return;
        window.googletag = window.googletag || Object();
        window.googletag.cmd = window.googletag.cmd || [];
        window.pbjs = window.pbjs || Object();
        window.pbjs.que = window.pbjs.que || [];
    }

    defineSlot = ({ id, sizes, dfpPath }) => {
        const googletag = window.googletag;
        const slot = googletag
            .defineSlot(
                dfpPath,
                sizes,
                id
            )
            .addService(googletag.pubads());
        googletag.enableServices();
        googletag.display(id);
        return slot;
    }

    amazonAuction = async (apstag, id) => {
        const amazonSlotsArr = id ? this.advertisingState.selfRefreshAdUnits.filter(adUnit => adUnit.id === id) : this.advertisingState.newAdUnits
        const amazonSlots = amazonSlotsArr.map(adUnit => ({
            slotID: adUnit.id,
            slotName: adUnit.dfpPath,
            sizes: adUnit.sizes,
        }));

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

    prebidAuction = async (pbjs, id) => {
        const slotsForAuctionArr = id ? this.advertisingState.selfRefreshAdUnits.filter(adUnit => adUnit.id === id) : this.advertisingState.newAdUnits
        const slotsForAuction = slotsForAuctionArr.map(adUnit => ({
            code: adUnit.id,
            mediaTypes: {
                banner: {
                    sizes: adUnit.sizes
                }
            },
            bids: adUnit.bids
        }));
        const auctionResponse = {};
        await new Promise((res, rej) => {
            pbjs.requestBids({
                adUnits: slotsForAuction,
                bidsBackHandler: (bidsBack, timedOut, auctionId) => {
                    auctionResponse.auctionId = auctionId;
                    auctionResponse.bids = {}
                    if (bidsBack) {
                        const bidsEntries = Object.entries(bidsBack);
                        for (const [adUnitName, { bids }] of bidsEntries) {
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



    destroySlots = (id) => {
        const googletag = window.googletag;
        const state = this.advertisingState;
        if (id) {
            const slot = state.renderedSlots.find(slot => slot.getSlotElementId() === id);
            const rest = state.renderedSlots.filter(slot => slot.getSlotElementId() !== id);
            googletag.destroySlots([slot]);
            state.selfRefreshSlots = rest;
        } else {
            if (state.renderedSlots.length) {
                googletag.destroySlots(state.renderedSlots);
                state.renderedSlots = [];
            }
        }

    }

    stateAfterAuction = (slots, id) => {
        const state = this.advertisingState
        if (id) {
            state.renderedSelfRefreshSlots = [...state.renderedSelfRefreshSlots, ...slots];
            state.renderedSelfRefreshAdUnits = [...state.renderedSelfRefreshAdUnits, state.selfRefreshAdUnits.find(adUnit => adUnit.id === id)];
            state.selfRefreshAdUnits = state.selfRefreshAdUnits.filter(adUnit => adUnit.id !== id);
        } else {
            state.renderedSlots = [...state.renderedSlots, ...slots];
            state.renderedAdUnits = [...state.renderedAdUnits, ...state.newAdUnits];
            state.newAdUnits = [];
        }
    }

    runAuction = (id) => {
        const asyncFunc = async () => {
            try {
                await this.auction(id);
            } catch (e) {
                console.log('auction failed:', e)
            }
        }
        asyncFunc();
    }

    initAdvertising = async () => {
        if (this.initFinished) return;
        this.initAdsVars();
        await withGPTQueue(this.gptInit);
        await withPrebidQueue(this.prebidInit);
        this.amazonInit();
        this.initFinished = true;
    }

    auction = async (unitID) => {
        if (window == undefined) return;
        const checkSelfRefresh = unitID && this.advertisingState.selfRefreshAdUnits.length === 0
        const checkNewAdUnits = !unitID && this.advertisingState.newAdUnits.length === 0
        if (checkSelfRefresh || checkNewAdUnits) return;
        const googletag = window.googletag;
        const pbjs = window.pbjs;
        const apstag = window.apstag;
        const [amazonBids, prebidBids] = await Promise.all([this.amazonAuction(apstag, unitID), this.prebidAuction(pbjs, unitID)])
        //pass bids to google
        let slots;
        await withGPTQueue(async () => {
            //define slots
            const adUnit = this.advertisingState.selfRefreshAdUnits.find(adUnit => adUnit.id === unitID)
            slots = unitID ? [this.defineSlot(adUnit)] : this.advertisingState.newAdUnits.map(this.defineSlot);
            if (amazonBids?.length)
                apstag.setDisplayBids();
            if (prebidBids)
                await withPrebidQueue(() => pbjs.setTargetingForGPTAsync())

        });
        if (slots.length)
            googletag.pubads().refresh(slots);
        this.stateAfterAuction(slots, unitID);
        console.log('************************* auction finished ***************************')
    }
}

const advertising = new Advertising();

(async () => {
    await advertising.initAdvertising()
})()

export default advertising;
