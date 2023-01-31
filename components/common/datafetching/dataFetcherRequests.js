export const getPostsWithCategoryToExclude = (category, page) => {
  return fetch(
    `https://${
      "welivelux.com" || process.env.HOST
    }/wp-json/wp/v2/posts?categories_exclude=${category}&page=${page}&_embed`
  );
};

export const getPostsWithCategoryToEnclude = (category, page) => {
  return fetch(
    `https://${
      "welivelux.com" || process.env.HOST
    }/wp-json/wp/v2/posts?categories=${category}&page=${page}&_embed`
  );
};

export const getCategories = () => {
  return fetch(
    `https://${"welivelux.com" || process.env.HOST}/wp-json/wp/v2/categories`
  );
};
