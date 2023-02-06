import React, { useEffect, useRef, useState, useCallback } from "react";
import styled from "styled-components";
import advertising from "./advertising";

const AdWrapperTitle = styled.div`
  &:before,
  &:after {
    background-color: #d9d9d9;
    content: "";
    display: inline-block;
    height: 1px;
    position: relative;
    vertical-align: middle;
    width: 13%;
  }

  text-align: center;
  color: #999;
  font-family: open sans;
  font-size: 9px;
  font-weight: 400;
  text-transform: uppercase;
  overflow: hidden;
  line-height: 11px;
  padding: 5px 0;
`;
const AdWrapper = styled.div`
  background: #f1f1f1;
  margin: 30px auto;
  text-align: center;
  width: ${(props) => (props.width ? `${props.width}px` : "300px")};
  height: ${(props) => (props.height ? `${props.height}px` : "250px")};
`;
let adsCounter = 0;

const ads = {
  maor: {
    sizes: [[728, 90]],
    dfpPath: "/22029607954/olux_728x90_is",
    bids: [
      {
        bidder: "appnexus",
        params: {
          placementId: 13144370,
        },
      },
      {
        bidder: "nobid",
        params: {
          siteId: "22842767328",
        },
      },
      {
        bidder: "vidazoo",
        labelAny: ["display"],
        params: {
          cId: "5e8a274a3256fc00174e1c33",
          pId: "59ac17c192832d0011283fe3",
        },
      },
      {
        bidder: "33across",
        params: {
          siteId: "c4-DmCzBGr7ynGrkHcnnVW",
          productId: "siab",
        },
      },
      {
        bidder: "brightcom",
        params: {
          publisherId: "20731",
        },
      },
      {
        bidder: "onetag",
        params: {
          pubId: "698d141faf72afe",
        },
      },
      {
        bidder: "openx",
        params: {
          unit: "558603526",
          delDomain: "onomagic-d.openx.net",
        },
      },
      {
        bidder: "yahoossp",
        params: {
          // 728x90
          dcn: "8a96945001858511fded2a24b3920142",
          pos: "8a96945001858511fded2a2b779d0146",
        },
        labelAny: ["display"],
      },
      {
        bidder: "amx",
        params: { tagId: "b25vbWFnaWMtcm9uLmNvbQ" },
      },
      {
        bidder: "sharethrough",
        params: {
          pkey: "fKnrgAPLEXSYdd5FAFTzZmSV",
        },
      },
      {
        bidder: "grid",
        params: {
          uid: "379289",
        },
      },
      {
        bidder: "medianet",
        params: {
          cid: "8CU68898U",
          crid: "649786786",
        },
      },
    ],
  },
  maor2: {
    sizes: [[300, 250]],
    dfpPath: "/22029607954/OHB_300x250_IS",
    bids: [
      {
        bidder: "appnexus",
        params: {
          placementId: 13144370,
        },
      },
      {
        bidder: "nobid",
        params: {
          siteId: "22842767328",
        },
      },
      {
        bidder: "vidazoo",
        labelAny: ["display"],
        params: {
          cId: "5e8a274a3256fc00174e1c33",
          pId: "59ac17c192832d0011283fe3",
        },
      },
      {
        bidder: "33across",
        params: {
          siteId: "cIcrBQzBGr7ynGrkHcnnVW",
          productId: "siab",
        },
      },
      {
        bidder: "brightcom",
        params: {
          publisherId: "20731",
        },
      },
      {
        bidder: "onetag",
        params: {
          pubId: "698d141faf72afe",
        },
      },
      {
        bidder: "openx",
        params: {
          unit: "558603559",
          delDomain: "onomagic-d.openx.net",
        },
      },
      {
        bidder: "yahoossp",
        params: {
          // 300x250
          dcn: "8a96945001858511fded2a24b3920142",
          pos: "8a969ce401858511f4a12a2acfb90156",
        },
        labelAny: ["display"],
      },
      {
        bidder: "amx",
        params: { tagId: "b25vbWFnaWMtcm9uLmNvbQ" },
      },
      {
        bidder: "sharethrough",
        params: {
          pkey: "SB22jIKiEApDRYoEe6mT8FCl",
        },
      },
      {
        bidder: "grid",
        params: {
          uid: "379292",
        },
      },
      {
        bidder: "medianet",
        params: {
          cid: "8CU68898U",
          crid: "593348823",
        },
      },
    ],
  },
  maor3: {
    sizes: [[320, 50]],
    dfpPath: "/22029607954/ODFT_320X50_728X90_STICKY_IS",
    bids: [
      {
        bidder: "yieldmo",
        params: {
          placementId: "2687872682556334165", // 320x50
        },
      },
      {
        bidder: "onopubmatic",
        params: {
          publisherId: "159477",
          adSlot: "dailyfitnesstip_320x50_",
        },
      },
      {
        bidder: "gumgum",
        params: {
          slot: "88260",
          zone: "2tcxfb87",
        },
      },
      {
        bidder: "nobid",
        params: {
          siteId: "22149860525",
        },
      },
      {
        bidder: "33across",
        params: {
          siteId: "bbKgAcfgWr64oHaKlId8sQ",
          productId: "siab",
        },
      },
      {
        bidder: "sonobi",
        params: {
          placement_id: "047b0cb9d7e154d61256",
          ad_unit: "/22029607954/ODFT_320X50_728X90_STICKY_IS",
        },
      },
      {
        bidder: "sovrn",
        params: {
          tagid: "794569",
        },
      },
      {
        bidder: "onetag",
        params: {
          pubId: "698d141faf72afe",
        },
      },
      {
        bidder: "onoapn",
        params: {
          placementId: 20604668,
        },
      },
      {
        bidder: "underdogmedia",
        params: {
          siteId: 15924,
        },
      },
      {
        bidder: "openx",
        params: {
          unit: "543981875",
          delDomain: "onomagic-d.openx.net",
          customFloor: 0.03,
        },
      },
      {
        bidder: "yahoossp",
        params: {
          // 320x50
          dcn: "8a9698c3017777fced36febcdaa700d4",
          pos: "8a96959b017777fcf5e8febd252000ba",
        },
        labelAny: ["mobile"],
      },
      {
        bidder: "ix",
        params: {
          siteId: "730453",
          size: [320, 50],
        },
      },
    ],
  },
};

const destroyAd = (id) => {
  if (typeof window === "undefined") return;
  const findSlot = (slot) => slot.getSlotElementId() === id;
  const filterSlot = (slot) => slot.getSlotElementId() !== id;
  const filterObj = (obj) => obj.id !== id;
  const state = advertising.advertisingState;
  let slot = state.renderedSlots.find(findSlot) || state.renderedSelfRefreshSlots.find(findSlot);
  state.renderedSlots = state.renderedSlots.filter(filterSlot);
  state.renderedSelfRefreshSlots = state.renderedSelfRefreshSlots.filter(filterSlot);
  if (slot) {
    window.googletag?.destroySlot && window.googletag.destroySlot([slot]);
  }
  state.newAdUnits = state.newAdUnits.filter(filterObj);
  state.selfRefreshAdUnits = state.selfRefreshAdUnits.filter(filterObj);
};

function Ad({ adId, width, height, selfRefresh, withoutWrapper, className }) {
  const [selfRefreshCount, setSelfRefreshCount] = useState(0);
  const [id, setId] = useState("");
  const idRef = useRef(id);
  const firstRun = useRef(true);
  const buildRefreshId = (counter) => `ad-ono-${adId}-selfrefresh${counter}-${adsCounter++}`;
  const { sizes, dfpPath, bids } = ads[adId];
  const destroyAdCallback = () => destroyAd(idRef.current);

  const selfRefreshLogic = (id) => {
    advertising.advertisingState.selfRefreshAdUnits.push({ sizes, id, dfpPath, bids });
    advertising.runAuction(id);
    setTimeout(() => {
      setSelfRefreshCount(selfRefreshCount + 1);
    }, selfRefresh);
  };

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    advertising.destroySlots(id);
    const uid = buildRefreshId(selfRefreshCount);
    setId(uid);
    //for cleanUp of selfRefresh
    idRef.current = uid;
    selfRefreshLogic(uid);
  }, [selfRefreshCount]);

  useEffect(() => {
    const uid = selfRefresh ? buildRefreshId(selfRefreshCount) : `ad-ono-${adId}-${adsCounter++}`;
    setId(uid);
    //for cleanUp of selfRefresh
    idRef.current = uid;
    if (selfRefresh) selfRefreshLogic(uid);
    else advertising.advertisingState.newAdUnits.push({ sizes, id: uid, dfpPath, bids });

    return () => {
      destroyAdCallback(uid);
    };
  }, []);

  return withoutWrapper ? (
    <div id={id} key={id}></div>
  ) : (
    <AdWrapper className={className} width={width} height={height}>
      <AdWrapperTitle>
        <span>ADVERTISEMENT</span>
      </AdWrapperTitle>
      <div id={id} key={id}></div>
    </AdWrapper>
  );
}

export default Ad;
