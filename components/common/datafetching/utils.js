export const getCategoryId = (categories, category) => {
  return categories.find((cat) => cat["slug"].toLowerCase() === category.toLowerCase()).id;
};

export const getPostAmount = (categories, categorySlug, specificCategoryAmount = false) => {
  if (specificCategoryAmount) {
    return categories.find((cat) => cat.slug.toLowerCase() == categorySlug.toLowerCase()).count;
  } else {
    const calc = categories.reduce((prev, curr) => {
      if (curr.slug.toLowerCase() === categorySlug.toLowerCase() || curr.id === 1) return prev;
      prev += curr.count;
      return prev;
    }, 0);
    return calc;
  }
};

export const mapPosts = (posts, categories) => {
  return posts.map((post) => {
    const postObj = {};
    postObj["image"] = post["_embedded"]?.["wp:featuredmedia"]?.[0]?.["source_url"] || "";
    postObj["author"] = post["_embedded"]?.["author"][0]?.["name"] || "No Author";
    postObj["title"] = post.title?.rendered;
    const postCat = categories.find((cat) => cat.id === post.categories[0]);
    postObj["category"] = postCat?.name || "Uncategorized";
    postObj["slug"] = post.slug;
    postObj["categorySlug"] = postCat.slug;
    return postObj;
  });
};
