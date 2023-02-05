export const getPostsWithCategory = (category, page, specificCat) => {
  let query = "";
  if (!specificCat) {
    query = `categories_exclude=${category}&page=${page}&_embed`;
  } else {
    query = `categories=${category}&page=${page}&_embed`;
  }
  return fetch(`https://${"welivelux.com" || process.env.NEXT_PUBLIC_HOST}/wp-json/wp/v2/posts?${query}`);
};

export const getCategories = () => {
  return fetch(`https://${"welivelux.com" || process.env.NEXT_PUBLIC_HOST}/wp-json/wp/v2/categories`);
};
