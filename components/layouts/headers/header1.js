import { Container, Grid } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/router'
import styled from "styled-components";
import useUserParams from "../../common/userParams";


const HeaderWrapper = styled.div`
width: 100%;
height:  ${props => props.isMobile ? '60px' : '100px'};;
background: white;
border-bottom: solid 1px #d4d2d2;
position: ${props => props.sticky ? 'sticky' : 'unset'};
top: 0;
z-index: 9999;
box-shadow: 0 3px 3px -4px #e5d1d1;

`

const HeaderTitle = styled.div`
text-decoration:none;
font-size: 45px;
  font-weight: 900;
  color: #d6b047;
  
`

const HeaderSubtitle = styled.div`
color: #aaa;
font-size: 16px;
line-height: 24px;
margin-bottom: 15px
`

export default function Header1({ categories }) {
    return (
        <>
            <HeaderWrapper sticky={false}>
                <Container size={'xl'}>
                    {/* {sites[index]} */}
                    {/* <Image loader={({ src }) => src} src={'/header-logo.webp'} width={250} height={45}></Image> */}
                    <Link href='/' style={{ textDecoration: 'none' }}>
                        <HeaderTitle>
                            We Live Lux
                        </HeaderTitle>
                    </Link>
                    <HeaderSubtitle>Sharing our passion for the luxury lifestyle.</HeaderSubtitle>

                </Container>
            </HeaderWrapper>
        </>
    )
}


export async function getServerSideProps({ params, req }) {

}