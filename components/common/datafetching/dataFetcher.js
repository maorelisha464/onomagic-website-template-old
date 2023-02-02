import { getCategoryId, getPostAmount, mapPosts } from "./utils";
import { getPostsWithCategory, getCategories } from "./dataFetcherRequests";

const categoryToExcludeDefault = process.env.NEXT_PUBLIC_EXCLUDE_CATEGORY || "celebrity-luxury";

export const getPostsWithCategories = async (specificCat, page = 1, slug = categoryToExcludeDefault) => {
  const categories = await (await getCategories()).json();
  const categoryId = getCategoryId(categories, slug);
  const postsAmount = getPostAmount(categories, slug, specificCat);
  const fetchedPosts = await (await getPostsWithCategory(categoryId, page, specificCat)).json();
  const posts = mapPosts(fetchedPosts, categories);
  return { postsAmount, posts, categories, categoryId };
};
