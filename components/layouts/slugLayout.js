import React, { useState, useEffect, useRef } from "react";

import { Container } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";

import Ad from "../ads/ad";
import advertising from "../ads/advertising";
import OnePage from "./content/onePage";
import Gallery from "./content/gallery";
import useUserParams from "../common/userParams";

import styled from "@emotion/styled";

const SIDEBAR_WIDTH = 300;
const SIDEBAR_ML = 36;

export default function SlugLayout({ data, pageNumber }) {
  const [progress, setProgress] = useState(0);
  const { utm_source } = useUserParams();
  const onePageChannels = ["facebook", "twitter", "tiktok"];
  const layoutTypeGallery = !onePageChannels.includes(utm_source);
  const contentProps = { data, pageNumber: pageNumber || 0 };
  const [content, setContent] = useState(null);
  const Content = content && content.layout;

  const ref = useRef();
  const { width } = useViewportSize();
  const [showSidebar, setShowSidebar] = useState(true);

  useEffect(() => {
    setContent({ layout: layoutTypeGallery ? Gallery : OnePage });
    advertising.runAuction();
  }, []);

  useEffect(() => {
    if (ref?.current?.clientWidth - SIDEBAR_WIDTH - SIDEBAR_ML < SIDEBAR_WIDTH) {
      setShowSidebar(false);
    } else {
      setShowSidebar(true);
    }
  }, [width]);

  return (
    <ContentContainer ref={ref} size="lg">
      {content && (
        <ContentWrapper>
          <Content {...contentProps} setProgress={setProgress}></Content>
        </ContentWrapper>
      )}
      {showSidebar && (
        <Sidebar>
          <Ad key={"right-sidebar"} adId="maor2" width={SIDEBAR_WIDTH} height="250" />
          {/* <Ad adId="maor2" width="300" height="250" selfRefresh={15000}></Ad> */}
        </Sidebar>
      )}
    </ContentContainer>
  );
}

const ContentContainer = styled(Container)`
  display: flex;
  width: 100%;
`;

const ContentWrapper = styled.div`
  max-width: 100%;
`;

const Sidebar = styled.div`
  position: sticky;
  top: 50px;
  right: 0px;
  margin-left: ${SIDEBAR_ML}px;
  height: 100%;
`;
