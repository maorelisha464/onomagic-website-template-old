import React, { useState } from "react";
import {
  Grid,
  Pagination,
  Loader,
  Center,
  Container,
  Text,
  Paper,
} from "@mantine/core";
import Post from "./Post";
import { getPostsWithCategoriesToExclude, getPostsWithCategoriesToInclude } from "../common/datafetching/dataFetcher";

export default function Layout({ postsAmount, posts, category }) {
  const [activePage, setPage] = useState(1);
  const [currPosts, setCurrPosts] = useState(posts);
  const [isLoading, setIsLoading] = useState(false);


  const dividedPages = postsAmount / 10;
  const calcPaginationPages = Number.isInteger(dividedPages)
    ? dividedPages
    : Math.floor(dividedPages + 1);


  const handlePagiChange = async (page) => {
    setPage(page);
    window &&
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    setIsLoading(true);
    const { posts } =category ? await getPostsWithCategoriesToInclude(page,category) : await getPostsWithCategoriesToExclude(page);
    setCurrPosts(posts);
    setIsLoading(false);
  };

  return (
    <>
      <div
        style={{ backgroundColor: "#f0f0f0", flexGrow: 1 }}
        align={"stretch"}
      >
        <Container>
          <Grid justify="center" align="center">
            {isLoading ? (
              <Grid.Col justify="spaceBetween">
                <Center>
                  <Loader m={"70px"} size="xl" />
                </Center>
              </Grid.Col>
            ) : (
              <>
                <Grid.Col>
                  <Paper
                    style={{ width: "100%" }}
                    shadow="md"
                    p="md"
                    m={"30px 0 20px 0"}
                  >
                    <Text fz="xl" ta="center">
                      {category?currPosts[0].category : 'Latest Posts' }
                    </Text>
                  </Paper>
                  <Grid m={"30px 0 20px 0"}>
                    {(currPosts || []).map((post, i) => (
                      <Grid.Col key={i} sm={6}>
                        <Post
                          image={post.image}
                          title={post.title}
                          category={post.category}
                          author={post.author}
                          slug={post.slug}
                          categorySlug ={post.categorySlug}
                          categoriesedMode={category}
                        >
                          {i}
                        </Post>
                      </Grid.Col>
                    ))}
                  </Grid>
                </Grid.Col>
              </>
            )}
          </Grid>
        </Container>
        <Grid justify="center" align="center" m={"30px 0 20px 0"}>
          <Pagination
            page={activePage}
            onChange={handlePagiChange}
            total={calcPaginationPages}
          />
        </Grid>
      </div>
    </>
  );
}
