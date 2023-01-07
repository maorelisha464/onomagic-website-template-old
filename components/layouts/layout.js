import styled from "styled-components";
import React from "react";
import Footer1 from "./footers/footer1";
import Header1 from "./headers/header1";

const Container = styled.div`
    width:50%;
    margin: auto;
`

export default function Layout({ content, contentProps }) {
    const Content = content
    return (
        <>
            <Header1></Header1>
            <Container>
                <Content {...contentProps}></Content>
            </Container>
            <Footer1 />
        </>
    )
}