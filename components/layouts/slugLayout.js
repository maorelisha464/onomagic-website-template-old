import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Container, Grid, MediaQuery, Progress } from "@mantine/core";
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
  const [content, setContent] = useState({ layout: layoutTypeGallery ? Gallery : OnePage });
  const Content = content && content.layout;

  useEffect(() => {
    advertising.runAuction();
  }, []);

  return (
    <>
      <Grid>
        <MediaQuery smallerThan="lg" styles={{ display: "none" }}>
          <Grid.Col lg={3}>
            <SideElement>
              <Ad key={"left-sidebar"} adId="maor2" width="300" height="250"></Ad>
              {/* <Ad adId='maor2' width='300' height='250' selfRefresh={10000}></Ad> */}
              <div>Article Progress:</div>
              <Progress value={progress} label={`${progress}%`} size="xl" radius="xl" />
            </SideElement>
          </Grid.Col>
        </MediaQuery>

        <Grid.Col md={9} lg={6}>
          <Container>{content && <Content {...contentProps} setProgress={setProgress}></Content>}</Container>
        </Grid.Col>

        <MediaQuery smallerThan="md" styles={{ display: "none" }}>
          <Grid.Col md={3} lg={3}>
            <SideElement>
              <Ad key={"right-sidebar"} adId="maor2" width="300" height="250"></Ad>
              {/* <Ad adId="maor2" width="300" height="250" selfRefresh={15000}></Ad> */}
            </SideElement>
          </Grid.Col>
        </MediaQuery>
      </Grid>
    </>
  );
}
