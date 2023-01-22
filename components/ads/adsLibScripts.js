import React from 'react';
import Script from 'next/script';


export default function AdsLibScripts() {
    return (
        <>
            {/* GPT */}
            <Script src={"https://securepubads.g.doubleclick.net/tag/js/gpt.js"} strategy="beforeInteractive" async />
            {/* Prebid */}
            <Script src={"/onomagic-prebid7.13.0.js"} strategy="beforeInteractive" async />
            {/* Amazon */}
            <Script src={"//c.amazon-adsystem.com/aax2/apstag.js"} strategy="beforeInteractive" async />
        </>
    )
}