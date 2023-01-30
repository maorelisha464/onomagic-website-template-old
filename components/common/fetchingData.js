const getPosts = (excludeCategaoryId, page) => {
  return fetch(
    `https://${
      "welivelux.com" || process.env.HOST
    }/wp-json/wp/v2/posts?categories_exclude=${excludeCategaoryId}&page=${page}&_embed`
  );
};

const getPostsWithCategoryToEnclude = (category, page) => {
  return fetch(
    `https://${
      "welivelux.com" || process.env.HOST
    }/wp-json/wp/v2/posts?categories=${category}&page=${page}&_embed`
  );
};

const getCategories = () => {
  return fetch(
    `https://${"welivelux.com" || process.env.HOST}/wp-json/wp/v2/categories`
  );
};

const getCategoryIdToExclude = (categories, categoryToExclude) => {
  return categories.find((cat) => cat.name.toLowerCase() === categoryToExclude)
    .id;
};

const getPostAmount = (categories, categoryIdToExclude) => {
  const calc = categories.reduce((prev, curr) => {
    if (curr.id === categoryIdToExclude || curr.id === 1) return prev;
    prev += curr.count;
    return prev;
  }, 0);
  return calc;
};

const mapPosts = (posts, categories) => {
  return posts.map((post) => {
    const postObj = {};
    postObj["image"] =
      post["_embedded"]?.["wp:featuredmedia"]?.[0]?.["source_url"] || "";
    postObj["author"] =
      post["_embedded"]?.["author"][0]?.["name"] || "No Author";
    postObj["title"] = post.title?.rendered;
    const postCat = categories.find((cat) => cat.id === post.categories[0]);
    postObj["category"] = postCat?.name || "Uncategorized";
    postObj["slug"] = post.slug;
    return postObj;
  });
};



export const getPostsWithCategoriesAndPagination = async (
  page = 1,
  categoryToExclude = "celebrity luxury",
  includeCategories = false
) => {
  const categoriesResponse = await getCategories();
  const categories = await categoriesResponse.json();
  if (!includeCategories) {
    const categoryIdToExclude = getCategoryIdToExclude(
      categories,
      categoryToExclude
    );
    const postsAmount = getPostAmount(categories, categoryIdToExclude);
    const fetchedPosts = await (
      await getPosts(categoryIdToExclude, page)
    ).json();
    const posts = mapPosts(fetchedPosts, categories);
    return { postsAmount, posts, categories, categoryIdToExclude };
  }
};
