import { getDataWithCategoriesToExclude, getDataWithCategoriesToInclude } from "./service";

export const getPostsWithCategoriesToExclude = async (
  page = 1,
  categoryToExclude = process.env.EXCLUDE_CATEGORY || "celebrity luxury"
) => {
  return await getDataWithCategoriesToExclude(categoryToExclude, page);
};

export const getPostsWithCategoriesToInclude = async (
  page = 1,
  slug 
) => {
  return await getDataWithCategoriesToInclude(page,slug);
};



