import { Container, Grid } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import useUserParams from "../../common/userParams";

const HeaderWrapper = styled.div`
  width: 100%;
  height: ${(props) => (props.isMobile ? "60px" : "100px")};
  background: white;
  border-bottom: solid 1px #d4d2d2;
  position: ${(props) => (props.sticky ? "sticky" : "unset")};
  top: 0;
  z-index: 9999;
  box-shadow: 0 2px 14px -3px #e5d1d1;
`;

const HeaderTitle = styled.span`
  text-decoration: none;
  font-size: 45px;
  font-weight: 900;
  color: #d6b047;
`;

const HeaderSubtitle = styled.div`
  color: #aaa;
  font-size: 16px;
  line-height: 24px;
  margin-bottom: 15px;
`;

const CategoriesWrapper = styled.div`
  width: 100%;
  height: 40px;
  border-bottom: solid 1px #d4d2d2;
  z-index: 10;
  @media only screen and (max-width: 576px) {
    display: none;
  }
`;

export default function Header1({ categories }) {
  return (
    <>
      <HeaderWrapper sticky={false}>
        <Container size={"xl"}>
          {/* {sites[index]} */}
          {/* <Image loader={({ src }) => src} src={'/header-logo.webp'} width={250} height={45}></Image> */}
          <Link href="/" style={{ textDecoration: "none" }}>
            <HeaderTitle>We Live Lux</HeaderTitle>
          </Link>
          <HeaderSubtitle>
            Sharing our passion for the luxury lifestyle.
          </HeaderSubtitle>
        </Container>
      </HeaderWrapper>
      {
        // categories &&
        // (
        //     <CategoriesWrapper>
        //         <Link href='/test1?utm_source=facebook&utm_campaign=123'>sad</Link>
        //     </CategoriesWrapper>
        // )
      }
    </>
  );
}
