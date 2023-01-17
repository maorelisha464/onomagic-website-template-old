import React from "react";
// import { useTransitionState } from "@/containers/TransitionState";
import { useAdSlot } from "./useAdSlot";
import styled from "styled-components";




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
    margin-bottom: 5px;

`
const AdWrapper = styled.div`
background: #f1f1f1;
padding: 5px;
margin: 30px auto;
width: ${props => (props.width ? `${props.width}px` : '300px')};
height: ${props => (props.height ? `${props.height}px` : '250px')};
`


const ads = {
    "maor": {
        sizes: [[750, 200], [468, 60]],
        mapping: {
            // 0: [],
            960: [468, 60],
            1100: [750, 200],
        },
        dfpPath: '/22029607954/OHB_300x250_IS'
    },
    "maor2": {
        sizes: [[750, 200], [468, 60]],
        mapping: {
            // 0: [],
            960: [468, 60],
            1100: [750, 200],
        },
        dfpPath: '/22029607954/OHB_300x250_IS'
    }
}

function Ad({ adId, width, height }) {
    // const { isTransitioning } = useTransitionState();
    const ad = ads[adId];
    const adIdDiv = `div-gpt-ad-ono_${adId}`
    useAdSlot({
        mapping: ad.mapping,
        sizes: ad.sizes,
        id: adIdDiv,
        dfpPath: ad.dfpPath
        // isTransitioning,
    });


    return (
        <AdWrapper width={width} height={height}>
            <AdWrapperTitle>
                <span>ADVERTISEMENT</span>
            </AdWrapperTitle>
            <div id={adIdDiv}></div>
        </AdWrapper>
    );
}

export default Ad;