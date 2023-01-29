import styled from "styled-components";
import React, { useState } from "react";
import { Grid } from '@mantine/core';
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
                  slug={post.slug}
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
      {/* <Pagination total={Math.floor(postsAmount / 10) + 1} /> */}
    </>
  );
}
