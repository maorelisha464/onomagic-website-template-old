import { Container, Divider, Grid } from "@mantine/core";
import styled from "styled-components";
import Link from "next/link";

const FooterWrapper = styled.div`
padding-top:20px;
margin-top: auto;
width: 100%;
background: #22252a;
min-height: 140px;
text-align: center;
`

const Copyright = styled.div`
color: white;
font-size: 12px;
`

const PageLink = styled.span`
text-align:center;
text-decoration:none;
color: #2196f3;
display: inline-block;
`

const Divide = styled.span`
color: white;
padding:10px;
`
export default function Footer1({ }) {
    return (
        <>
            <FooterWrapper>
                <Container size={'xl'}>
                    <Grid justify="space-between">
                        <Grid.Col >
                            <Link href='/terms-of-service' style={{ textDecoration: 'none' }}>
                                <PageLink>Terms Of Service</PageLink>
                            </Link>
                            <Divide>|</Divide>
                            <Link href='/privacy-cookie-policy' style={{ textDecoration: 'none' }}>
                                <PageLink href='#'>Privacy – Cookie Policy</PageLink>
                            </Link>
                            <Divide>|</Divide>
                            <Link href='/dmca' style={{ textDecoration: 'none' }}>
                                <PageLink href='#'>DMCA</PageLink>
                            </Link>
                            <Divide>|</Divide>
                            <Link href='/contact-us' style={{ textDecoration: 'none' }}>
                                <PageLink href='#'>Contact Us</PageLink>
                            </Link>
                        </Grid.Col>
                        <Grid.Col >
                            <Copyright>© Copyright 2023</Copyright>
                        </Grid.Col>
                    </Grid>
                </Container>
            </FooterWrapper>
        </>
    )
}