import styled from "styled-components";
import React, { useState, useEffect } from "react";
import Footer1 from "./footers/footer1";
import Header1 from "./headers/header1";
import Head from 'next/head'
import { Grid, Progress } from '@mantine/core';
import Ad from "../ads/ad";


const SideElement = styled.div`
    padding: 30px;
    position: sticky;
    top: 50px;
`

export default function Layout({ content, contentProps }) {
    const [progress, setProgress] = useState(0);
    const Content = content;
    return (
        <>
            <Head>
                <title>{contentProps.data.title}</title>
            </Head>
            <Header1></Header1>
            <Grid>
                <Grid.Col span={3}>
                    <SideElement>
                        {/* <Ad adId='maor' width='300' height='250'></Ad> */}
                        {/* <Ad adId='maor' width='300' height='250'></Ad> */}
                        <div>Article Progress:</div>
                        <Progress value={progress} label={`${progress}%`} size="xl" radius="xl" />
                    </SideElement>
                </Grid.Col>
                <Grid.Col span={6}>
                    <Content {...contentProps} setProgress={setProgress}></Content>
                </Grid.Col>
                <Grid.Col span={3}>
                    <SideElement>
                        {/* <Ad adId='maor' width='300' height='250'></Ad> */}
                        {/* <Ad adId='maor' width='300' height='250'></Ad> */}
                    </SideElement>
                </Grid.Col>
            </Grid>
            <Footer1 />
        </>
    )
}