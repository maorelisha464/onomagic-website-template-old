import React from 'react';
import { cookies } from '../common/store';
// import { staticUserParams } from '../common/userParams';
import { withGPTQueue, withPrebidQueue } from './adsQueue'
import { bidAdjustments, buildPrebidConfig, prebidEventsListeners, gptEventsListeners } from './advertisingHelpers';
import amazonBidsMap from './amazonBidsMap';




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
            allBids: [],
            totalCpm: cookies.getOno('totalCpm') || 0
        }
        this.advertisingState = advertisingState;
        this.initFinished = false;
    }

    gptInit = () => {
        const pubads = window.googletag.pubads();
        if (cookies.getOno('utm_campaign'))
            pubads.setTargeting('utm_campaign', cookies.getOno('utm_campaign'));
        if (cookies.getOno('utm_source'))
            pubads.setTargeting('utm_source', cookies.getOno('utm_source'));
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
        if (typeof window === 'undefined') return;
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

    amazonAuction = async (apstag, unitID) => {
        const amazonSlotsArr = unitID ? this.advertisingState.selfRefreshAdUnits.filter(adUnit => adUnit.id === unitID) : this.advertisingState.newAdUnits
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

    prebidAuction = async (pbjs, unitID) => {
        const slotsForAuctionArr = unitID ? this.advertisingState.selfRefreshAdUnits.filter(adUnit => adUnit.id === unitID) : this.advertisingState.newAdUnits
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

    destroySlots = async (unitID) => {
        const googletag = window.googletag;
        const state = this.advertisingState;
        await withGPTQueue(() => {
            if (unitID) {
                const slot = state.renderedSlots.find(slot => slot.getSlotElementId() === unitID);
                const rest = state.renderedSlots.filter(slot => slot.getSlotElementId() !== unitID);
                googletag.destroySlots([slot]);
                state.selfRefreshSlots = rest;
            } else {
                if (state.renderedSlots.length) {
                    googletag.destroySlots(state.renderedSlots);
                    state.renderedSlots = [];
                }
            }
        })
    }

    stateAfterAuction = (slots, unitID) => {
        const state = this.advertisingState
        if (unitID) {
            state.renderedSelfRefreshSlots = [...state.renderedSelfRefreshSlots, ...slots];
            state.renderedSelfRefreshAdUnits = [...state.renderedSelfRefreshAdUnits, state.selfRefreshAdUnits.find(adUnit => adUnit.id === unitID)];
            state.selfRefreshAdUnits = state.selfRefreshAdUnits.filter(adUnit => adUnit.id !== unitID);
        } else {
            state.renderedSlots = [...state.renderedSlots, ...slots];
            state.renderedAdUnits = [...state.renderedAdUnits, ...state.newAdUnits];
            state.newAdUnits = [];
        }
    }

    runAuction = (unitID) => {
        const asyncFunc = async () => {
            try {
                await this.auction(unitID);
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

    setBids = (amazonBids, prebidBids, slots) => {
        const obj = {};
        for (const bid of amazonBids) {
            if (bid.amzniid && amazonBidsMap[bid.amznbid]) {
                obj[bid.slotID] = obj[bid.slotID] || [];
                const slotIDbids = obj[bid.slotID];
                slotIDbids.push({
                    bidder: 'amazon',
                    cpm: parseFloat(amazonBidsMap[bid.amznbid])
                })
            }
        }

        for (const [slotID, bids] of Object.entries(prebidBids.bids)) {
            bids.forEach(bid => {
                obj[slotID] = obj[slotID] || [];
                const slotIDbids = obj[slotID];
                slotIDbids.push({
                    bidder: 'prebid',
                    demand: bid.bidderCode,
                    cpm: parseFloat(bid.cpm)
                })
            })
        }

        const lastAuction = {
            prebidAuctionId: prebidBids.auctionId,
            allBids: obj
        }

        this.advertisingState.newBids.push(lastAuction)

        slots.forEach(slot => {
            const slotID = slot.getSlotElementId();
            slot.bids = obj[slotID] || [];
        })

        console.log('maor123', slots)
    }

    auction = async (unitID) => {
        if (typeof window == 'undefined') return;
        const checkSelfRefresh = unitID && this.advertisingState.selfRefreshAdUnits.length === 0
        const checkNewAdUnits = !unitID && this.advertisingState.newAdUnits.length === 0
        if (checkSelfRefresh || checkNewAdUnits) return;
        const googletag = window.googletag;
        const pbjs = window.pbjs;
        const apstag = window.apstag;
        const [amazonBids, prebidBids] = await Promise.all([this.amazonAuction(apstag, unitID), this.prebidAuction(pbjs, unitID)]);
        console.log('auction bids:', amazonBids, prebidBids)
        //pass bids to google
        let slots;
        await withGPTQueue(async () => {
            //define slots
            const adUnit = this.advertisingState.selfRefreshAdUnits.find(adUnit => adUnit.id === unitID)
            slots = unitID ? [this.defineSlot(adUnit)] : this.advertisingState.newAdUnits.map(this.defineSlot);
            this.setBids(amazonBids, prebidBids, slots);
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
})();

export default advertising;
