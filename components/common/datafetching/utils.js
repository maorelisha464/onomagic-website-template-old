export const getCategoryId = (categories, category, excludeByProperty = "name") => {
    return categories.find(
        (cat) => cat[excludeByProperty].toLowerCase() === category.toLowerCase()
    ).id;
};

export const getPostAmount = (categories, categoryId, specificId = false) => {
    if (specificId) {
        return categories.find((cat) => cat.id == specificId).count;
    } else {
        const calc = categories.reduce((prev, curr) => {
            if (curr.id === categoryId || curr.id === 1) return prev;
            prev += curr.count;
            return prev;
        }, 0);
        return calc;
    }
};

export const mapPosts = (posts, categories) => {
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
        postObj["categorySlug"] = postCat.slug;
        return postObj;
    });
};

