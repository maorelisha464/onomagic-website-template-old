import { Container } from "@mantine/core";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styled from "styled-components";
import Footer1 from "../components/layouts/footers/footer1";
import Header1 from "../components/layouts/headers/header1";
import tracking from "../components/tracking/tracking";
import { default as getServerSideProps } from "../components/common/getHeaderProps";

const P = styled.div``;

const TermsOfService = ({ categories }) => {
  useEffect(() => {
    // tracking.track('vv', 'prepixel', 'FBClick', { utm_campaign, utm_source, article_id: articleId })
  }, []);

  return (
    <>
      <Header1 categories={categories}></Header1>
      <Container size={"md"}>
        <h2>Contact Us</h2>

        <p>
          <strong>Thank you for visiting welivelux.com</strong>
        </p>
        <p>We hope you enjoy everything we have to offer – we make great efforts to keep our content updated and enriching.</p>
        <p>Please feel free to contact us: info@welivelux.com</p>
      </Container>
      <Footer1></Footer1>
    </>
  );
};

export default TermsOfService;

export { getServerSideProps };
