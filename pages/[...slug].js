import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import advertising from "../components/ads/advertising";
import { userParams } from "../components/common/userParams";
import Footer1 from "../components/layouts/footers/footer1";
import Header1 from "../components/layouts/headers/header1";
import SlugLayout from "../components/layouts/slugLayout";
import tracking from "../components/tracking/tracking";

const Post = ({ data, uaString }) => {
  const { articleId, page } = data;
  const { utm_source, utm_campaign } = userParams;
  userParams.article_id = articleId;

  useEffect(() => {
    window.advertising = advertising;
    // tracking.track("vv", "prepixel", "FBClick", { utm_campaign, utm_source, article_id: articleId });
  }, []);

  return (
    <>
      <Head>
        <meta name="robots" content="noindex,nofollow" />
        <title>{data.title}</title>
      </Head>
      <Header1></Header1>
      <SlugLayout data={data} pageNumber={page}></SlugLayout>
      <Footer1 />
    </>
  );
};

export default Post;

export async function getServerSideProps({ params, req }) {
  // Fetch data from external API
  try {
    const res = await fetch(`https://${process.env.NEXT_PUBLIC_HOST}/wp-json/wp/v2/posts?slug=${params.slug[0]}&_embed  `);
    const data = await res.json();
    const html = data[0]?.content?.rendered;
    const title = data[0]?.title?.rendered;
    const author = data[0]?._embedded?.author[0]?.name;
    const articleId = data[0].id;
    const secondArgValid = params.slug[1] ? (Number.isNaN(+params.slug[1]) ? false : true) : true;
    const page = +params.slug[1];
    if (!html || !secondArgValid || page < 0) {
      throw new Error("No html");
    }
    const items = splitContent(html);
    // Pass data to the page via props
    return { props: { data: { page, articleId, title, ...items, author }, uaString: req.headers["user-agent"] } };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
}

function splitContent(content) {
  const splited = content.split("<p><!--nextpage--></p>");
  return {
    content: splited,
    items_count: splited.length,
  };
}
