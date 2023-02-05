import React from "react";
import Script from "next/script";
import CMP from "../cmp";
import FacebookPixel from "../tracking/facebookPixel";

export default function AdsLibScripts() {
  return (
    <>
      {/* GPT */}
      <Script src={"https://securepubads.g.doubleclick.net/tag/js/gpt.js"} strategy="beforeInteractive" />
      {/* Prebid */}
      <Script src={"/onomagic-prebid7.13.0.js"} strategy="beforeInteractive" />
      {/* Amazon */}
      <Script src={"//c.amazon-adsystem.com/aax2/apstag.js"} strategy="afterInteractive" />
      <FacebookPixel />
      <CMP />
    </>
  );
}
