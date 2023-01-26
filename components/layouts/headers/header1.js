import { Container, Grid } from "@mantine/core";
import Image from "next/image";
import styled from "styled-components";
import useUserParams from "../../common/userParams";


const HeaderWrapper = styled.div`
width: 100%;
height:  ${props => props.isMobile ? '60px' : '100px'};;
background: white;
border-bottom: solid 1px black;
font-size:50px;
position: ${props => props.sticky ? 'sticky' : 'unset'};
top: 0;
z-index: 9999;
// padding-left: 200px;
// background: linear-gradient(90deg, rgba(168,223,235,1) 0%, rgba(109,183,210,1) 44%, rgba(159,207,217,1) 100%);
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
    const { isMobile } = useUserParams();
    const sites = ['PupABC', 'We Live Luxury', 'OnoMagic Template']
    const index = 1

    return (
        <>
            <HeaderWrapper isMobile={isMobile} sticky={true}>
                <Container>
                    {/* {sites[index]} */}
                    <Image loader={({ src }) => src} src={'/header-logo.webp'} width={250} height={45}></Image>
                    <HeaderSubtitle>Daily fitness tips from industry experts!</HeaderSubtitle>
                </Container>
            </HeaderWrapper>
        </>
    )
}