import styled from "styled-components";
import React, { useState } from "react";
import { Grid } from '@mantine/core';
import Ad from "../ads/ad";



const Post = styled.div`
    width: 100%;
    background-color:#dcdcdc;
    height: 300px;
`

export default function Layout() {
    return (
        <>
            <Grid>
                <Grid.Col span={3}>

                </Grid.Col>
                <Grid.Col span={6}>
                    <Grid m={'70px 0'}>
                        <Grid.Col span={6}><Post>Some Post</Post></Grid.Col>
                        <Grid.Col span={6}><Post>Some Post</Post></Grid.Col>
                        <Grid.Col span={6}><Post>Some Post</Post></Grid.Col>
                        <Grid.Col span={6}><Post>Some Post</Post></Grid.Col>
                        <Grid.Col span={6}><Post>Some Post</Post></Grid.Col>
                        <Grid.Col span={6}><Post>Some Post</Post></Grid.Col>
                        <Grid.Col span={6}><Post>Some Post</Post></Grid.Col>
                        <Grid.Col span={6}><Post>Some Post</Post></Grid.Col>
                    </Grid>
                </Grid.Col>
                <Grid.Col span={3}>

                </Grid.Col>
            </Grid>
        </>
    )
}