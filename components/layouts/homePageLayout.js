import styled from "styled-components";
import React, { useState } from "react";
import Footer1 from "./footers/footer1";
import Header1 from "./headers/header1";
import Head from "next/head";
import { Grid, Progress, Pagination } from "@mantine/core";
import Ad from "../ads/ad";
import Post from "./Post";

// const Post = styled.div`
//   width: 100%;
//   background-color: #dcdcdc;
//   height: 300px;
// `;

export default function Layout({ postsAmount, posts, categories, categoryIdToExclude }) {
     console.log(posts, "firstposts");
  return (
    <>
      <Head>
        <title>Home Page</title>
      </Head>
      <Header1></Header1>
      <Grid>
        <Grid.Col span={3}></Grid.Col>
        <Grid.Col span={6}>
          <Grid m={"70px 0"}>
            {posts.map((post, i) => (
              <Grid.Col key={i} span={6}>
                <Post
                  image={post.image}
                  title={post.title}
                  category={post.category}
                  author={post.author}
                  slug ={post.slug}
                >
                  {i}
                </Post>
              </Grid.Col>
            ))}
            {/* <Grid.Col span={6}>
              <Post>Some Post</Post>
            </Grid.Col>
            <Grid.Col span={6}>
              <Post>Some Post</Post>
            </Grid.Col>
            <Grid.Col span={6}>
              <Post>Some Post</Post>
            </Grid.Col>
            <Grid.Col span={6}>
              <Post>Some Post</Post>
            </Grid.Col>
            <Grid.Col span={6}>
              <Post>Some Post</Post>
            </Grid.Col>
            <Grid.Col span={6}>
              <Post>Some Post</Post>
            </Grid.Col>
            <Grid.Col span={6}>
              <Post>Some Post</Post>
            </Grid.Col>
            <Grid.Col span={6}>
              <Post>Some Post</Post>
            </Grid.Col> */}
          </Grid>
        </Grid.Col>
        <Grid.Col span={3}></Grid.Col>
      </Grid>
      <Pagination total={Math.floor(postsAmount / 10) + 1} />
      <Footer1 />
    </>
  );
}
