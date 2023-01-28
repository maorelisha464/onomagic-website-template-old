import React, { useEffect, useState } from "react";
import styled from "styled-components";
import advertising from "./advertising";

const AdWrapperTitle = styled.div`
&:before, &:after {
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
`
const AdWrapper = styled.div`
background: #f1f1f1;
margin: 30px auto;
width: ${props => (props.width ? `${props.width}px` : '300px')};
height: ${props => (props.height ? `${props.height}px` : '250px')};
`
let adsCounter = 0;

const ads = {
    "maor": {
        sizes: [[728, 90]],
        dfpPath: '/22029607954/olux_728x90_is',
        bids: [
            {
                bidder: 'appnexus',
                params: {
                    placementId: 13144370,
                },
            },
            {
                bidder: 'nobid',
                params: {
                    siteId: '22842767328',
                },
            },
            {
                bidder: 'vidazoo',
                labelAny: ['display'],
                params: {
                    cId: '5e8a274a3256fc00174e1c33',
                    pId: '59ac17c192832d0011283fe3',
                },
            },
            {
                bidder: '33across',
                params: {
                    siteId: 'c4-DmCzBGr7ynGrkHcnnVW',
                    productId: 'siab',
                },
            },
            {
                bidder: 'brightcom',
                params: {
                    publisherId: '20731',
                },
            },
            {
                bidder: 'onetag',
                params: {
                    pubId: '698d141faf72afe',
                },
            },
            {
                bidder: 'openx',
                params: {
                    unit: '558603526',
                    delDomain: 'onomagic-d.openx.net',
                },
            },
            {
                bidder: 'yahoossp',
                params: {
                    // 728x90
                    dcn: '8a96945001858511fded2a24b3920142',
                    pos: '8a96945001858511fded2a2b779d0146',
                },
                labelAny: ['display'],
            },
            {
                bidder: 'amx',
                params: { tagId: 'b25vbWFnaWMtcm9uLmNvbQ' },
            },
            {
                bidder: 'sharethrough',
                params: {
                    pkey: 'fKnrgAPLEXSYdd5FAFTzZmSV',
                },
            },
            {
                bidder: 'grid',
                params: {
                    uid: '379289',
                },
            },
            {
                bidder: 'medianet',
                params: {
                    cid: '8CU68898U',
                    crid: '649786786',
                },
            },
        ]
    },
    "maor2": {
        sizes: [[300, 250]],
        dfpPath: '/22029607954/OHB_300x250_IS',
        bids: [
            {
                bidder: 'appnexus',
                params: {
                    placementId: 13144370,
                },
            },
            {
                bidder: 'nobid',
                params: {
                    siteId: '22842767328',
                },
            },
            {
                bidder: 'vidazoo',
                labelAny: ['display'],
                params: {
                    cId: '5e8a274a3256fc00174e1c33',
                    pId: '59ac17c192832d0011283fe3',
                },
            },
            {
                bidder: '33across',
                params: {
                    siteId: 'cIcrBQzBGr7ynGrkHcnnVW',
                    productId: 'siab',
                },
            },
            {
                bidder: 'brightcom',
                params: {
                    publisherId: '20731',
                },
            },
            {
                bidder: 'onetag',
                params: {
                    pubId: '698d141faf72afe',
                },
            },
            {
                bidder: 'openx',
                params: {
                    unit: '558603559',
                    delDomain: 'onomagic-d.openx.net',
                },
            },
            {
                bidder: 'yahoossp',
                params: {
                    // 300x250
                    dcn: '8a96945001858511fded2a24b3920142',
                    pos: '8a969ce401858511f4a12a2acfb90156',
                },
                labelAny: ['display'],
            },
            {
                bidder: 'amx',
                params: { tagId: 'b25vbWFnaWMtcm9uLmNvbQ' },
            },
            {
                bidder: 'sharethrough',
                params: {
                    pkey: 'SB22jIKiEApDRYoEe6mT8FCl',
                },
            },
            {
                bidder: 'grid',
                params: {
                    uid: '379292',
                },
            },
            {
                bidder: 'medianet',
                params: {
                    cid: '8CU68898U',
                    crid: '593348823',
                },
            },
        ]
    }
}

function Ad({ adId, width, height, selfRefresh }) {
    const [selfRefreshCount, setSelfRefreshCount] = useState(0);
    const [firstRun, setFirstRun] = useState(true);
    const [id, setId] = useState('');
    const buildRefreshId = (counter) => `ad-ono-${adId}-selfrefresh${counter}-${adsCounter++}`

    const { sizes, dfpPath, bids } = ads[adId];

    const selfRefreshLogic = (id) => {
        advertising.advertisingState.selfRefreshAdUnits.push({ sizes, id, dfpPath, bids });
        advertising.runAuction(id);
        setTimeout(() => {
            setSelfRefreshCount(selfRefreshCount + 1);
        }, selfRefresh)
    }

    useEffect(() => {
        if (firstRun) {
            setFirstRun(false);
            return;
        }
        advertising.destroySlots(id);
        const uid = buildRefreshId(selfRefreshCount);
        setId(uid);
        selfRefreshLogic(uid);
    }, [selfRefreshCount])

    useEffect(() => {
        const uid = selfRefresh ? buildRefreshId(selfRefreshCount) : `ad-ono-${adId}-${adsCounter++}`;
        setId(uid);
        if (selfRefresh) {
            selfRefreshLogic(uid);
            return;
        }
        advertising.advertisingState.newAdUnits.push({ sizes, id: uid, dfpPath, bids });
    }, []);

    return (
        <AdWrapper width={width} height={height}>
            <AdWrapperTitle>
                <span>ADVERTISEMENT</span>
            </AdWrapperTitle>
            <div id={id} key={id}></div>
        </AdWrapper>
    );
}

export default Ad;