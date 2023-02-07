import Script from "next/script";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import { cookies } from "../common/store";
import { userParams } from "../common/userParams";
import tracking from "../tracking/tracking";

const VideoDiv = styled.div``;

export default function Video({}) {
  const { utm_campaign } = userParams;
  const additionalVidazooAtt = {
    "data-widget-id": "63553fb99ea3ac1005676c91",
    "data-param1": utm_campaign,
    "data-on-widget-ad-impression": "vidazooCallback",
  };

  const containerRef = useRef(null);

  function moveScript() {
    containerRef.current.appendChild(this);
  }

  useEffect(() => {
    window.vidazooCallback = (cpm, info) => {
      console.info("[vidazoo]", "vidazooCallback", { cpm, info });
      const vidazooNetValue = info.netCpm - info.adServingFee;
      const currTotalVideoCpm = cookies.getOno("totalVideoCpm") || 0;
      cookies.setOno("totalVideoCpm", currTotalVideoCpm + vidazooNetValue);
      tracking.trackPageValue(vidazooNetValue / 1000, slot.onoParams.page, null, true);
    };
  }, []);

  return (
    <VideoDiv ref={containerRef} id="ono-video-player">
      <Script src={"https://static.vidazoo.com/basev/vwpt.js"} {...additionalVidazooAtt} stagedy={"beforeInteractive"} onLoad={moveScript} />
    </VideoDiv>
  );
}
