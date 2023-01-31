import { getCategoryId, getPostAmount, mapPosts } from "./utils";
import { getPostsWithCategoryToExclude, getPostsWithCategoryToEnclude, getCategories } from "./dataFetcherRequests";


export const getDataWithCategoriesToExclude = async (
    categoryToExclude,
    page
) => {
    const categories = await (await getCategories()).json();
    const categoryIdToExclude = getCategoryId(categories, categoryToExclude);
    const postsAmount = getPostAmount(categories, categoryIdToExclude);
    const fetchedPosts = await (
        await getPostsWithCategoryToExclude(categoryIdToExclude, page)
    ).json();
    const posts = mapPosts(fetchedPosts, categories);
    return { postsAmount, posts, categories, categoryIdToExclude };
};



export const getDataWithCategoriesToInclude = async (
    page = 1,
    slug
) => {
    const categories = await (await getCategories()).json();
    const categoryIdToInclude = getCategoryId(categories, slug, 'slug');
    const postsAmount = getPostAmount(
        categories,
        slug,
        categoryIdToInclude
    );
    const fetchedPosts = await (
        await getPostsWithCategoryToEnclude(categoryIdToInclude, page)
    ).json();
    const posts = mapPosts(fetchedPosts, categories);
    return { postsAmount, posts, categories, categoryToExclude: 4 };
};