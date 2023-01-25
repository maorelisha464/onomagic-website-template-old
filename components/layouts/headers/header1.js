import { Container, Grid } from "@mantine/core";
import Image from "next/image";
import styled from "styled-components";


const HeaderWrapper = styled.div`
width: 100%;
height: 70px;
background: rgb(168,223,235);
background: linear-gradient(90deg, rgba(168,223,235,1) 0%, rgba(109,183,210,1) 44%, rgba(159,207,217,1) 100%);
font-size:50px;
// padding-left: 200px;
position: ${props => props.sticky ? 'sticky' : 'unset'};
top: 0;
z-index: 9999;
`

const HeaderTitle = styled.span`

font-size: 45px;
  font-weight: 900;
  background-image: linear-gradient(to right, #553c9a 45%, #ee4b2b);
  color: transparent;
  background-clip: text;
  -webkit-background-clip: text
  
`

const HeaderSubtitle = styled.div`
color: #aaa;
font-size: 16px;
line-height: 24px;
`

export default function Header1({ }) {
    const sites = ['PupABC', 'We Live Luxury', 'OnoMagic Template']
    const index = 1

    return (
        <>
            <HeaderWrapper sticky={true}>
                <Container>
                    {/* {sites[index]} */}
                    <Image loader={({ src }) => src} src={'https://dailyfitnesstip.com/wp-content/themes/dailyfit-wordpress-template/src/img/header-logo.png'} width={250} height={45}></Image>
                    <HeaderSubtitle>Daily fitness tips from industry experts!</HeaderSubtitle>
                </Container>
            </HeaderWrapper>
        </>
    )
}