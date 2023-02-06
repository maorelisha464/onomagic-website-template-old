import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Container } from "@mantine/core";
import Ad from "../ads/ad";
import advertising from "../ads/advertising";
import OnePage from "./content/onePage";
import Gallery from "./content/gallery";
import useUserParams from "../common/userParams";

const SideElement = styled.div`
  // padding: 30px;
  position: sticky;
  top: 50px;
`;

export default function SlugLayout({ data, pageNumber }) {
  const [progress, setProgress] = useState(0);
  const { utm_source } = useUserParams();
  const onePageChannels = ["facebook", "twitter", "tiktok"];
  const layoutTypeGallery = !onePageChannels.includes(utm_source);
  const contentProps = { data, pageNumber: pageNumber || 0 };
  const [content, setContent] = useState(null);
  const Content = content && content.layout;

  useEffect(() => {
    setContent({ layout: layoutTypeGallery ? Gallery : OnePage });
    advertising.runAuction();
  }, []);

  return (
    <>
      <Container size="lg" style={{ display: "flex", width: "100%" }}>
        {content && (
          <div style={{ maxWidth: "100%" }}>
            <Content {...contentProps} setProgress={setProgress}></Content>
          </div>
        )}
        <SideElement style={{ marginLeft: "20px" }}>
          <Ad key={"right-sidebar"} adId="maor2" width="300" height="250"></Ad>
          {/* <Ad adId="maor2" width="300" height="250" selfRefresh={15000}></Ad> */}
        </SideElement>
      </Container>
    </>
  );
}
